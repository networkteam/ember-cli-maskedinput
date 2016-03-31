/* jshint node: true */
'use strict';
var p = require('path');
var templatePath = p.resolve(__dirname + '/assets/module-template.js.t');

var stew = require('broccoli-stew');
var rename = stew.rename;
var find = stew.find;
var Template = require('broccoli-templater');
var mergeTrees = require('broccoli-merge-trees')

function expand(input) {
  var path = p.dirname(input);
  var file = p.basename(input);

  return path + '/{' + file + '}';
}

module.exports = {
  name: 'ember-maskedinput',

  treeForVendor: function(tree) {
    var modulePath = require.resolve('inputmask-core');
    var expandedModulePath = expand(modulePath);

    var inputmaskCore = rename(find(expandedModulePath), function(path) {
      return 'inputmask-core/index.js'
    });

    return mergeTrees([
      new Template(inputmaskCore, templatePath, function variables(content) {
        return {
          moduleBody: content
        };
      })
    ]);
  },

  included: function(app) {
    this.app = app;
    this._super.included(app);

    app.import('vendor/inputmask-core/index.js', {
      exports: {
        default: [
          'default'
        ]
      }
    });
  }
};
