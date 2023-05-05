#### 数据劫持及依赖收集笔试题

分析如下代码，实现示例中所需功能：

index.html 页面渲染模板：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>依赖收集</title>
  </head>
  <body>
    <div id="app">
      <h1>{{title}}</h1>
      <p>{{content}}</p>
      <h1>{{title}}</h1>
      <p>{{content}}</p>
      <button @click="setTitle">设置标题</button>
      <button @click="setContent">设置内容</button>
      <button @click="reset">重置</button>
    </div>

    <script type="module" src="./index.js"></script>
  </body>
</html>
```

index.js 是 js 入口文件：

```js
import { createApp } from "./source/collect";
import { ref } from "./source/hooks";

createApp("#app", {
  refs: {
    title: ref("this is title"),
    content: ref("this is content"),
  },
  methods: {
    setTitle() {
      this.title.value = "这是标题";
    },
    setContent() {
      this.content.value = "这是内容";
    },
    reset() {
      this.title.$reset();
      this.content.$reset();
    },
  },
});
```

> 本题主要考点：vue Options API、vue Reactive API / Composition API、如何实现响应式（一对多依赖收集）、绑定事件处理函数如何解决 this 指向问题等。

source/collect 用于实现 createApp：

```js
import { bindEvent } from "./event";
import { createRefs } from "./hooks";
import { render } from "./render";

export function createApp(el, { refs, methods }) {
  const $el = document.querySelector(el);
  const allNodes = $el.querySelectorAll("*");

  const refSet = createRefs(refs, allNodes);
  console.log(refSet, "refSet");
  render(refSet);
  bindEvent.apply(refSet, [allNodes, methods]);
}
```

source/ref.js 用于实现 Ref 类：

```js
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
    // 每当在更新数据的时候，触发视图的更新
    update(this);
  }

  $reset() {
    this.value = this._defalutValue;
  }
}
```

source/hooks.js 用于创建 refs 集合，同时进行依赖的收集，即针对每一个 ref 收集它所有对应的所有 dom 元素：

- 使用类实现 ref：

```js
import Ref from "./ref";

// 使用类实现
export function ref(defalutValue) {
  return new Ref(defalutValue);
}

const reg_var = /\{\{(.+?)\}\}/;

export function createRefs(refs, nodes) {
  nodes.forEach((el) => {
    if (reg_var.test(el.textContent)) {
      const refKey = el.textContent.match(reg_var)[1].trim();
      console.log(refKey, "refKey");
      refs[refKey].deps.add(el);
    }
  });

  return refs;
}
```

- 使用对象实现 ref：

```js
import { update } from "./render";

export function ref(defalutValue) {
  const refWrapper = {
    deps: new Set(),
    _value: defalutValue,
    _defalutValue: defalutValue,
    $reset() {
      this.value = this._defalutValue;
    },
  };

  Object.defineProperty(refWrapper, "value", {
    get() {
      return refWrapper._value;
    },
    set(newValue) {
      refWrapper._value = newValue;
      update(refWrapper);
    },
  });

  console.log(refWrapper, "refWrapper");

  return refWrapper;
}

const reg_var = /\{\{(.+?)\}\}/;

export function createRefs(refs, nodes) {
  nodes.forEach((el) => {
    if (reg_var.test(el.textContent)) {
      const refKey = el.textContent.match(reg_var)[1].trim();
      console.log(refKey, "refKey");
      refs[refKey].deps.add(el);
    }
  });

  return refs;
}
```

source/render.js 用于视图的渲染：

```js
export function render(refs) {
  for (const key in refs) {
    const ref = refs[key];
    _render(ref);
  }
}

function _render({ deps, value }) {
  deps.forEach((dep) => {
    dep.textContent = value;
  });
}

export function update({ deps, value }) {
  _render({ deps, value });
}
```

event.js 用于事件的绑定，即将 createApp 第二个参数（methods）中的所有事件逐个进行绑定：

```js
export function bindEvent(nodes, methods) {
  nodes.forEach((el) => {
    const handlerName = el.getAttribute("@click");

    if (handlerName) {
      el.addEventListener("click", methods[handlerName].bind(this), false);
    }
  });
}
```

[戳这里查看源码](https://github.com/dnhyxc/sample-code/tree/master/interview)
