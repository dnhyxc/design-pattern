// 装饰器模式
// 定义一个基本的组件类
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
