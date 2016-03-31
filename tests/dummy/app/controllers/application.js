import Ember from 'ember';

export default Ember.Controller.extend({
  value0: null,
  pattern: '11:11',

  value0Changes: Ember.A(),

  actions: {
    value0Changed(e) {
      let changes = this.get('value0Changes');
      changes.pushObject(e.target.value);
      this.set('value0Changes', changes);
    }
  }
});
