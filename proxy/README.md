#### 实现 reactive

source/reactive.js 文件主要用于实现数据的劫持：

```js
import Dep from "./dep";

const dep = new Dep();

export const reactive = (data) => {
  return new Proxy(data, {
    get(target, key) {
      const value = Reflect.get(target, key);
      // 收集依赖
      dep.collect(target, key);
      return value !== null && typeof value === "object"
        ? reactive(value)
        : value;
    },
    set(target, key, value) {
      const oldValue = target[key];
      const res = Reflect.set(target, key, value);
      dep.notify(target, key, value, oldValue);
      return res;
    },
  });
};
```

source/dep.js 文件主要用于实现依赖的收集：

```js
export default class Dep {
  static effectCallback = null;

  constructor() {
    this.effectMap = new WeakMap();
  }

  // 收集依赖
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

  // 触发收集的依赖
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
```

source/computedRef.js 主要用于创建计算属性的实例：

```js
export default class ComputedRef {
  constructor(value) {
    this.value = value;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }
}
```

source/effect.js 文件主要用于实现 watchEffect、watch、computed：

```js
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
```

source/index.js 用于统一导出 reactive, watchEffect, watch, computed：

```js
import { reactive } from "./reactive";
import { watchEffect, watch, computed } from "./effect";

export { reactive, watchEffect, watch, computed };
```

index.html 页面渲染模板：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>数据劫持与依赖收集</title>
  </head>
  <body>
    <button id="aBtn">100</button>
    <button id="bBtn">200</button>
    <script type="module" src="./index.js"></script>
  </body>
</html>
```

在 index.js 中使用实现的 reactive, watchEffect, watch, computed 这些方法：

```js
import { reactive, watchEffect, watch, computed } from "./source";

const btnA = document.querySelector("#aBtn");
const btnB = document.querySelector("#bBtn");

const state = reactive({
  a: 1,
  b: { c: 2 },
});

const res = computed(() => state.a + state.b.c);

btnA.addEventListener(
  "click",
  () => {
    state.a = 100;
    console.log(res.value, "res");
  },
  false
);

btnB.addEventListener(
  "click",
  () => {
    state.b.c = 200;
    console.log(res.value, "res");
  },
  false
);

watchEffect(() => {
  console.log("watchEffect => state.a", state.a);
});

watchEffect(() => {
  console.log("watchEffect => state.b.c", state.b.c);
});

watch(
  () => state.a,
  (cur, prev) => {
    console.log(cur, prev);
    console.log("watch => state.a", state.a);
  }
);

watch(
  () => state.b.c,
  (cur, prev) => {
    console.log(cur, prev);
    console.log("watch => state.b.c", state.b.c);
  }
);
```

[源码戳这里查看](https://github.com/dnhyxc/sample-code/tree/master/proxy)
