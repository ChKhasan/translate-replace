const fs = require('fs');
const path = require('path');

// Path to the test.js file inside the package
const testJsPath = path.resolve(__dirname, './translate.config.js');

// Path where you want to copy the test.js file
const destinationPath = path.resolve(__dirname, '..', '..', './translate.config.js');

// Read the content of test.js and copy it to the destination
const testJsContent = fs.readFileSync(testJsPath, 'utf-8');
fs.writeFileSync(destinationPath, testJsContent);

console.log('test.js copied to', destinationPath);
