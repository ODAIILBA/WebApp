-- Map products to categories based on their category name
UPDATE products SET category_id = 2 WHERE category = 'Office Software';
UPDATE products SET category_id = 3 WHERE category = 'Operating Systems';
UPDATE products SET category_id = 4 WHERE category = 'Antivirus';
UPDATE products SET category_id = 5 WHERE category = 'Design Software';
UPDATE products SET category_id = 1 WHERE category = 'Security Software';
UPDATE products SET category_id = 6 WHERE category = 'Development Tools';
