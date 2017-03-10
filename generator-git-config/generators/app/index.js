'use strict';

var Generator = require('yeoman-generator');
var prompts = require('./prompts');
var writes = require('./writes');
var inits = require('./inits');
var installs = require('./installs');

module.exports = Generator.extend({

  initializing: {
    initialize: inits.initialize,
    helloYeo: inits.helloYeo,
    printSystemInfos: inits.printSystemInfos,
    gitIsInstalled: inits.gitIsInstalled
  },

  prompting: {
    askForUserInformation: prompts.askForUserInformation,
    askForEditor: prompts.askForEditor,
    askForPull: prompts.askForPull,
    askForDefaultAlias: prompts.askForDefaultAlias,
    askForAliases: prompts.askForAliases,
    askForDiff: prompts.askForDiff,
    askForMerge: prompts.askForMerge,
    askForUseHttpsInsteadOfGit: prompts.askForUseHttpsInsteadOfGit,
    askForBranchConfig: prompts.askForBranchConfig,
    askForRemotes: prompts.askForRemotes,
    askForFetchRemote: prompts.askForFetchRemote
  },

  writing: function() {
    writes.writeLocal.call(this);
    /*this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );*/
  },

  install: function() {
    //this.installDependencies();
    if (this.fetchRemote) {
      installs.cloneGitRepository();
    }
  }
});
