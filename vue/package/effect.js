import { Dependent } from "./dependent";
import { ComputedRef } from "./computedRef";

export function watchEffect(callback) {
  Dependent.effectCallback = callback;
  callback();
  Dependent.effectCallback = null;
}

export function watch(watchData, callback) {
  Dependent.effectCallback = callback;
  if (typeof watchData === "function") {
    watchData();
  }
  Dependent.effectCallback = null;
}

export function computed(callback) {
  Dependent.effectCallback = callback;
  const res = callback();
  const computedRef = new ComputedRef(res);

  Object.defineProperty(callback, "computedRef", {
    value: computedRef,
  });

  Dependent.effectCallback = null;
  return computedRef;
}
