'use strict';

var chalk = require('chalk');

module.exports = {
  askForUserInformation,
  askForEditor,
  askForPull,
  askForDefaultAlias,
  askForAliases,
  askForDiff,
  askForMerge,
  askForUseHttpsInsteadOfGit,
  askForBranchConfig,
  askForRemotes
}

function askForUserInformation() {
  var done = this.async();

  var prompts = [{
    type: 'input',
    name: 'user_name',
    message: 'What\'s your name?',
    store: true
  },
  {
    type: 'input',
    name: 'user_email',
    message: 'What\'s your email?',
    store: true
  }];

  this.prompt(prompts).then(function (props) {
    // To access props later use this.props.someAnswer;
    this.gitConfig.user = {};
    this.gitConfig.user.name = props.user_name;
    this.gitConfig.user.email = props.user_email;

    done();
  }.bind(this));
}

function askForEditor() {
  var done = this.async();

  var prompts = [{
    type: 'list',
    name: 'core_editor',
    message: 'What is your code editor?',
    choices: ['vi', 'nano', 'atom'],
    store: true
  },
  {
    type: 'confirm',
    name: 'core_ctrlauto',
    message: 'Allow ctrlauto?',
    default: false,
    store: true
  }];

  this.prompt(prompts).then(function (props) {
    // To access props later use this.props.someAnswer;
    this.gitConfig.core = {};
    this.gitConfig.core.editor = props.core_editor;
    this.gitConfig.core.ctrlauto = props.core_ctrlauto;
    if(!props.core_ctrlauto) {
      this.gitConfig.core.eol = 'lf';
    }
    done();
  }.bind(this));
}

function askForPull() {
  var done = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'pull_rebase',
    message: 'Do you want active pull rebase?',
    default: true,
    store: true
  }];

  this.prompt(prompts).then(function (props) {
    // To access props later use this.props.someAnswer;
    this.gitConfig.pull = {};
    this.gitConfig.pull.rebase = props.pull_rebase;

    done();
  }.bind(this));
}

function askForDefaultAlias() {
  var done = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'alias',
    message: 'Do you want active default alias?',
    default: true,
    store: true
  }];

  this.prompt(prompts).then(function (props) {
    // To access props later use this.props.someAnswer;
    this.gitConfig.alias = [];
    this.gitConfig.alias.push({alias : "hist", command : "log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short"});
    this.gitConfig.alias.push({alias : "type", command : "cat-file –t"});
    this.gitConfig.alias.push({alias : "dump", command : "cat-file –p"});

    done();
  }.bind(this));
}

function askForAliases() {
  var done = this.async();

  if(this.gitConfig.remotes === undefined) {
    this.gitConfig.alias = [];
  }

  askForAlias.call(this, done);
}

function askForAlias() {
  var done = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'add_alias',
    message: 'Do you want to add alias?',
    default: true,
    store: true
  },
  {
    when: function(response) {
      return response.add_alias;
    },
    type: 'input',
    name: 'alias_cmd',
    message: 'What is the alias command?'
  },
  {
    when: function(response) {
      return response.add_alias;
    },
    type: 'input',
    name: 'alias_name',
    message: 'What is the alias name?',
  }];

  this.prompt(prompts).then(function (props) {
    if(props.add_alias) {
      this.gitConfig.alias.push({"alias" : props.alias_name, "command" : props.alias_command});
      askForAlias.call(this, done);
    } else {
      done();
    }

  }.bind(this));
}

function askForDiff() {
  var done = this.async();

  var prompts = [{
    type: 'list',
    name: 'diff_tool',
    message: 'What is your diff tool?',
    choices: ['kdiff3', 'tkdiff', 'meld', 'xxdiff', 'emerge', 'vimdiff', 'gvimdiff', 'ecmerge', 'opendiff'],
    default: 'vimdiff',
    store: true
  }];

  this.prompt(prompts).then(function (props) {
    // To access props later use this.props.someAnswer;
    this.gitConfig.diff = {};
    this.gitConfig.diff.tool = props.diff_tool;

    done();
  }.bind(this));
}

function askForMerge() {
  var done = this.async();

  var prompts = [{
    type: 'list',
    name: 'merge_tool',
    message: 'What is your merge tool?',
    choices: ['kdiff3', 'tkdiff', 'meld', 'xxdiff', 'emerge', 'vimdiff', 'gvimdiff', 'ecmerge', 'opendiff'],
    default: 'vimdiff',
    store: true
  }];

  this.prompt(prompts).then(function (props) {
    // To access props later use this.props.someAnswer;
    this.gitConfig.merge = {};
    this.gitConfig.merge.tool = props.merge_tool;

    done();
  }.bind(this));
}

function askForUseHttpsInsteadOfGit() {
  var done = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'url_insteadOf',
    message: 'Do you want to use HTTPS instead of GIT?',
    default: false,
    store: true
  }];

  this.prompt(prompts).then(function (props) {
    // To access props later use this.props.someAnswer;
    this.gitConfig.urls = [];
    this.gitConfig.urls.push({"name" : "https://", "insteadOf" : "git://"});

    done();
  }.bind(this));
}

function askForBranchConfig() {
  var done = this.async();

  var prompts = [{
    type: 'list',
    name: 'branch_autoSetupRebase',
    message: 'Do you want to tell Git to set up pull to rebase instead of merge?',
    choices: [
      {
        value: 'never',
        name: 'Never, rebase is never automatically set to true.'
      },
      {
        value: 'local',
        name: 'Local, rebase is set to true for tracked branches of other local branches.'
      },
      {
        value: 'remote',
        name: 'Remote, rebase is set to true for tracked branches of remote-tracking branches.'
      },{
        value: 'always',
        name: 'Always, rebase will be set to true for all tracking branches.'
      }
    ],
    default: 'always',
    store: true
  }];

  this.prompt(prompts).then(function (props) {
    // To access props later use this.props.someAnswer;
    this.gitConfig.branch = {};
    this.gitConfig.branch.autoSetupRebase = props.branch_autoSetupRebase;

    done();
  }.bind(this));
}

function askForRemotes() {
  var done = this.async();

  askForRemote.call(this, done);
}

function askForRemote() {
  var done = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'add_remote',
    message: 'Do you want to add remote?',
    default: true,
    store: true
  },
  {
    when: function(response) {
      return response.add_remote;
    },
    type: 'input',
    name: 'remote_url',
    message: 'What is the remote url?'
  },
  {
    when: function(response) {
      return response.add_remote;
    },
    type: 'input',
    name: 'remote_shortName',
    message: 'What is the remote short name?',
  },
  {
    when: function(response) {
      return response.add_remote;
    },
    type: 'confirm',
    name: 'remote_storeCredential',
    message: 'Do you want to store credential for this remote?',
  },
  {
    when: function(response) {
      return response.add_remote && response.remote_storeCredential;
    },
    type: 'input',
    name: 'remote_credential_username',
    message: 'What is username for this remote?',
  }];

  this.prompt(prompts).then(function (props) {
    if(props.add_remote) {
      this.gitConfig.remotes.push({"name": props.remote_shortName, "value": props.remote_url});
      if(props.remote_storeCredential) {
        this.gitConfig.credentials.push({"url": props.remote_url, "helper": "wincred", "username": props.remote_credential_username});
      }
      askForRemote.call(this, done);
    } else {
      done();
    }

  }.bind(this));
}

function askForFetchRemote() {
  var done = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'fetch_remote',
    message: 'Your git-config is completed, do you want to fetch remote?',
    default: false,
    store: true
  }];

  this.prompt(prompts).then(function (props) {
    // To access props later use this.props.someAnswer;
    this.fetchRemote = props.fetch_remote;

    done();
  }.bind(this));
}
