export class Dependent {
  constructor() {
    this.weakEffect = new WeakMap();
    Dependent.effectCallback = null;
  }

  collect(target, key) {
    const { effectCallback } = Dependent;

    if (effectCallback) {
      let mapEffect = this.weakEffect.get(target);

      if (!mapEffect) {
        mapEffect = new Map();
        this.weakEffect.set(target, mapEffect);
      }

      let setEffect = mapEffect.get(key);

      if (!setEffect) {
        setEffect = new Set();
        mapEffect.set(key, setEffect);
      }

      setEffect.add(effectCallback);
    }
  }

  notify(target, key, value, oldValue) {
    const mapEffect = this.weakEffect.get(target);

    if (!mapEffect) return;

    const setEffect = mapEffect.get(key);

    if (setEffect) {
      setEffect.forEach((cb) => {
        const computedRes = cb(value, oldValue);
        if (cb.computedRef) {
          cb.computedRef.value = computedRes;
        }
      });
    }
  }
}
