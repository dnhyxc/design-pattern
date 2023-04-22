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
class Sub {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers = this.observers.filter((i) => i !== observer);
  }
}
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

### 模块模式

### 桥接模式

### 组合模式

### 命令模式

### 模板方法模式

### 迭代器模式

### 职责链模式
