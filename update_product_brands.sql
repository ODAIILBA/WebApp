-- Map products to brands based on product names
UPDATE products SET brand_id = 1 WHERE name LIKE '%Microsoft%';  -- Microsoft
UPDATE products SET brand_id = 2 WHERE name LIKE '%Adobe%';      -- Adobe
UPDATE products SET brand_id = 3 WHERE name LIKE '%Norton%';     -- Norton
UPDATE products SET brand_id = 4 WHERE name LIKE '%Kaspersky%';  -- Kaspersky
UPDATE products SET brand_id = 5 WHERE name LIKE '%Bitdefender%'; -- Bitdefender
