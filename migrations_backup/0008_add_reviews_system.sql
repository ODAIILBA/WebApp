-- Migration: Add Product Reviews System
-- Description: Create tables for product reviews, review images, and helpful votes
-- Date: 2026-01-29

-- ============================================================================
-- REVIEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  order_id INTEGER, -- Optional: verify purchase
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_verified_purchase BOOLEAN DEFAULT 0,
  is_approved BOOLEAN DEFAULT 0, -- Moderation
  helpful_count INTEGER DEFAULT 0,
  unhelpful_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- ============================================================================
-- REVIEW IMAGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS review_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  review_id INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  image_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

-- ============================================================================
-- REVIEW HELPFUL VOTES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS review_votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  review_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  is_helpful BOOLEAN NOT NULL, -- TRUE = helpful, FALSE = unhelpful
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(review_id, user_id) -- One vote per user per review
);

-- ============================================================================
-- SELLER RESPONSES TABLE (Optional for future)
-- ============================================================================
CREATE TABLE IF NOT EXISTS review_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  review_id INTEGER NOT NULL,
  admin_user_id INTEGER NOT NULL,
  response_text TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
  FOREIGN KEY (admin_user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(review_id) -- One response per review
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_helpful_count ON reviews(helpful_count DESC);

CREATE INDEX IF NOT EXISTS idx_review_images_review_id ON review_images(review_id);
CREATE INDEX IF NOT EXISTS idx_review_votes_review_id ON review_votes(review_id);
CREATE INDEX IF NOT EXISTS idx_review_votes_user_id ON review_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_review_responses_review_id ON review_responses(review_id);

-- ============================================================================
-- UPDATE PRODUCTS TABLE - ADD REVIEW STATS
-- ============================================================================
-- Add review count and average rating columns if they don't exist
-- Note: rating_average and rating_count already exist in products table

-- ============================================================================
-- TRIGGER: UPDATE REVIEW COUNTS ON PRODUCTS
-- ============================================================================
-- Update product review stats when a review is added
CREATE TRIGGER IF NOT EXISTS update_product_review_stats_insert
AFTER INSERT ON reviews
WHEN NEW.is_approved = 1
BEGIN
  UPDATE products
  SET 
    rating_count = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE product_id = NEW.product_id AND is_approved = 1
    ),
    rating_average = (
      SELECT CAST(AVG(rating) AS REAL)
      FROM reviews 
      WHERE product_id = NEW.product_id AND is_approved = 1
    )
  WHERE id = NEW.product_id;
END;

-- Update product review stats when a review is approved/updated
CREATE TRIGGER IF NOT EXISTS update_product_review_stats_update
AFTER UPDATE ON reviews
BEGIN
  UPDATE products
  SET 
    rating_count = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE product_id = NEW.product_id AND is_approved = 1
    ),
    rating_average = (
      SELECT CAST(AVG(rating) AS REAL)
      FROM reviews 
      WHERE product_id = NEW.product_id AND is_approved = 1
    )
  WHERE id = NEW.product_id;
END;

-- Update product review stats when a review is deleted
CREATE TRIGGER IF NOT EXISTS update_product_review_stats_delete
AFTER DELETE ON reviews
BEGIN
  UPDATE products
  SET 
    rating_count = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE product_id = OLD.product_id AND is_approved = 1
    ),
    rating_average = (
      SELECT CAST(AVG(rating) AS REAL)
      FROM reviews 
      WHERE product_id = OLD.product_id AND is_approved = 1
    )
  WHERE id = OLD.product_id;
END;

-- ============================================================================
-- TRIGGER: UPDATE HELPFUL COUNTS
-- ============================================================================
-- Update review helpful counts when a vote is added
CREATE TRIGGER IF NOT EXISTS update_review_helpful_count_insert
AFTER INSERT ON review_votes
BEGIN
  UPDATE reviews
  SET 
    helpful_count = (
      SELECT COUNT(*) 
      FROM review_votes 
      WHERE review_id = NEW.review_id AND is_helpful = 1
    ),
    unhelpful_count = (
      SELECT COUNT(*) 
      FROM review_votes 
      WHERE review_id = NEW.review_id AND is_helpful = 0
    )
  WHERE id = NEW.review_id;
END;

-- Update review helpful counts when a vote is changed
CREATE TRIGGER IF NOT EXISTS update_review_helpful_count_update
AFTER UPDATE ON review_votes
BEGIN
  UPDATE reviews
  SET 
    helpful_count = (
      SELECT COUNT(*) 
      FROM review_votes 
      WHERE review_id = NEW.review_id AND is_helpful = 1
    ),
    unhelpful_count = (
      SELECT COUNT(*) 
      FROM review_votes 
      WHERE review_id = NEW.review_id AND is_helpful = 0
    )
  WHERE id = NEW.review_id;
END;

-- Update review helpful counts when a vote is deleted
CREATE TRIGGER IF NOT EXISTS update_review_helpful_count_delete
AFTER DELETE ON review_votes
BEGIN
  UPDATE reviews
  SET 
    helpful_count = (
      SELECT COUNT(*) 
      FROM review_votes 
      WHERE review_id = OLD.review_id AND is_helpful = 1
    ),
    unhelpful_count = (
      SELECT COUNT(*) 
      FROM review_votes 
      WHERE review_id = OLD.review_id AND is_helpful = 0
    )
  WHERE id = OLD.review_id;
END;

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================
-- Insert sample reviews for testing
-- INSERT INTO reviews (product_id, user_id, rating, title, content, is_verified_purchase, is_approved)
-- VALUES 
--   (1, 1, 5, 'Excellent product!', 'Works perfectly, very satisfied with the purchase.', 1, 1),
--   (1, 2, 4, 'Good value', 'Good product for the price, quick delivery.', 1, 1),
--   (2, 1, 5, 'Highly recommended', 'Best software I have ever used!', 1, 1);
