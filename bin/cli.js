#!/usr/bin/env node

const {execSync} = require('child_process');

const runCommand = command => {
    try {
        execSync(`${command}`, {stdio: 'inherit'});
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/yoda-libs/create-glaze-ui ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install -y`;
const cleanupPackageJsonCommand = `cd ${repoName} && node_modules/.bin/json -I -f package.json -e 'this.name="${repoName}"; delete this.author; delete this.bin; delete this.repository; delete this.keywords; this.description=""'`;
const removeBinFolderCommand = `cd ${repoName} && rm -rf bin`;


console.log(`Cloning the repository with name ${repoName}`);
const  checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

const cleanupPackageJson = runCommand(cleanupPackageJsonCommand);
if (!cleanupPackageJson) process.exit(-1);

const removedBinFolder = runCommand(removeBinFolderCommand);
if (!removedBinFolder) process.exit(-1);


console.log("Congratulations! You are ready. Follow these commands to start.");
console.log(`cd ${repoName}`);
console.log("npm start");


