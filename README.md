[![Build Status](https://travis-ci.org/networkteam/ember-cli-maskedinput.svg?branch=master)](https://travis-ci.org/networkteam/ember-cli-maskedinput)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-maskedinput.svg)](https://emberobserver.com/addons/ember-cli-maskedinput)
[![npm version](https://badge.fury.io/js/ember-cli-maskedinput.svg)](https://badge.fury.io/js/ember-cli-maskedinput)

# Ember masked-input

This addon provides a `<MaskedInput>` Glimmer component that applies input masking based on [inputmask-core](https://github.com/insin/inputmask-core).

There are **no dependencies on jQuery plugins** so this addon is a more lightweight and faster alternative to other input masking addons. It's based on the solid [inputmask-core](https://github.com/insin/inputmask-core) library and adapted from its React implementation [MaskedInput](https://github.com/insin/react-maskedinput).


## Compatibility

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v14 or above


## Installation

``` sh
ember install ember-cli-maskedinput
```

## Usage

**Basic usage**

Pass the value to display and a `on-change` function as args to the `MaskedInput` component:

``` hbs
<MaskedInput @mask='A1111' @value={{this.myValue}} @on-change={{fn this.updateMyValue}} />
```

```js
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class MyComponent extends Component {
  @tracked myValue = 0;

  @action
  updateMyValue(e) {
    this.myValue = e.target.value;
  }
}
```

**Date pattern**

``` hbs
<MaskedInput @mask='11/11/1111' @value={{this.myValue}} @on-change={{fn this.updateMyValue}} />
```

**Credit card pattern**

``` hbs
<MaskedInput @mask='1111 1111 1111 1111' @value={{this.myValue}} @on-change={{fn this.updateMyValue}} />
```

**Time pattern with validation**

Uses plain HTML5 validation by setting HTML attributes:

``` hbs
<MaskedInput @mask='11:11:11' required pattern='[0-9]{2}:[0-9]{2}:[0-9]{2}' title='Time value with format HH:MM:SS' />
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

An optional function to handle `change` events.

## License

[MIT Licensed](LICENSE.md)
