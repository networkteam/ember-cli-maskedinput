import Component from "@glimmer/component";
import { action } from "@ember/object";
import { computed } from '@ember/object';
import { next } from '@ember/runloop';
import { ref } from 'ember-ref-bucket';
import InputMask from 'inputmask-core';

import { getSelection, setSelection } from '../util/selection';

const KEYCODE_Z = 90;
const KEYCODE_Y = 89;
const KEYCODE_BACKSPACE = 8;

function isUndo(e) {
  return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Y : KEYCODE_Z);
}

function isRedo(e) {
  return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Z : KEYCODE_Y);
}

const NOOP = function(){};

export default class MaskedInputComponent extends Component {
  // Reference to the input element
 // inputEl = null;
 @ref("inputEl") inputEl;

  // Dunno why tracking a getter doesn't work here - needs explicit arg dependencies to update correctly.
  // Do not add value as dependency, since the input mask value will be set by the according actions.
  @computed('args.{mask,formatCharacters,placeholderChar}')
  get inputMask() {
    const options = {
      pattern: this.args.mask || null,
      value: this.args.value,
      formatCharacters: this.args.formatCharacters || null
    }
    const placeholderChar = this.args.placeholderChar || '_';
    if (placeholderChar) {
      options.placeholderChar = placeholderChar;
    }
    return new InputMask(options);
  }

  get displayValue() {
    const value = this.inputMask.getValue();
    return value === this.inputMask.emptyValue ? '' : value;
  }

  get pattern() {
    return this.args.mask || '';
  }

  get size() {
    return this.pattern.length;
  }

  get maxlength() {
    return this.pattern.length;
  }

  get placeholder() {
    return this.inputMask.emptyValue;
  }

  get readonly() {
    return this.inputEl.readOnly;
  }

  get onChange() {
    return this.args['on-change'] || NOOP;
  }

  @action
  onInputChange(e) {
    const maskValue = this.inputMask.getValue();
    if (e.target.value !== maskValue) {
      // Cut or delete operations will have shortened the value
      if (e.target.value.length < maskValue.length) {
        const sizeDiff = maskValue.length - e.target.value.length;
        this.updateMaskSelection();
        this.inputMask.selection.end = this.inputMask.selection.start + sizeDiff;
        this.inputMask.backspace();
      }
      const value = this.displayValue;
      e.target.value = value;
      if (value) {
        this.updateInputSelection();
      }
    }
    this.onChange(e);
  }

  @action
  onInputKeyDown(e) {
    // On Firefox, ignore any key if input is readonly
    if (this.readonly) {
      return;
    }
    if (isUndo(e)) {
      e.preventDefault();
      if (this.inputMask.undo()) {
        e.target.value = this.displayValue;
        this.updateInputSelection();
        this.onChange(e);
      }
      return;
    } else if (isRedo(e)) {
      e.preventDefault();
      if (this.inputMask.redo()) {
        e.target.value = this.displayValue;
        this.updateInputSelection();
        this.onChange(e);
      }
      return;
    }

    if (e.keyCode === KEYCODE_BACKSPACE) {
      e.preventDefault();
      this.updateMaskSelection();
      if (this.inputMask.backspace()) {
        const value = this.displayValue;
        e.target.value = value;
        if (value) {
          this.updateInputSelection();
        }
        this.onChange(e);
      }
    }
  }

  @action
  onInputKeyPress(e) {
    // Ignore modified key presses
    // Ignore enter key to allow form submission
    // Ignore tab key to allow focussing other elements
    // On Firefox, ignore any key if input is readonly
    if (e.metaKey || e.altKey || e.ctrlKey || e.keyCode === 13 || e.keyCode === 9 || this.readonly) {
      return;
    }

    e.preventDefault();
    this.updateMaskSelection();
    const key = e.key || String.fromCharCode(e.charCode);
    if (this.inputMask.input(key)) {
      e.target.value = this.inputMask.getValue();
      this.updateInputSelection();
      this.onChange(e);
    }
  }

  @action
  onInputPaste(e) {
    // On Firefox, ignore paste if input is readonly
    if (this.readonly) {
      return;
    }
    e.preventDefault();
    this.updateMaskSelection();
    // getData value needed for IE also works in FF & Chrome
    const clipboardData = e.clipboardData || window.clipboardData;
    const text = clipboardData.getData('Text');
    const acceptsPaste = this.inputMask.paste(text);
    if (acceptsPaste) {
      e.target.value = this.inputMask.getValue();
      // Timeout needed for IE
      next(this, this.updateInputSelection);
      this.onChange(e);
    }
  }

  updateMaskSelection() {
    this.inputMask.selection = getSelection(this.inputEl);
  }

  updateInputSelection() {
    setSelection(this.inputEl, this.inputMask.selection);
  }
}
