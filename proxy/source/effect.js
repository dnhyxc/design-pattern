import ComputedRef from "./computedRef";
import Dep from "./dep";

export const watchEffect = (callback) => {
  Dep.effectCallback = callback;
  callback();
  Dep.effectCallback = null;
};

export const watch = (fn, callback) => {
  Dep.effectCallback = callback;
  fn();
  Dep.effectCallback = null;
};

export const computed = (callback) => {
  Dep.effectCallback = callback;

  const value = callback();

  const computedRef = new ComputedRef(value);

  Object.defineProperty(callback, "computedRef", {
    value: computedRef,
  });

  Dep.effectCallback = null;

  return computedRef;
};
