import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, focus, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | masked input', function(hooks) {
  setupRenderingTest(hooks);

  test('it applies maxlength from mask', async function(assert) {
    await render(hbs`{{masked-input mask='11:11'}}`);

    assert.equal(find('input').getAttribute('maxlength'), 5);
  });

  test('it applies size from mask', async function(assert) {
    await render(hbs`{{masked-input mask='11:11'}}`);

    assert.equal(find('input').getAttribute('size'), 5);
  });

  test('it sets a placholder from InputMask', async function(assert) {
    await render(hbs`{{masked-input mask='11:11'}}`);

    assert.equal(find('input').getAttribute('placeholder'), '__:__');
  });

  test('it accepts only valid key presses', async function(assert) {
    await render(hbs`{{masked-input mask='11:11'}}`);

    await focus('input');

    await triggerKeyEvent('input', 'keypress', 49)
    await triggerKeyEvent('input', 'keypress', 120)
    await triggerKeyEvent('input', 'keypress', 50)

    assert.dom('input').hasValue('12:__');
  });

  test('it clears masked characters with backspace', async function(assert) {
    await render(hbs`{{masked-input mask='11:11'}}`);

    await focus('input');

    await triggerKeyEvent('input', 'keypress', 49)
    await triggerKeyEvent('input', 'keypress', 120)
    await triggerKeyEvent('input', 'keypress', 50)

    assert.dom('input').hasValue('12:__');
  });

  test('it sets the display from an initial value given to InputMask', async function(assert) {
    await render(hbs`{{masked-input mask='11:11' value='2222'}}`);

    assert.dom('input').hasValue('22:22');
  });
});
