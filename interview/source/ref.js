import { update } from "./render";

export default class Ref {
  constructor(defaultValue) {
    this.deps = new Set();
    this._defalutValue = defaultValue;
    this._value = defaultValue;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
    update(this);
  }

  $reset() {
    this.value = this._defalutValue;
  }
}
