'use strict';
var chalk = require('chalk');

module.exports = {
  writeSystem,
  writeGlobal,
  writeLocal
}

function writeSystem() {
  this.fs.copy(
    this.templatePath('systeme.txt'),
    this.destinationPath('gitconfig')
  );
}

function writeGlobal() {
  this.fs.copy(
    this.templatePath('global.txt'),
    this.destinationPath('%USERPROFILE%/.gitconfig')
  );
}

function writeLocal() {
  this.fs.copy(
    this.templatePath('local.txt'),
    this.destinationPath('./git/config')
  );
}
