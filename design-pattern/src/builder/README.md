### 建造者模式

建造者模式属于创建型模式的一种，提供一种创建复杂对象的方式。它将一个复杂的对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

建造者模式是一步一步的创建一个复杂的对象，它允许用户指通过指定复杂的对象的类型和内容就可以构建它们，用户不需要指定内部的具体构造细节。

建造者模式将一个复杂对象的构建层相互分离，同样的构建过程可采用不同的表示。工厂模式主要是为了创建对象实例或者类族（抽象工厂），它关心的是最终产出（创建）的是什么，而不关心创建的过程，而建造者模式关心的是创建这个对象的整个过程，甚至创建对象的每个细节。

#### 适用场景

1. 需要生成的对象具有复杂的内部结构时。

2. 相同的方法，不同的执行顺序，产生不同的结果。

3. 多个部件或零件，都可以装配到一个对象中，但是产生的结果又不相同。

#### 实现方式

```js
class Navbar {
  constructor() {
    this.data = [];
  }

  init() {
    console.log("Navbar init");
  }

  getData() {
    console.log("Navbar getDate");
    return new Promise((resolve) => {
      setTimeout(() => {
        this.data = ["首页", "分类", "标签"];
        resolve(["首页", "分类", "标签"]);
      }, 2000);
    });
  }

  render() {
    console.log("Navbar data", this.data);
  }
}

class List {
  constructor() {
    this.data = [];
  }

  init() {
    console.log("List init");
  }

  getData() {
    console.log("List getDate");
    // this.data = ["test1", "test2", "test3"];
    // return ["test1", "test2", "test3"]
    return new Promise((resolve) => {
      setTimeout(() => {
        this.data = ["test1", "test2", "test3"];
        resolve(["test1", "test2", "test3"]);
      }, 2500);
    });
  }

  render() {
    console.log("List data", this.data);
  }
}

class Builder {
  async build(builder) {
    await builder.init();
    const res = await builder.getData();
    console.log(res, "res");
    await builder.render();
  }
}

const builder = new Builder();

const navbar = new Navbar();
const list = new List();

builder.build(navbar);
builder.build(list);
```

#### 建造者模式的优缺点

优点：

1. 具有封装性，使客户端不必知道产品内部组成的细节。

2. 建造者独立，易扩展。

3. 便于控制细节风险。可以对建造过程逐步细化，而不对其他模块产生任何影响。

缺点：

1. 产品必须有共同点，范围有限制。

2. 如果内部变化复杂，会有很多建造类。
