### 责任链模式

使多个对象都有机会处理请求，从而避免了请求的发送者与多个接收者直接的耦合关系，将这些接收者连接成一条链，顺着这条链传递该请求，直接找到能处理该请求的对象。

#### 运用场景

当必须按顺序执行多个处理者时，可以使用该模式。

- 无论你以何种顺序将处理者连接成一条链，所有请求都会严格按照顺序通过链上的处理者。

如果所需处理者及其顺序需要在运行时进行改变，也可以使用职责链模式。

- 调用者可以根据运行时环境，动态地插入和移除处理者，或者改变其顺序。

#### 具体需求

当表单需要进行一系列的校验时：

1. 校验输入框是否为空。

2. 校验是否是数字。

3. 校验是否大于 6 位等等。

4. 遇到这种链式的调用方式时，就可以考虑责任链模式了。

#### 实现方式

```js
const chainInp = document.querySelector("#chainInp");
const chainBtn = document.querySelector("#chainBtn");

chainBtn.addEventListener(
  "click",
  () => {
    checks.check();
  },
  false
);

function checkEmpty() {
  if (chainInp.value.length === 0) {
    console.log("内容不能为空");
    return;
  }
  return "next";
}

function checkNumber() {
  if (Number.isNaN(+chainInp.value)) {
    console.log("请输入数字");
    return;
  }
  return "next";
}

function checkLength() {
  if (chainInp.value.length < 6) {
    console.log("不能小于 6 位");
    return;
  }
  return "next";
}

class Chain {
  constructor(fn) {
    this.checkRule = fn;
    this.nextRule = null;
  }

  addRule(nextRule) {
    this.nextRule = new Chain(nextRule);
    return this.nextRule;
  }

  check() {
    this.checkRule() === "next" ? this.nextRule.check() : null;
  }

  end() {
    this.nextRule = {
      check: () => "end",
    };
  }
}

const checks = new Chain(checkEmpty);

checks.addRule(checkNumber).addRule(checkLength).end();
```

#### 责任链模式的优缺点

优点：

1. 符合单一职责，使每个方法种都只有一个职责。

2. 符合开放封闭原则，在需求增加时可以方便的扩充新的责任。

3. 使用时候不需要知道谁才是真正处理方法，减少大量的 `if` 或 `switch` 语法。

缺点：

1. 团队成员需要对责任链存在共识，否则当看到一个方法莫名其面的返回 next 时回到感到很奇怪。

2. 出错时不好排查问题，因为不知道到底在哪个职责种出了问题，需要从链头开始往后找。
