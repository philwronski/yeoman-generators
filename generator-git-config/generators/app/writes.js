'use strict';

var chalk = require('chalk');

module.exports = {
  writeSystem,
  writeGlobal,
  writeLocal
}

function writeSystem() {
  this.fs.copyTpl(
    this.templatePath('systeme.txt'),
    this.destinationPath('gitconfig'),
    this.gitConfig
  );
}

function writeGlobal() {
  this.fs.copyTpl(
    this.templatePath('global.txt'),
    this.destinationPath('%USERPROFILE%/.gitconfig'),
    this.gitConfig
  );
}

function writeLocal() {
  console.log(this.gitConfig);
  this.fs.copyTpl(
    this.templatePath('local.txt'),
    this.destinationPath('./git/config'),
    this.gitConfig
  );
}
