/**
 * Database Query Helpers with Built-in Pagination
 * Provides consistent pagination across all database queries
 */

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Add LIMIT and OFFSET to any query
 * 
 * @example
 * const { query, offset, limit } = addPagination(
 *   'SELECT * FROM products WHERE status = ?',
 *   { page: 2, limit: 20 }
 * );
 * // Returns: 'SELECT * FROM products WHERE status = ? LIMIT 20 OFFSET 20'
 */
export function addPagination(
  baseQuery: string,
  params: PaginationParams = {}
): { query: string; offset: number; limit: number; page: number } {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 20)); // Max 100 per page
  const offset = (page - 1) * limit;

  const paginatedQuery = `${baseQuery} LIMIT ? OFFSET ?`;

  return { query: paginatedQuery, offset, limit, page };
}

/**
 * Execute paginated query with total count
 * 
 * @example
 * const result = await executePaginatedQuery(
 *   db,
 *   'SELECT * FROM products WHERE status = ?',
 *   'SELECT COUNT(*) as total FROM products WHERE status = ?',
 *   { page: 1, limit: 20 },
 *   ['active']
 * );
 * 
 * // result.data: array of products
 * // result.pagination: { page, limit, total, totalPages, hasNext, hasPrev }
 */
export async function executePaginatedQuery<T>(
  db: any,
  baseQuery: string,
  countQuery: string,
  params: PaginationParams = {},
  bindings: any[] = []
): Promise<PaginatedResult<T>> {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 20));
  const offset = (page - 1) * limit;

  // Get total count first
  const countResult = await db.prepare(countQuery).bind(...bindings).first();
  const total = countResult?.total || 0;

  // Get paginated data
  const paginatedQuery = `${baseQuery} LIMIT ? OFFSET ?`;
  const result = await db
    .prepare(paginatedQuery)
    .bind(...bindings, limit, offset)
    .all();

  const totalPages = Math.ceil(total / limit);

  return {
    data: result.results || [],
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

/**
 * Simple pagination for queries without count
 * Useful when total count is expensive to calculate
 * 
 * @example
 * const result = await executeSimplePagination(
 *   db,
 *   'SELECT * FROM products ORDER BY created_at DESC',
 *   { page: 1, limit: 20 }
 * );
 */
export async function executeSimplePagination<T>(
  db: any,
  query: string,
  params: PaginationParams = {},
  bindings: any[] = []
): Promise<{ data: T[]; page: number; limit: number }> {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 20));
  const offset = (page - 1) * limit;

  const paginatedQuery = `${query} LIMIT ? OFFSET ?`;
  const result = await db
    .prepare(paginatedQuery)
    .bind(...bindings, limit, offset)
    .all();

  return {
    data: result.results || [],
    page,
    limit,
  };
}

/**
 * Build pagination links for API responses
 * 
 * @example
 * const links = buildPaginationLinks('/api/products', result.pagination);
 * // Returns: { first, prev, next, last }
 */
export function buildPaginationLinks(
  baseUrl: string,
  pagination: PaginatedResult<any>['pagination']
): {
  first: string | null;
  prev: string | null;
  next: string | null;
  last: string | null;
} {
  const { page, totalPages, hasNext, hasPrev, limit } = pagination;

  const buildUrl = (p: number) => `${baseUrl}?page=${p}&limit=${limit}`;

  return {
    first: totalPages > 0 ? buildUrl(1) : null,
    prev: hasPrev ? buildUrl(page - 1) : null,
    next: hasNext ? buildUrl(page + 1) : null,
    last: totalPages > 0 ? buildUrl(totalPages) : null,
  };
}

/**
 * Extract pagination params from URL query string
 * 
 * @example
 * const params = extractPaginationParams(c.req.query());
 * // Returns: { page: 1, limit: 20 }
 */
export function extractPaginationParams(query: Record<string, string>): PaginationParams {
  return {
    page: query.page ? parseInt(query.page, 10) : 1,
    limit: query.limit ? parseInt(query.limit, 10) : 20,
  };
}
