let execSync = require('child_process').execSync;
let exec = require('child_process').exec;
let process = require('process');
let path = require('path');

const KOMPOT_FILE_EXTENTION = '.kompot.spec.js';
const GENERATED_BUNDLES_DIR = './node_modules/kompot/.generatedBundles';

createBundleOutputDir();
filePathList = getAllFilesWithKompotExtention();

console.log('Generating bundles for:');
console.log(filePathList.join('\n'));

filePathList.forEach(filePath => {
    const fileName = path.basename(filePath, KOMPOT_FILE_EXTENTION);
    exec(`node_modules/.bin/webpack --mode production --config node_modules/kompot/webpackUtils/webpack.config.js  --entry  ${filePath} --output ${GENERATED_BUNDLES_DIR}/${fileName}.bundle.js`, (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }
        console.log(stdout);
    });
});

function getAllFilesWithKompotExtention() {
    const allFilesWithKompotExtention = execSync(`find . -not \\( -path ./node_modules -prune \\)  -not \\( -path ./.idea -prune \\)  -type f  -name '*.kompot.*.js'`).toString();
    const filePathList = allFilesWithKompotExtention.split('\n').filter(path => path !== '');
    return filePathList;
}

function createBundleOutputDir() {
    execSync(`rm -rf ${GENERATED_BUNDLES_DIR} && mkdir ${GENERATED_BUNDLES_DIR}`);
}