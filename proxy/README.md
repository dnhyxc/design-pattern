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
      // 更改属性值时触发依赖（callback）
      dep.notify(target, key, value, oldValue);
      return res;
    },
  });
};
```

source/dep.js 文件主要用于实现依赖的收集，以 `{a: 1, b: { c: 2 }}` 为例，实现思路如下：

1. 将劫持的每一个对象作为 key 存储在 `WeakMap` 中，因为存储在 WeakMap 中的对象不需要进行枚举，同时 WeakMap 的 key 可以是一个对象，而且 WeakMap 持有的是每个键对象的“弱引用”，所以可以将其存放在 WeakMap 中，使其没有其他引用存在时垃圾回收能及时回收。

2. 在 WeakMap 中，每个对象所对应的是一个 `Map` 对象，而 Map 对象中，是对象中每个 key（如：a）值所对应的 `Set` 对象，Set 对象中存储的就是对象中每个属性的监听回调（如：watchEffe3ct(() => { ... }) 传入的回调函数），到此就建立了每个 key 与监听它的回调的对应关系。具体结构如下：

```js
WeakMap: {
  {a: 1, b: {c: 2}}: Map: {
    a: Set: {
      0: () => state.a + state.b.c, // computed
      1: () => { console.log("watchEffect => state.a", state.a); }, // watchEffect
      2: (cur, prev) => { console.log(cur, prev); console.log("watch => state.a", state.a); } // watch
    }
    b: Set: {
      0: () => state.a + state.b.c, // computed
      1: () => { console.log("watchEffect => state.b.c", state.b.c); }, // watchEffect
      2: (cur, prev) => { console.log(cur, prev); console.log("watch => state.b.c", state.b.c); } // watch
    }
  },
  {c: 2}: Map: {
    c: Set: {
      0: () => state.a + state.b.c, // computed
      1: () => { console.log("watchEffect => state.b.c", state.b.c); }, // watchEffect
      2: (cur, prev) => { console.log(cur, prev); console.log("watch => state.b.c", state.b.c); } // watch
    }
  }
}
```

具体实现如下：

```js
export default class Dep {
  // effectCallback 是搜集的对象中每个 key 的监听回调
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

      /**
       * deps 就是每个属性所收集的所有回调：
       * Set(1){
       *   0: () => state.a + state.b.c,
       *   1: () => { console.log("watchEffect => state.a", state.a); }
       *   2: (cur, prev) => { console.log(cur, prev); console.log("watch => state.a", state.a);
       * }
       */
      let deps = depMap.get(key);

      if (!deps) {
        deps = new Set();
        depMap.set(key, deps);
      }

      // 将每一个 callback 加入对应 key 的 Set 中
      deps.add(effectCallback);
    }
  }

  // 当更改对象中的某个属性值时，即给某个属性重新赋值时，触发该属性所收集的依赖
  notify(target, key, value, oldValue) {
    const depMap = this.effectMap.get(target);

    if (!depMap) return;

    const deps = depMap.get(key);

    deps.forEach((dep) => {
      const newValue = dep(value, oldValue);

      // 判断 dep(callback) 上有没有挂 computedRef 属性，如果有，说明是计算属性，需要把得出的新值赋给它
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
  // watchEffect 初始化时就会被触发一次，所以需要自动调用
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
  /**
   * 将 computedRef 实例对象挂载到 callback 上，
   * 使在更改属性值触发收集的回调函数（callbacl）时，
   * 能在 notify 中获取到 computedRef 实例，
   * 并将计算出来的新值赋值给 computedRef 实例。
   */
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
