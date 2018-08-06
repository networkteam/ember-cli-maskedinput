import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  value0: null,
  value1: null,
  pattern: '11:11',

  value0Changes: A(),

  actions: {
    value0Changed(e) {
      let changes = this.get('value0Changes');
      changes.pushObject(e.target.value);
      this.set('value0Changes', changes);
    }
  }
});
