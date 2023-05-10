### 装饰器模式

装饰器模式能够很好的对已有功能进行拓展，这样不会更改原有的代码，对其他的业务产生影响，这方便我们在较少的改动下对软件功能进行拓展。

#### 适用场景

1. 当需要动态地给对象添加新的行为，同时又需要保持原始对象的不变性时。

2. 当需要在运行时动态地添加或移除对象的功能时。

3. 当需要通过组合不同的装饰器来实现不同的效果时。

#### 实现方式

使用 Class 实现：

```js
class Component {
  operation() {
    console.log("基类 operation");
  }
}

// 定义一个装饰器类，它包含一个原始对象，并实现了与原始对象相同的接口
class Decorator {
  constructor(component) {
    this.component = component;
  }

  operation() {
    this.component.operation();
    console.log("装饰器类 operation");
  }
}

// 定义一个具体的装饰器类，它在原始对象的基础上添加了新的行为
class ConcreteDecoratorA extends Decorator {
  operation() {
    console.log("ConcreteDecoratorA operation");
    super.operation();
  }
}

// 定义另一个具体的装饰器类，它在原始对象的基础上添加了另一个新的行为
class ConcreteDecoratorB extends Decorator {
  operation() {
    super.operation();
    console.log("ConcreteDecoratorB operation");
  }
}

// 使用装饰器模式来扩展组件对象的功能
let component = new Component();
let decoratorA = new ConcreteDecoratorA(component);
let decoratorB = new ConcreteDecoratorB(decoratorA);
component.operation();
console.log("----------------decoratorA----------------");
decoratorA.operation();
console.log("----------------decoratorB----------------");
decoratorB.operation();
```

使用构造函数原型实现：

```js
Function.prototype.before = function (beforeFn) {
  const _this = this;
  return function () {
    // 先进行前置函数调用
    beforeFn.apply(this, arguments);
    // 执行原来的函数
    return _this.apply(this, arguments);
  };
};

Function.prototype.after = function (afterFn) {
  const _this = this;
  return function () {
    // 先执行原来的函数
    const res = _this.apply(this, arguments);
    // 后进行前置函数调用
    afterFn.apply(this, arguments);
    return res;
  };
};

function test() {
  console.log("test 调用");
  return "test";
}

const decoratorFn = test
  .before(function () {
    console.log("前置装饰方法调用");
  })
  .after(function () {
    console.log("后置装饰方法调用");
  });

decoratorFn();
```

#### 装饰器模式的优缺点

优点：

1. 装饰类和被装饰类可以独立发展，不会相互耦合。

2. 装饰模式是继承的一个替代模式。

3. 装饰模式可以动态扩展一个实现类的功能，而不必担心影响实现类。

缺点：

1. 如果管理不当会极大增加系统复杂度，降低代码的可读性和可维护性。

2. 如果装饰器的使用不当，可能会导致对象状态的混乱和不一致。
