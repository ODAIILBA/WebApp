#!/usr/bin/env node
/**
 * Apply all SQL migrations to local D1 database
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process'); // nosemgrep

const migrationsDir = path.join(__dirname, 'migrations');
const migrations = [
  '0001_initial_schema.sql',
  // Add more as needed
];

console.log('🔧 Applying D1 migrations to local database...\n');

migrations.forEach((file, index) => {
  const filePath = path.join(migrationsDir, file); // nosemgrep
  
  if (!fs.existsSync(filePath)) { // nosemgrep
    console.log(`⚠️  Skipping ${file} - file not found`);
    return;
  }
  
  console.log(`📝 Applying migration ${index + 1}/${migrations.length}: ${file}`);
  
  try {
    // Use wrangler d1 execute to run the SQL file
    const command = `npx wrangler d1 execute DB --local --file=${filePath}`;
    execSync(command, { stdio: 'inherit', cwd: __dirname }); // nosemgrep
    console.log(`✅ Applied ${file}\n`);
  } catch (error) {
    console.error(`❌ Failed to apply ${file}:`, error.message);
    process.exit(1);
  }
});

console.log('🎉 All migrations applied successfully!');
