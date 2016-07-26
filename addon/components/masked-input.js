import Ember from 'ember';
import InputMask from 'inputmask-core';
import { getSelection, setSelection } from '../util/selection';

const { computed, TextField, run: { next } } = Ember;

const KEYCODE_Z = 90;
const KEYCODE_Y = 89;
const KEYCODE_BACKSPACE = 8;

function isUndo(e) {
  return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Y : KEYCODE_Z);
}

function isRedo(e) {
  return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Z : KEYCODE_Y);
}

const PROTECTED_ATTRS = ['change', 'keyDown', 'keyPress', 'paste'];

export default TextField.extend({
  mask: null,
  formatCharacters: null,
  placeholderChar: '_',

  'on-change'() {
    return this;
  },

  init() {
    this._super(...arguments);
    PROTECTED_ATTRS.forEach((key) => {
      if (this.attrs[key]) {
        if (console && console.warn) {
          console.warn(`WARNING: Attribute "${key}" of {{masked-input}} helper should not be overriden${key === 'change' ? ', please use "on-${key}" for custom event handlers' : ''}`);
        }
      }
    });
  },

  didInsertElement() {
    this._super(...arguments);
    let el = this.get('element');
    el.value = this._getDisplayValue();
  },

  _inputMask: computed('mask', 'value', 'formatCharacters', 'placeholderChar', function() {
    let options = {
      pattern: this.get('mask'),
      value: this.get('value'),
      formatCharacters: this.get('formatCharacters')
    };
    let placeholderChar = this.get('placeholderChar');
    if (placeholderChar) {
      options.placeholderChar = placeholderChar;
    }
    return new InputMask(options);
  }),

  maxlength: computed('mask', function() {
    let pattern = this.get('mask') || '';
    return pattern.length;
  }),

  placeholder: computed('_inputMask', function() {
    return this.get('_inputMask').emptyValue;
  }),

  size: computed('mask', function() {
    let pattern = this.get('mask') || '';
    return pattern.length;
  }),

  _updateMaskSelection() {
    let el = this.get('element');
    this.get('_inputMask').selection = getSelection(el);
  },

  _updateInputSelection() {
    let el = this.get('element');
    let mask = this.get('_inputMask');
    setSelection(el, mask.selection);
  },

  _getDisplayValue() {
    let mask = this.get('_inputMask');
    let value = mask.getValue();
    return value === mask.emptyValue ? '' : value;
  },

  change(e) {
    let mask = this.get('_inputMask');
    let maskValue = mask.getValue();
    if (e.target.value !== maskValue) {
      // Cut or delete operations will have shortened the value
      if (e.target.value.length < maskValue.length) {
        let sizeDiff = maskValue.length - e.target.value.length;
        this._updateMaskSelection();
        mask.selection.end = mask.selection.start + sizeDiff;
        mask.backspace();
      }
      let value = this._getDisplayValue();
      e.target.value = value;
      if (value) {
        this._updateInputSelection();
      }
    }
    this.get('on-change')(e);
  },

  keyDown(e) {
    let mask = this.get('_inputMask');
    if (isUndo(e)) {
      e.preventDefault();
      if (mask.undo()) {
        e.target.value = this._getDisplayValue();
        this._updateInputSelection();
        this.get('on-change')(e);
      }
      return;
    } else if (isRedo(e)) {
      e.preventDefault();
      if (mask.redo()) {
        e.target.value = this._getDisplayValue();
        this._updateInputSelection();
        this.get('on-change')(e);
      }
      return;
    }

    if (e.keyCode === KEYCODE_BACKSPACE) {
      e.preventDefault();
      this._updateMaskSelection();
      if (mask.backspace()) {
        let value = this._getDisplayValue();
        e.target.value = value;
        if (value) {
          this._updateInputSelection();
        }
        this.get('on-change')(e);
      }
    }
  },

  keyPress(e) {
    // Ignore modified key presses
    // Ignore enter key to allow form submission
    if (e.metaKey || e.altKey || e.ctrlKey || e.keyCode === 13) {
      return;
    }

    e.preventDefault();
    this._updateMaskSelection();
    let mask = this.get('_inputMask');
    let key = String.fromCharCode(e.charCode);
    if (mask.input(key)) {
      e.target.value = mask.getValue();
      this._updateInputSelection();
      this.get('on-change')(e);
    }
  },

  paste(e) {
    e.preventDefault();
    this._updateMaskSelection();
    // getData value needed for IE also works in FF & Chrome
    let mask = this.get('_inputMask');
    if (mask.paste(e.originalEvent.clipboardData.getData('Text'))) {
      e.target.value = mask.getValue();
      // Timeout needed for IE
      next(this, this._updateInputSelection);
      this.get('on-change')(e);
    }
  }
});
