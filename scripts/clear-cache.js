const path = require('path');
const fs = require('fs');

fs.rmSync(path.resolve('node_modules', '.cache'), { recursive: true, force: true });
// console.log('')
