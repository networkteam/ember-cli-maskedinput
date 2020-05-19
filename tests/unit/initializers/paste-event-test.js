import Application from '@ember/application';

import { initialize } from 'dummy/initializers/paste-event';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';

module('Unit | Initializer | paste-event', function(hooks) {
  hooks.beforeEach(function() {
    this.TestApplication = Application.extend();
    this.TestApplication.initializer({
      name: 'initializer under test',
      initialize
    });

    this.application = this.TestApplication.create({ autoboot: false });
  });

  hooks.afterEach(function() {
    run(this.application, 'destroy');
  });

  test('it registers a customEvent for paste', async function(assert) {
    await this.application.boot();

    assert.equal(this.application.get('customEvents.paste'), 'paste');
  });
});
