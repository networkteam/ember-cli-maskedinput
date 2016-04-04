# Ember masked-input

This addon provides a `{{masked-input}}` helper that extends `{{input}}` (`Ember.TextField`) and applies input masking based on [inputmask-core](https://github.com/insin/inputmask-core).

There are **no dependencies on jQuery plugins** so this addon is a more lightweight and faster alternative to other input masking addons. It's based on the solid [inputmask-core](https://github.com/insin/inputmask-core) library and adapted from its React implementation [MaskedInput](https://github.com/insin/react-maskedinput).

## Installation

```
ember install ember-cli-maskedinput
```

## Usage

**Date pattern with bound value**

```
{{masked-input mask='11/11/1111' value=myBoundValue}}
```

**Credit card pattern with closure action**

```
{{masked-input mask='1111 1111 1111 1111' on-change=(action (mut value1) value='target.value')}}
```

**Time pattern with validation**

Uses plain HTML5 validation.

```
{{masked-input mask='11:11:11' required=true pattern='[0-9]{2}:[0-9]{2}:[0-9]{2}' title='Time value with format HH:MM:SS'}}
```

## Reference

### `mask`

A pattern consisting of `1` (number), `a` (letter), `A` (letter forced upper case), `*` (alphanumeric), `#` (alphanumeric forced upper case) or any other character for static parts of the mask. Use backslashes to escape format characters.

See [inputmask-core docs](https://github.com/insin/inputmask-core#pattern) for more information.

### `formatCharacters`

An object defining additional format characters, see [inputmask-core docs](https://github.com/insin/inputmask-core#formatcharacters) for more information.

### `placeholderChar`

The character which is used to fill in editable positions that have no input. Defaults to `_`; must be a single character.

### `on-change`

An optional action closure to handle the `change` event (which should not be overridden).


## License

[MIT Licensed](LICENSE.md)
