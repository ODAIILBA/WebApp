// Product Reviews API Routes
// Import this in index.tsx with: import { setupReviewRoutes } from './routes/reviews'

import type { Hono } from 'hono'

export function setupReviewRoutes(app: Hono<any>) {
  
  // Get reviews for a product (already exists, but improved version)
  app.get('/api/reviews/:productId', async (c) => {
    try {
      const db = c.env.DB
      const productId = c.req.param('productId')
      const page = parseInt(c.req.query('page') || '1')
      const limit = parseInt(c.req.query('limit') || '10')
      const rating = c.req.query('rating')
      const sort = c.req.query('sort') || 'newest' // newest, highest, lowest, helpful
      const offset = (page - 1) * limit

      // Build query
      let query = `
        SELECT 
          r.id,
          r.rating,
          r.title,
          r.comment,
          r.is_verified_purchase,
          r.helpful_count,
          r.unhelpful_count,
          r.created_at,
          u.first_name,
          u.last_name
        FROM product_reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.product_id = ? AND r.is_approved = 1
      `
      const params: any[] = [productId]

      if (rating) {
        query += ` AND r.rating = ?`
        params.push(rating)
      }

      // Sorting
      switch (sort) {
        case 'highest':
          query += ` ORDER BY r.rating DESC, r.created_at DESC`
          break
        case 'lowest':
          query += ` ORDER BY r.rating ASC, r.created_at DESC`
          break
        case 'helpful':
          query += ` ORDER BY r.helpful_count DESC, r.created_at DESC`
          break
        default:
          query += ` ORDER BY r.created_at DESC`
      }

      query += ` LIMIT ? OFFSET ?`
      params.push(limit, offset)

      const reviews = await db.prepare(query).bind(...params).all()

      // Get total count
      let countQuery = `SELECT COUNT(*) as total FROM product_reviews WHERE product_id = ? AND is_approved = 1`
      const countParams: any[] = [productId]
      if (rating) {
        countQuery += ` AND rating = ?`
        countParams.push(rating)
      }
      const countResult = await db.prepare(countQuery).bind(...countParams).first()
      const total = (countResult as any)?.total || 0

      // Get rating distribution
      const distribution = await db.prepare(`
        SELECT rating, COUNT(*) as count
        FROM product_reviews
        WHERE product_id = ? AND is_approved = 1
        GROUP BY rating
        ORDER BY rating DESC
      `).bind(productId).all()

      // Get average rating
      const avgResult = await db.prepare(`
        SELECT AVG(rating) as avg_rating
        FROM product_reviews
        WHERE product_id = ? AND is_approved = 1
      `).bind(productId).first()

      return c.json({
        success: true,
        reviews: reviews.results || [],
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        statistics: {
          averageRating: Math.round(((avgResult as any)?.avg_rating || 0) * 10) / 10,
          totalReviews: total,
          distribution: distribution.results || []
        }
      })
    } catch (error) {
      console.error('Error fetching reviews:', error)
      return c.json({ success: false, error: 'Failed to fetch reviews' }, 500)
    }
  })

  // Submit a new review
  app.post('/api/reviews', async (c) => {
    try {
      const db = c.env.DB
      const userId = c.get('userId')
      
      const { product_id, rating, title, comment, reviewer_name, order_id } = await c.req.json()

      if (!product_id || !rating || rating < 1 || rating > 5) {
        return c.json({ success: false, error: 'Invalid input' }, 400)
      }

      // For guest reviews, require reviewer_name
      if (!userId && !reviewer_name) {
        return c.json({ success: false, error: 'Reviewer name is required' }, 400)
      }

      // Check if user has already reviewed this product (only for logged-in users)
      if (userId) {
        const existing = await db.prepare(`
          SELECT id FROM product_reviews 
          WHERE product_id = ? AND user_id = ?
        `).bind(product_id, userId).first()

        if (existing) {
          return c.json({ success: false, error: 'You have already reviewed this product' }, 400)
        }
      }

      // Check if verified purchase (only for logged-in users with orders)
      let isVerifiedPurchase = 0
      if (userId && order_id) {
        const order = await db.prepare(`
          SELECT o.id 
          FROM orders o
          JOIN order_items oi ON o.id = oi.order_id
          WHERE o.id = ? AND o.user_id = ? AND oi.product_id = ? AND o.status IN ('completed', 'processing')
        `).bind(order_id, userId, product_id).first()
        
        if (order) {
          isVerifiedPurchase = 1
        }
      }

      // Insert review (needs manual approval for guest reviews)
      const result = await db.prepare(`
        INSERT INTO product_reviews (
          product_id, user_id, order_id, rating, title, comment, 
          reviewer_name, is_verified_purchase, is_approved, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `).bind(
        product_id, 
        userId || null, 
        order_id || null, 
        rating, 
        title || '', 
        comment || '', 
        reviewer_name || 'Anonymous',
        isVerifiedPurchase,
        userId ? 1 : 0 // Auto-approve for logged-in users, manual for guests
      ).run()

      return c.json({
        success: true,
        message: userId ? 'Review submitted successfully' : 'Review submitted and pending approval',
        reviewId: result.meta.last_row_id
      })
    } catch (error) {
      console.error('Error submitting review:', error)
      return c.json({ success: false, error: 'Failed to submit review' }, 500)
    }
  })

  // Vote on review (helpful/unhelpful)
  app.post('/api/reviews/:reviewId/vote', async (c) => {
    try {
      const db = c.env.DB
      const userId = c.get('userId')
      
      if (!userId) {
        return c.json({ success: false, error: 'Authentication required' }, 401)
      }

      const reviewId = c.req.param('reviewId')
      const { vote_type } = await c.req.json() // 'helpful' or 'unhelpful'

      if (!['helpful', 'unhelpful'].includes(vote_type)) {
        return c.json({ success: false, error: 'Invalid vote type' }, 400)
      }

      // Check if user has already voted
      const existing = await db.prepare(`
        SELECT id, vote_type FROM review_votes 
        WHERE review_id = ? AND user_id = ?
      `).bind(reviewId, userId).first()

      if (existing) {
        if ((existing as any).vote_type === vote_type) {
          // Remove vote if same type
          await db.prepare(`DELETE FROM review_votes WHERE id = ?`).bind((existing as any).id).run()
          
          // Update count
          const column = vote_type === 'helpful' ? 'helpful_count' : 'unhelpful_count'
          await db.prepare(`
            UPDATE product_reviews 
            SET ${column} = ${column} - 1 
            WHERE id = ?
          `).bind(reviewId).run()
          
          return c.json({ success: true, message: 'Vote removed' })
        } else {
          // Change vote type
          await db.prepare(`
            UPDATE review_votes SET vote_type = ? WHERE id = ?
          `).bind(vote_type, (existing as any).id).run()
          
          // Update counts
          const addColumn = vote_type === 'helpful' ? 'helpful_count' : 'unhelpful_count'
          const subColumn = vote_type === 'helpful' ? 'unhelpful_count' : 'helpful_count'
          await db.prepare(`
            UPDATE product_reviews 
            SET ${addColumn} = ${addColumn} + 1, ${subColumn} = ${subColumn} - 1 
            WHERE id = ?
          `).bind(reviewId).run()
          
          return c.json({ success: true, message: 'Vote updated' })
        }
      }

      // Add new vote
      await db.prepare(`
        INSERT INTO review_votes (review_id, user_id, vote_type)
        VALUES (?, ?, ?)
      `).bind(reviewId, userId, vote_type).run()

      // Update count
      const column = vote_type === 'helpful' ? 'helpful_count' : 'unhelpful_count'
      await db.prepare(`
        UPDATE product_reviews 
        SET ${column} = ${column} + 1 
        WHERE id = ?
      `).bind(reviewId).run()

      return c.json({ success: true, message: 'Vote recorded' })
    } catch (error) {
      console.error('Error voting on review:', error)
      return c.json({ success: false, error: 'Failed to vote' }, 500)
    }
  })

  // Get user's own reviews
  app.get('/api/reviews/my-reviews', async (c) => {
    try {
      const db = c.env.DB
      const userId = c.get('userId')
      
      if (!userId) {
        return c.json({ success: false, error: 'Authentication required' }, 401)
      }

      const reviews = await db.prepare(`
        SELECT 
          r.*,
          p.name as product_name,
          p.slug as product_slug
        FROM product_reviews r
        JOIN products p ON r.product_id = p.id
        WHERE r.user_id = ?
        ORDER BY r.created_at DESC
      `).bind(userId).all()

      return c.json({
        success: true,
        reviews: reviews.results || []
      })
    } catch (error) {
      console.error('Error fetching user reviews:', error)
      return c.json({ success: false, error: 'Failed to fetch reviews' }, 500)
    }
  })
}
