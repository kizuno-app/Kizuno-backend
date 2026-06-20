const fs = require('fs');
const path = require('path');

const srcModulesDir = path.join(__dirname, 'src', 'modules');
const distModulesDir = path.join(__dirname, 'dist', 'modules');

if (!fs.existsSync(srcModulesDir)) {
  console.log('No modules folder found in src. Skipping client copying.');
  process.exit(0);
}

// Ensure the dist modules directory exists
if (!fs.existsSync(distModulesDir)) {
  fs.mkdirSync(distModulesDir, { recursive: true });
}

fs.readdirSync(srcModulesDir).forEach(mod => {
  const srcClientDir = path.join(srcModulesDir, mod, 'db', 'client');
  const distClientDir = path.join(distModulesDir, mod, 'db', 'client');

  if (fs.existsSync(srcClientDir)) {
    console.log(`Copying generated client for module "${mod}" to dist...`);
    const distDbDir = path.join(distModulesDir, mod, 'db');
    if (!fs.existsSync(distDbDir)) {
      fs.mkdirSync(distDbDir, { recursive: true });
    }
    // Copy the directory recursively
    fs.cpSync(srcClientDir, distClientDir, { recursive: true });
  }
});

console.log('All module clients copied successfully.');
