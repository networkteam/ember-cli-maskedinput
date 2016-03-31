(function (global) {
  define('inputmask-core', [ 'exports' ], function(self) {
    'use strict';

    var module = {};

    <%= moduleBody %>
  
    self['default'] = InputMask;
  });
}(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this));
