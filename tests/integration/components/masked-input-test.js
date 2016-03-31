import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

moduleForComponent('masked-input', 'Integration | Component | masked input', {
  integration: true
});

test('it applies maxlength from mask', function(assert) {
  this.render(hbs`{{masked-input mask='11:11'}}`);

  assert.equal(this.$('input').attr('maxlength'), 5);
});

test('it applies size from mask', function(assert) {
  this.render(hbs`{{masked-input mask='11:11'}}`);

  assert.equal(this.$('input').attr('size'), 5);
});

test('it sets a placholder from InputMask', function(assert) {
  this.render(hbs`{{masked-input mask='11:11'}}`);

  assert.equal(this.$('input').attr('placeholder'), '__:__');
});

test('it accepts only valid key presses', function(assert) {
  this.render(hbs`{{masked-input mask='11:11'}}`);

  this.$('input').focus();

  let e = $.Event('keypress', { which: 49, keyCode: 49, charCode: 49 });
  this.$('input').trigger(e);
  e = $.Event('keypress', { which: 120, keyCode: 120, charCode: 120 });
  this.$('input').trigger(e);
  e = $.Event('keypress', { which: 50, keyCode: 50, charCode: 50 });
  this.$('input').trigger(e);

  assert.equal(this.$('input').val(), '12:__');
});

test('it clears masked characters with backspace', function(assert) {
  this.render(hbs`{{masked-input mask='11:11'}}`);

  this.$('input').focus();

  let e = $.Event('keypress', { which: 49, keyCode: 49, charCode: 49 });
  this.$('input').trigger(e);
  e = $.Event('keypress', { which: 120, keyCode: 120, charCode: 120 });
  this.$('input').trigger(e);
  e = $.Event('keypress', { which: 50, keyCode: 50, charCode: 50 });
  this.$('input').trigger(e);

  assert.equal(this.$('input').val(), '12:__');
});
