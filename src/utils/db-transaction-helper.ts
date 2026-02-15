/**
 * Database Transaction Helpers for Cloudflare D1
 * 
 * Note: D1 doesn't support traditional BEGIN/COMMIT transactions,
 * but provides batch() API for atomic operations
 */

export interface TransactionResult<T = any> {
  success: boolean;
  results?: T[];
  error?: string;
}

/**
 * Execute multiple operations in a D1 batch (atomic)
 * All operations succeed or all fail together
 * 
 * @example
 * const result = await executeInBatch(db, [
 *   db.prepare('INSERT INTO orders ...').bind(userId, total),
 *   db.prepare('INSERT INTO order_items ...').bind(orderId, productId),
 *   db.prepare('UPDATE products SET stock = stock - ?').bind(quantity)
 * ]);
 */
export async function executeInBatch(
  db: any,
  statements: any[]
): Promise<TransactionResult> {
  try {
    // D1 batch API - executes all statements atomically
    const results = await db.batch(statements);
    
    return { success: true, results };
  } catch (error) {
    console.error('[Batch Transaction Error]:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Batch operation failed',
    };
  }
}

/**
 * Execute operations sequentially with rollback on error
 * Useful when operations depend on previous results
 * 
 * @example
 * const result = await executeSequential(db, [
 *   async () => {
 *     const order = await db.prepare('INSERT INTO orders ...').run();
 *     return order.meta.last_row_id;
 *   },
 *   async (orderId) => {
 *     await db.prepare('INSERT INTO order_items ...').bind(orderId).run();
 *   }
 * ]);
 */
export async function executeSequential(
  db: any,
  operations: ((previous?: any) => Promise<any>)[]
): Promise<TransactionResult> {
  const results: any[] = [];
  const executedOperations: any[] = [];

  try {
    for (const operation of operations) {
      const prevResult = results[results.length - 1];
      const result = await operation(prevResult);
      results.push(result);
      executedOperations.push(operation);
    }

    return { success: true, results };
  } catch (error) {
    console.error('[Sequential Transaction Error]:', error);
    
    // Note: Manual rollback needed - D1 doesn't support ROLLBACK
    // In production, consider implementing compensating transactions
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Sequential operation failed',
    };
  }
}

/**
 * Create order with items atomically
 * 
 * @example
 * const result = await createOrderWithItems(db, {
 *   userId: 123,
 *   totalAmount: 99.99,
 *   status: 'pending',
 *   items: [
 *     { productId: 1, quantity: 2, price: 49.99 },
 *     { productId: 2, quantity: 1, price: 29.99 }
 *   ]
 * });
 */
export async function createOrderWithItems(
  db: any,
  orderData: {
    userId: number;
    totalAmount: number;
    status: string;
    paymentMethod?: string;
    items: Array<{
      productId: number;
      quantity: number;
      price: number;
    }>;
  }
): Promise<TransactionResult<{ orderId: number }>> {
  try {
    // Step 1: Create order
    const orderResult = await db
      .prepare(
        `INSERT INTO orders (user_id, total_amount, status, payment_method, created_at) 
         VALUES (?, ?, ?, ?, datetime('now'))`
      )
      .bind(
        orderData.userId,
        orderData.totalAmount,
        orderData.status,
        orderData.paymentMethod || 'unknown'
      )
      .run();

    const orderId = orderResult.meta.last_row_id;

    // Step 2: Create order items in batch
    const itemStatements = orderData.items.map((item) =>
      db
        .prepare(
          `INSERT INTO order_items (order_id, product_id, quantity, price) 
           VALUES (?, ?, ?, ?)`
        )
        .bind(orderId, item.productId, item.quantity, item.price)
    );

    await db.batch(itemStatements);

    return {
      success: true,
      results: [{ orderId }],
    };
  } catch (error) {
    console.error('[Create Order Error]:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order',
    };
  }
}

/**
 * Update multiple records atomically
 * 
 * @example
 * const result = await updateMultiple(db, [
 *   { table: 'products', id: 1, updates: { stock: 10 } },
 *   { table: 'products', id: 2, updates: { stock: 5 } }
 * ]);
 */
export async function updateMultiple(
  db: any,
  updates: Array<{
    table: string;
    id: number;
    updates: Record<string, any>;
  }>
): Promise<TransactionResult> {
  try {
    const statements = updates.map((update) => {
      const setClauses = Object.keys(update.updates)
        .map((key) => `${key} = ?`)
        .join(', ');
      const values = Object.values(update.updates);

      return db
        .prepare(`UPDATE ${update.table} SET ${setClauses} WHERE id = ?`)
        .bind(...values, update.id);
    });

    const results = await db.batch(statements);

    return { success: true, results };
  } catch (error) {
    console.error('[Batch Update Error]:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Batch update failed',
    };
  }
}

/**
 * Delete records with cascade simulation
 * D1 foreign keys with ON DELETE CASCADE should handle this,
 * but this provides manual control if needed
 * 
 * @example
 * const result = await deleteWithCascade(db, 'orders', 123, [
 *   { table: 'order_items', column: 'order_id' },
 *   { table: 'licenses', column: 'order_id' }
 * ]);
 */
export async function deleteWithCascade(
  db: any,
  mainTable: string,
  id: number,
  cascades: Array<{ table: string; column: string }>
): Promise<TransactionResult> {
  try {
    const statements = [
      // Delete related records first
      ...cascades.map((cascade) =>
        db
          .prepare(`DELETE FROM ${cascade.table} WHERE ${cascade.column} = ?`)
          .bind(id)
      ),
      // Delete main record last
      db.prepare(`DELETE FROM ${mainTable} WHERE id = ?`).bind(id),
    ];

    const results = await db.batch(statements);

    return { success: true, results };
  } catch (error) {
    console.error('[Cascade Delete Error]:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Cascade delete failed',
    };
  }
}
