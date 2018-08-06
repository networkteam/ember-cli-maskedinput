import { run } from '@ember/runloop';
import Application from '@ember/application';
import PasteEventInitializer from 'dummy/initializers/paste-event';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | paste event', function(hooks) {
  hooks.beforeEach(function() {
    run(function() {
      application = Application.create();
      application.deferReadiness();
    });
  });

  test('it registers a customEvent for paste', function(assert) {
    PasteEventInitializer.initialize(application);

    assert.equal(application.get('customEvents.paste'), 'paste');
  });
});
