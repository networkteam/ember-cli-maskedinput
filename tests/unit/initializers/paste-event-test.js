import Ember from 'ember';
import PasteEventInitializer from 'dummy/initializers/paste-event';
import { module, test } from 'qunit';

const { run, Application } = Ember;

let application;

module('Unit | Initializer | paste event', {
  beforeEach() {
    run(function() {
      application = Application.create();
      application.deferReadiness();
    });
  }
});

test('it registers a customEvent for paste', function(assert) {
  PasteEventInitializer.initialize(application);

  assert.equal(application.get('customEvents.paste'), 'paste');
});
