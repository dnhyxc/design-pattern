### 模板方法模式

模板方法模式由两部分组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

#### 模板方法的使用场景

当完成一个操作具体固定的流程时，有某些重复的操作，其中操作步骤相同，但具体的实现不同，如：渲染某两个组件，或某两个页面，它们都需要先获取数据，然后再渲染视图，其中获取数据的步骤，每个组件（页面）都有自己获取数据的接口，而渲染的方法是一直的。这个时候，就可以通过模板方法模式实现。

总结：模板方法模式使用的主要场景有：

1. 一次性实现一个算法的不变部分，并将可变的行为留给子类来实现。

2. 各子类中公共的行为被提取出来并集中到一个公共的父类中，从而避免代码重复。

#### 实现方式

```js
class Container {
  constructor(params = {}) {
    this.params = params;
    this.list = [];
  }

  async init() {
    const list = await this.getData();
    this.list = [...this.list, ...list];
    list?.length && this.render(list);
  }

  getData() {
    throw new Error("必须传入getData方法");
  }

  render(list) {
    console.log(list, "render");
  }
}

class Message extends Container {
  constructor() {
    super();
  }

  // 重写父类 getData 方法
  getData() {
    console.log("message 开始获取数据");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([1, 2, 3, 4, 5]);
      }, 2000);
    });
  }
}

class Article extends Container {
  constructor() {
    super();
  }

  // 重写父类 getData 方法
  getData() {
    console.log("article 开始获取数据");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([6, 7, 8, 9, 10]);
      }, 2000);
    });
  }
}

const message = new Message();
const article = new Article();

message.init();
article.init();
```

> 模板方法模式是一种典型的通过封装变化提高系统扩展性的设计模式，运用了模板方法模式的程序中，子类方法种类和执行顺序都是不变的，但是子类的方法具体实现则是可变的，父类是个模板，子类可以添加，这就可以增加不同的功能。
