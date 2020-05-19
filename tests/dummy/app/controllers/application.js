import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class ApplicationController extends Controller {
  @tracked
  value0 = null;
  @tracked
  value1 = null;
  @tracked
  pattern = '11:11';

  @tracked
  value0Changes = [];

  @action
  updatePattern(e) {
    this.pattern = e.target.value;
  }

  @action
  value0Changed(e) {
    const value = e.target.value;
    this.value0 = value;
    this.value0Changes = [
      ...this.value0Changes,
      value
    ];
  }

  @action
  value1Changed(e) {
    const value = e.target.value;
    this.value1 = value;
  }
}
