ALTER TABLE brands ADD COLUMN is_featured INTEGER DEFAULT 0;
-- Make first 3 brands featured
UPDATE brands SET is_featured = 1 WHERE id <= 3;
