// Simple build script to compile TypeScript while bypassing dependency type issues
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building TypeScript files...');

// Create lib directory if it doesn't exist
const libDir = path.join(__dirname, 'lib');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

try {
  // Compile only our source files, ignoring node_modules
  execSync('npx tsc --skipLibCheck --outDir lib', { 
    stdio: 'inherit',
    encoding: 'utf-8'
  });
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
