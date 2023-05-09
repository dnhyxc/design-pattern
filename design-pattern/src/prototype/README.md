### 原型模式

函数中不对属性进行定义，利用 prototype 属性对属性进行定义，可以让所有对象实例共享它所包含的属性及方法。

#### 适用场景

1. 对象之间相同或相似，只是个别的几个属性不同的时候。

2. 创建对象成本较大，比如初始化时间长，占用 CPU 资源多，占用网络资源多等，需要优化资源。

3. 创建一个对象需要繁琐的数据准备或访问权限等，需要提高性能或者提高安全性。

4. 系统中大量使用该类对象，需要各个调用者给它的属性重新赋值。

5. 当一个对象需要提供给其他对象访问，并且各个调用者都需要修改其值时。

#### 实现方式

使用构造函数的方式实现：

```js
function CreateObject(name, age) {
  this.name = name;
  this.age = age;
}

CreateObject.prototype.say = function () {
  console.log(this.name, this.age);
};

const obj1 = new CreateObject("hmhm", 28);
const obj2 = new CreateObject("snsn", 29);

console.log(obj1);
console.log(obj2);

obj1.say();
obj2.say();
```

使用 Class 实现：

```js
class Create {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  say() {
    console.log(this.name, this.age);
  }
}

const person1 = new Create("hmhm", 29);
const person2 = new Create("snsn", 30);

console.log(person1);
console.log(person2);

person1.say();
person2.say();
```

#### 具体使用场景

用于构建每个页面各自的 tab 选项卡：

- html 内容：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>原型链模式</title>
  </head>
  <body>
    <div id="prototype">
      <span>原型链模式</span>
      <div id="page1"></div>
      <div id="page2"></div>
      <div id="page3"></div>
    </div>
  </body>
</html>
```

- js 内容：

```js
class Tabs {
  constructor(el, type) {
    this.el = el;
    this.type = type;
  }

  // 创建元素
  createElement() {
    return `
      <div class="container">
        <span>${this.el}</span>
        <ul class="header">
          <li class="active">1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
        </ul>
        <ul class="box">
          <li class="active">111</li>
          <li>222</li>
          <li>333</li>
          <li>444</li>
          <li>555</li>
          <li>666</li>
        </ul>
      </div>
    `;
  }

  // 渲染元素
  render() {
    const element = this.createElement();
    const el = document.querySelector(this.el);
    el.innerHTML = element;
    this.init();
  }

  // 操作元素，改变元素样式
  init() {
    const element = document.querySelector(this.el);
    this.container = element.querySelector(".container");
    this.headerItems = this.container.querySelectorAll(".header li");
    this.boxItems = this.container.querySelectorAll(".box li");
    this.change();
  }

  change() {
    for (let i = 0; i < this.headerItems.length; i++) {
      this.headerItems[i].addEventListener(
        this.type,
        () => {
          for (let j = 0; j < this.headerItems.length; j++) {
            this.headerItems[j].classList.remove("active");
            this.boxItems[j].classList.remove("active");
          }
          this.headerItems[i].classList.add("active");
          this.boxItems[i].classList.add("active");
        },
        false
      );
    }
  }
}

const tab1 = new Tabs("#page1", "click");
const tab2 = new Tabs("#page2", "mouseover");
const tab3 = new Tabs("#page3", "dblclick");

tab1.render();
tab2.render();
tab3.render();
```
