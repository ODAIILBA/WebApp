/**
 * Database Error Handler Middleware
 * Provides safe error handling for all database operations
 */

import { Context } from 'hono';

/**
 * Database operation result type
 */
export interface DbResult<T> {
  data?: T;
  error?: string;
  success: boolean;
}

/**
 * Wrap database query with error handling
 * 
 * @example
 * const result = await dbQuery(
 *   () => db.prepare('SELECT * FROM products WHERE id = ?').bind(id).first(),
 *   'Failed to fetch product'
 * );
 * 
 * if (!result.success) {
 *   return c.json({ error: result.error }, 500);
 * }
 * 
 * return c.json(result.data);
 */
export async function dbQuery<T>(
  operation: () => Promise<T>,
  errorMessage: string = 'Database operation failed',
  logContext?: string
): Promise<DbResult<T>> {
  try {
    const data = await operation();
    return { data, success: true };
  } catch (error) {
    // Log error with context for debugging
    const context = logContext ? `[${logContext}]` : '[DB]';
    const errorDetails = error instanceof Error ? error.message : String(error);
    
    console.error(`${context} ${errorMessage}:`, errorDetails);
    
    // Return user-friendly error in production, detailed in development
    const userError = process.env.NODE_ENV === 'production' 
      ? errorMessage 
      : `${errorMessage}: ${errorDetails}`;
    
    return { 
      error: userError, 
      success: false 
    };
  }
}

/**
 * Wrap multiple database queries (transaction-like)
 * Executes all operations, returns success only if all succeed
 * 
 * @example
 * const result = await dbTransaction([
 *   () => db.prepare('INSERT INTO orders...').run(),
 *   () => db.prepare('INSERT INTO order_items...').run(),
 * ], 'Failed to create order');
 */
export async function dbTransaction<T = any>(
  operations: (() => Promise<any>)[],
  errorMessage: string = 'Transaction failed',
  logContext?: string
): Promise<DbResult<T[]>> {
  const results: any[] = [];
  
  try {
    for (const operation of operations) {
      const result = await operation();
      results.push(result);
    }
    
    return { data: results, success: true };
  } catch (error) {
    const context = logContext ? `[${logContext}]` : '[DB Transaction]';
    const errorDetails = error instanceof Error ? error.message : String(error);
    
    console.error(`${context} ${errorMessage}:`, errorDetails);
    
    const userError = process.env.NODE_ENV === 'production' 
      ? errorMessage 
      : `${errorMessage}: ${errorDetails}`;
    
    return { 
      error: userError, 
      success: false 
    };
  }
}

/**
 * Middleware to catch database errors in route handlers
 * Wraps the entire route handler with error handling
 */
export function withDbErrorHandler(
  handler: (c: Context) => Promise<Response>
) {
  return async (c: Context): Promise<Response> => {
    try {
      return await handler(c);
    } catch (error) {
      const errorDetails = error instanceof Error ? error.message : String(error);
      
      console.error('[Route Handler Error]:', errorDetails);
      
      const userMessage = process.env.NODE_ENV === 'production'
        ? 'An error occurred processing your request'
        : errorDetails;
      
      return c.json(
        { 
          error: userMessage,
          success: false 
        }, 
        500
      );
    }
  };
}

/**
 * Check if database operation succeeded
 * Type guard for DbResult
 */
export function isDbSuccess<T>(result: DbResult<T>): result is DbResult<T> & { data: T } {
  return result.success && result.data !== undefined;
}

/**
 * Database query builder with automatic error handling
 * For common database patterns
 */
export class SafeDb {
  constructor(private db: any) {}

  /**
   * Safe SELECT query
   */
  async select<T>(query: string, params: any[] = []): Promise<DbResult<T[]>> {
    return dbQuery(
      async () => {
        const stmt = this.db.prepare(query);
        return params.length > 0 
          ? stmt.bind(...params).all()
          : stmt.all();
      },
      'Failed to fetch records',
      'SELECT'
    );
  }

  /**
   * Safe SELECT first
   */
  async first<T>(query: string, params: any[] = []): Promise<DbResult<T | null>> {
    return dbQuery(
      async () => {
        const stmt = this.db.prepare(query);
        return params.length > 0 
          ? stmt.bind(...params).first()
          : stmt.first();
      },
      'Failed to fetch record',
      'SELECT FIRST'
    );
  }

  /**
   * Safe INSERT query
   */
  async insert(query: string, params: any[] = []): Promise<DbResult<any>> {
    return dbQuery(
      async () => {
        const stmt = this.db.prepare(query);
        return params.length > 0 
          ? stmt.bind(...params).run()
          : stmt.run();
      },
      'Failed to insert record',
      'INSERT'
    );
  }

  /**
   * Safe UPDATE query
   */
  async update(query: string, params: any[] = []): Promise<DbResult<any>> {
    return dbQuery(
      async () => {
        const stmt = this.db.prepare(query);
        return params.length > 0 
          ? stmt.bind(...params).run()
          : stmt.run();
      },
      'Failed to update record',
      'UPDATE'
    );
  }

  /**
   * Safe DELETE query
   */
  async delete(query: string, params: any[] = []): Promise<DbResult<any>> {
    return dbQuery(
      async () => {
        const stmt = this.db.prepare(query);
        return params.length > 0 
          ? stmt.bind(...params).run()
          : stmt.run();
      },
      'Failed to delete record',
      'DELETE'
    );
  }
}
