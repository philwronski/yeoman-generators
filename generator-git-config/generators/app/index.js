'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var prompts = require('./prompts');
var pkg = require('../../package.json');

module.exports = Generator.extend({

  initializing: function() {
    this.gitConfig = {};
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the premium ' + chalk.red(pkg.name) + ' generator!'
    ));
  },

  prompting: {
    askForUserInformation: prompts.askForUserInformation,
    askForEditor: prompts.askForEditor,
    askForPull: prompts.askForPull,
    askForDefaultAlias: prompts.askForDefaultAlias,
    askForMergeTool: prompts.askForMergeTool,
    askForUseHttpsInsteadOfGit: prompts.askForUseHttpsInsteadOfGit,
    askForBranchConfig: prompts.askForBranchConfig,
    askForRemotes: prompts.askForRemotes
  },

  writing: function() {
    console.log(this.gitConfig);
    /*this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );*/
  },

  install: function() {
    //this.installDependencies();
  }
});
