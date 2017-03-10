'use strict';

var chalk = require('chalk');
var yosay = require('yosay');
var os = require('os');
var pkg = require('../../package.json');
var childProcess = require('child_process');

module.exports = {
  initialize,
  printSystemInfos,
  helloYeo,
  gitIsInstalled
}

function initialize() {
  this.gitConfig = {};
  this.gitConfig.remotes = [];
  this.gitConfig.credentials = [];

  this.systemInfos = getSystemInfos();
}

function getSystemInfos() {
  var systemInfos = {};

  systemInfos.type = os.type();
  systemInfos.os = os.platform();
  systemInfos.release = os.release();

  return systemInfos;
}

function printSystemInfos() {
  this.log(chalk.green("Your are on " + this.systemInfos.type + ", " + this.systemInfos.os + " " + this.systemInfos.release + "." + "\n"));
}

function helloYeo() {
  // Have Yeoman greet the user.
  this.log(yosay(
    'Welcome to the premium ' + chalk.red(pkg.name) + ' generator!'
  ));
}

function gitIsInstalled() {
  var gitIsInstalled = childProcess.spawnSync("git", ["--version"]);
  if (gitIsInstalled.stderr != "") {
    this.gitIsInstalled = false;
    process.exit(1);
  } else {
    this.gitIsInstalled = true;
  }

  return this.gitIsInstalled;
}
