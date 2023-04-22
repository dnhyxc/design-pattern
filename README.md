### 构造器模式

### 工厂模式

### 抽象工厂模式

### 建造者模式

建造者模式（builder pattern）属于创建型模式的一种，提供一种创建复杂对象的方式。它将一个复杂的对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

建造者模式是一步一步创建一个复杂的对象，它允许用户只通过指定复杂的对象的类型和内容就可以构建它们，用户不需要指定内部的具体构造细节。

### 单例模式

### 装饰器模式

### 适配器模式

### 策略模式

### 代理模式

### 观察者模式

当一个对象的状态发生改变时，所有依赖于它的对象都会得到通知并自动更新，解决了主体对象与观察者之间功能的耦合，即一个对象状态改变给其它对象通知的问题。

> 观察者模式包含观察目标和观察者两类对象：一个目标可以有任意数目的与之相依赖的观察者。一旦观察目标的状态发生改变，所有的观察者都将得到通知。

```js
// 观察者
class Observer {
  constructor(name, fn = () => {}) {
    this.name = name;
    this.fn = fn;
  }
}

// 被观察者
class Subject {
  constructor(state) {
    this.state = {
      name: state.name || "",
      action: state.action || "",
    };
    this.observers = [];
  }

  // 设置状态
  setState(val) {
    this.state = { ...this.state, ...val };
    this.observers.forEach((i) => {
      i.fn(val);
    });
  }

  // 获取状态
  getState() {
    return this.state;
  }

  // 添加观察者
  addObserver(obs) {
    if (!this.observers.includes(obs)) {
      this.observers.push(obs);
    }
  }

  // 删除观察者
  delObserver(obs) {
    if (this.observers.includes(obs)) {
      this.observers = this.observers.filter((i) => i !== obs);
    }
  }

  // 清除所有观察者
  delAll() {
    this.observers = [];
  }
}

const snsn = new Observer("snsn", (data) => {
  console.log(`嘻嘻！snsn发现${data.name || "你"}${data.action || ""}了`);
});

const hmhm = new Observer("hmhm", (data) => {
  console.log(`哈哈！hmhm发现${data.name || "你"}${data.action || ""}了`);
});

const sub1 = new Subject({ name: "dnhyxc", action: "code" });
const sub2 = new Subject({ action: "code" });
sub1.addObserver(snsn);
sub1.addObserver(hmhm);
sub1.setState({ action: "看电影" });
sub1.setState({ name: "听音乐的dnhyxc" });

sub2.addObserver(snsn);
sub2.addObserver(hmhm);
sub2.setState({ action: "听音乐" });
console.log(sub1);
console.log(sub2);
sub2.delObserver(hmhm);
sub2.setState({ action: "听音乐" });
console.log(sub2);

sub1.delAll();
sub1.setState({ action: "发现不了了吧" });
const res = sub1.getState();
console.log(res);
console.log(sub1);
```

#### 观察者的优缺点

优点：目标者与观察者，功能耦合度降低，专注自身功能逻辑，观察者被动接受更新，时间上解耦，实时接受目标者的更新状态。

缺点：观察者模式虽然实现了对象间依赖关系的低耦合，但却不能对事件通知进行细分管控，如 “筛选通知”、“指定主题事件通知” 等。

### 发布订阅模式

发布订阅模式的特点：观察者和目标要相互知道，发布者和订阅者不用相互知道，通过第三方实现调度，属于经过解耦的观察者模式。

具体实现方式如下：

```js
class SubPub {
  constructor() {
    this.observers = {};
    // 使用单例模式控制每次创建的实例始终是相同的
    if (!SubPub.instance) {
      SubPub.instance = this;
    } else {
      return SubPub.instance;
    }
  }

  // 监听
  on(type, fn) {
    if (!this.observers[type]) {
      this.observers[type] = [fn];
    } else {
      this.observers[type].push(fn);
    }
  }

  // 发布
  emit(type, data) {
    if (!this.observers[type]) return;
    this.observers[type].forEach((i) => i(data));
  }

  // 清除订阅
  remove(type, fn) {
    if (!this.observers[type]) return;
    if (fn) {
      // 清除监听的type类型中的fn事件
      this.observers[type] = this.observers[type].filter((i) => i !== fn);
    } else {
      // 如果没有传入fn，则清空监听的type类型中所有的事件
      this.observers[type] = [];
    }
  }

  // 清除所有订阅
  clear() {
    this.observers = {};
  }
}
```

使用示例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>发布订阅模式</title>
  </head>
  <body>
    <button id="emit1">发布msg1</button>&nbsp;
    <button id="emit2">发布msg2</button>&nbsp;
    <button id="remove1">清除msg1订阅</button>&nbsp;
    <button id="remove2">清除msg2订阅</button>&nbsp;
    <button id="clear">清除所有订阅</button>&nbsp;
    <button id="sub">重新增加监听</button>

    <script>
      class SubPub {
        constructor() {
          this.observers = {};
          // 使用单例模式控制每次创建的实例始终是相同的
          if (!SubPub.instance) {
            SubPub.instance = this;
          } else {
            return SubPub.instance;
          }
        }

        // 监听
        on(type, fn) {
          if (!this.observers[type]) {
            this.observers[type] = [fn];
          } else {
            this.observers[type].push(fn);
          }
        }

        // 发布
        emit(type, data) {
          if (!this.observers[type]) return;
          this.observers[type].forEach((i) => i(data));
        }

        // 清除订阅
        remove(type, fn) {
          if (!this.observers[type]) return;
          if (fn) {
            // 清除监听的type类型中的fn事件
            this.observers[type] = this.observers[type].filter((i) => i !== fn);
          } else {
            // 如果没有传入fn，则清空监听的type类型中所有的事件
            this.observers[type] = [];
          }
        }

        // 清除所有订阅
        clear() {
          this.observers = {};
        }
      }

      const subPub = new SubPub();
      const subPub1 = new SubPub();

      console.log(subPub, subPub1);
      console.log(subPub === subPub1);

      const sub1 = (data) => {
        console.log("sub1", data);
      };

      const sub2 = (data) => {
        console.log("sub2", data);
      };

      const sub3 = (data) => {
        console.log("sub2", data);
      };

      // 订阅
      subPub.on("msg1", sub1);
      subPub.on("msg1", sub2);
      subPub.on("msg2", sub3);
      subPub1.on("msg2", sub1);

      // 发布msg1
      emit1.onclick = () => {
        subPub.emit("msg1", "我是监听的msg1");
      };

      // 发布msg2
      emit2.onclick = () => {
        subPub.emit("msg2", "我是监听的msg2");
      };

      // 清除msg1中订阅的sub2
      remove1.onclick = () => {
        console.log("清除了 msg1 中的 sub2");
        subPub.remove("msg1", sub2);
        console.log(subPub);
      };

      // 清除msg2中订阅的sub3
      remove2.onclick = () => {
        console.log("清除了 msg2 中的 sub3");
        subPub.remove("msg2", sub3);
        console.log(subPub);
      };

      // 清除msg1中订阅的sub2
      clear.onclick = () => {
        console.log("清除了所有的监听");
        subPub.clear();
      };

      // 重新增加监听
      sub.onclick = () => {
        // 先全部清除，再从新监听，防止重复
        subPub.clear();
        subPub.on("msg1", sub1);
        subPub.on("msg1", sub2);
        subPub.on("msg2", sub3);
        subPub1.on("msg2", sub1);
        console.log("重新增加所有监听了");
      };
    </script>
  </body>
</html>
```

### 模块化模式

模块化模式最初被定义为在传统软件工程中为类提供私有和公共封装的一种方法，能够使一个单独的对象拥有公共及私有的方法和变量，从而屏蔽来自全局作用域的特殊部分。这可以减少我们的函数名与在页面中其它脚本区域内定义的函数名冲突的可能性。

使用闭包实现：

```js
const obj = (function () {
  let count = 0;

  return {
    increment() {
      return ++count;
    },

    decrement() {
      return --count;
    },
  };
})();

console.log(obj.increment());
```

使用 ES6 模块化的方式实现：

- 在一个 js 文件（任意名称的 js 文件，如：module.js）中编写如下代码：

```js
let count = 0;

function increment() {
  return ++count;
}

function decrement() {
  return --count;
}

export { increment, decrement };
```

具体使用方式：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>模块化模式</title>
  </head>
  <body>
    <!-- 使用闭包实现 -->
    <script>
      const obj = (function () {
        let count = 0;

        return {
          increment() {
            return ++count;
          },

          decrement() {
            return --count;
          },
        };
      })();

      console.log(obj.increment());
      console.log(obj.increment());
    </script>

    <!-- 使用ES6模块化实现实现 -->
    <script type="module">
      import { increment, decrement } from "./js/modal.js";
      console.log(increment(), "module");
      console.log(decrement(), "module");
    </script>
  </body>
</html>
```

> module 模式使用了闭包封装 “私有” 状态和组织。它提供了一种包装混合公有及私有方法和变量的方式，防止泄露到全局作用域，并与别的开发人员的接口发生冲突。通过该模式，只需要返回一个公有的 API，而其它的一切则维持在私有闭包里。

### 桥接模式

该模式将抽象部分与它的实现部分分离，使它们都可以独立变化。

使用场景：一个类存在两个或多个独立变化的维度，且这两个维度都需要进行扩展。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>桥接模式</title>
  </head>
  <body>
    <div id="message">
      <div id="content"></div>
    </div>

    <div id="message_2">
      <div id="content"></div>
    </div>
    <script>
      const Animations = {
        bounce: {
          show(ele) {
            console.log(ele, "弹跳显示");
          },

          hide(ele) {
            console.log(ele, "弹跳隐藏");
          },
        },

        slide: {
          show(ele) {
            console.log(ele, "滑动显示");
          },

          hide(ele) {
            console.log(ele, "滑动隐藏");
          },
        },

        rotate: {
          show(ele) {
            console.log(ele, "旋转显示");
          },

          hide(ele) {
            console.log(ele, "旋转隐藏");
          },
        },
      };

      function Toast(ele, animation) {
        this.ele = ele;
        this.animation = animation;
        // 扩展 Message 其它属性
      }

      Toast.prototype.show = function () {
        this.animation.show(this.ele);
      };

      Toast.prototype.hide = function () {
        this.animation.hide(this.ele);
      };

      class Message {
        constructor(ele, animation) {
          this.ele = ele;
          this.animation = animation;
        }

        show() {
          this.animation.show(this.ele);
        }

        hide() {
          this.animation.hide(this.ele);
        }

        setContent(value) {
          const content = this.ele.querySelector("#content");
          content.innerHTML = value;
        }
      }
      const toast1 = new Toast("toast1", Animations.bounce);
      const toast2 = new Toast("toast1", Animations.slide);
      const message1 = new Message(message, Animations.rotate);
      const message2 = new Message(message_2, Animations.bounce);

      toast1.show();
      toast2.show();
      message1.show();
      message2.show();

      setTimeout(() => {
        message1.setContent("我是message1消息内容");
        message2.setContent("我是message2消息内容");
      }, 1500);

      setTimeout(() => {
        toast1.hide();
        toast2.hide();
        message1.hide();
        message2.hide();
      }, 2000);
    </script>
  </body>
</html>
```

#### 桥接模式的优缺点

优点：把抽象与实现隔离开，有助于独立地管理各组成部分。

缺点：每使一个桥接元素都要增加一次函数调用，这对应用程序地性能会有一些负面影响（提高了系统地复杂度）。

### 组合模式

### 命令模式

### 模板方法模式

### 迭代器模式

### 职责链模式
