// minify.js
const shell = require('shelljs');
const glob = require('glob');
const path = require('path');

const jsFiles = glob.sync('build/static/js/*.js');

jsFiles.forEach((file) => {
    const output = path.basename(file);
    shell.exec(`npx terser ${file} --compress --mangle --output build/static/js/${output}`);
});
