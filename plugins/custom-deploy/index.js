'use strict';

class MyPlugin {
  constructor() {
    this.commands = {
      "TESTSETSETSTE": {
        lifecycleEvents: [
          'resources',
          'functions'
        ]
      },
    };
  }
}

module.exports = MyPlugin;
