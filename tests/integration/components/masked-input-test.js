import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, focus } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

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

    let e = $.Event('keypress', { which: 49, keyCode: 49, charCode: 49 });
    this.$('input').trigger(e);
    e = $.Event('keypress', { which: 120, keyCode: 120, charCode: 120 });
    this.$('input').trigger(e);
    e = $.Event('keypress', { which: 50, keyCode: 50, charCode: 50 });
    this.$('input').trigger(e);

    assert.dom('input').hasValue('12:__');
  });

  test('it clears masked characters with backspace', async function(assert) {
    await render(hbs`{{masked-input mask='11:11'}}`);

    await focus('input');

    let e = $.Event('keypress', { which: 49, keyCode: 49, charCode: 49 });
    this.$('input').trigger(e);
    e = $.Event('keypress', { which: 120, keyCode: 120, charCode: 120 });
    this.$('input').trigger(e);
    e = $.Event('keypress', { which: 50, keyCode: 50, charCode: 50 });
    this.$('input').trigger(e);

    assert.dom('input').hasValue('12:__');
  });

  test('it sets the display from an initial value given to InputMask', async function(assert) {
    await render(hbs`{{masked-input mask='11:11' value='2222'}}`);

    assert.dom('input').hasValue('22:22');
  });
});
