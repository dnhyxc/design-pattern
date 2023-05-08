// 原型模式

// 使用构造函数实现
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

// 使用类实现

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

class Tabs {
  constructor(el, type) {
    this.el = el;
    this.type = type;
  }

  createElement() {
    return `
      <div class="container">
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

  render() {
    const element = this.createElement();
    const el = document.querySelector(this.el);
    el.innerHTML = element;
    this.init();
  }

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

const tab1 = new Tabs("#protoContent1", "click");
const tab2 = new Tabs("#protoContent2", "mouseover");

tab1.render();
tab2.render();
