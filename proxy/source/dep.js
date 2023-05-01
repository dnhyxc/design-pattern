export default class Dep {
  static effectCallback = null;

  constructor() {
    this.effectMap = new WeakMap();
  }

  collect(target, key) {
    const { effectCallback } = Dep;

    if (effectCallback) {
      let depMap = this.effectMap.get(target);

      if (!depMap) {
        depMap = new Map();
        this.effectMap.set(target, depMap);
      }

      let deps = depMap.get(key);

      if (!deps) {
        deps = new Set();
        depMap.set(key, deps);
      }

      // 将每一个callback加入对应的Set中
      deps.add(effectCallback);
    }
  }

  notify(target, key, value, oldValue) {
    const depMap = this.effectMap.get(target);

    if (!depMap) return;

    const deps = depMap.get(key);

    deps.forEach((dep) => {
      const newValue = dep(value, oldValue);

      // 判断dep(callback)上有没有挂computedRef属性，如果有，说明是计算属性，需要把得出的新值赋给它
      if (dep.computedRef) {
        dep.computedRef.value = newValue;
      }
    });
  }
}
