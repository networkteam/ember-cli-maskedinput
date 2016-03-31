import Ember from 'ember';
import PasteEventInitializer from 'dummy/initializers/paste-event';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | paste event', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

test('it registers a customEvent for paste', function(assert) {
  PasteEventInitializer.initialize(application);

  assert.equal(application.get('customEvents.paste'), 'paste');
});
