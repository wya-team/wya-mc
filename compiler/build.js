const { resolve } = require('path');
const { exec } = require('child_process');
const gulpConfig = resolve(__dirname, './compiler.js');

const $process = exec(`npx gulp -f ${gulpConfig} build --color`);
$process.stdout.on('data', (stdout) => console.info(stdout));
$process.stderr.on('data', (stderr) => console.info(stderr));