### 策略模式

策略模式定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的变化不会影响使用算法的客户。策略模式属于行为模式，它通过对算法进行封装，把使用算法的责任和算法的实现分割开来，并委派给不同的对象对这些算法进行管理。

策略模式主要解决在有多种算法相似的情况下，使用 `if...else` 所带来的复杂和难以维护的问题。

#### 适用场景

1. 多种校验规则封装。

2. js 不同动画效果封装。

#### 实现方式

```js
const strategy = {
  A: (salary) => {
    return salary * 3;
  },
  B: (salary) => {
    return salary * 2;
  },
  C: (salary) => {
    return salary * 1;
  },
};

function calBonus(level, salary) {
  return strategy[level](salary);
}

const level1 = calBonus("A", 30000);
const level2 = calBonus("B", 20000);
const level3 = calBonus("C", 10000);
console.log(level1);
console.log(level2);
console.log(level3);
```

#### 策列模式的优缺点

优点：

1. 多重条件语句 `if...else` 不易维护，策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。

2. 在策略模式中利用组合和委托来让环境类拥有执行算法的能力，这也是继承的一种更轻便的替代方案。

3. 策略模式可以提供相同行为的不同实现，更容易满足需求的多变。

4. 策略模式提供了对开放、封闭原则的完美支持，将算法封装在独立的策略类中，使得它们易于切换，易于理解，易于扩展。

5. 策略模式把算法的使用放到环境类中，而算法的实现移到具体策略类中，实现了二者的分离。

缺点：

1. 使用策略模式会在程序中增加许多策略类或者策略对象，但实际上这比把它们负责的逻辑堆砌在环境类中要好。

2. 使用者需要理解所有策略算法的区别，以便使用合适的策略算法。（比如，我们要选择一种合适的旅游出行路线，必须先了解选择飞机、火车、自行车等方案的细节。此时策略类要向使用者暴露它的所有实现，这是违反最少知识原则的）。

#### 具体使用场景

根据不同的类型展示对应的状态：

- html 内容：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>策略模式</title>
  </head>
  <body>
    <div id="strategyWrap"></div>
  </body>
</html>
```

- js 内容：

```js
const data = [
  {
    title: "test1",
    type: 1,
  },
  {
    title: "test2",
    type: 2,
  },
  {
    title: "test3",
    type: 1,
  },
  {
    title: "test4",
    type: 3,
  },
  {
    title: "test5",
    type: 2,
  },
];

const TYPE_CONFIG = {
  1: {
    text: "驳回",
    class: "redType",
  },
  2: {
    text: "未通过",
    class: "orangeType",
  },
  3: {
    text: "通过",
    class: "greenType",
  },
};

function renderElement(data) {
  strategyWrap.innerHTML = `${data
    .map((i) => {
      return `
        <div class='item'>
          <span class="title">${i.title}</span>
          <span class='${TYPE_CONFIG[i.type].class}'>${
        TYPE_CONFIG[i.type].text
      }</span>
        </div>
      `;
    })
    .join("")}`;
}

renderElement(data);
```
