import { Dependent } from "./dependent";

const dep = new Dependent();

export function reactive(data) {
  return new Proxy(data, {
    get(target, key) {
      dep.collect(target, key);
      const value = Reflect.get(target, key);
      return value !== null && typeof value === "object"
        ? reactive(value)
        : value;
    },

    set(target, key, value) {
      const oldValue = Reflect.get(target, key);
      const res = Reflect.set(target, key, value);
      dep.notify(target, key, value, oldValue);
      return res;
    },
  });
}
