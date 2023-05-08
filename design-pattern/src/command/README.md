### 命令模式

有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么，需要一种松耦合的方式来设计程序，使得发送者和接收者能够消除彼此之间的耦合关系。

通俗易懂的理解：将军发布命令，士兵去执行。其中有几个角色：将军（命令发布者 Invoker）、士兵（命令的具体执行者 Receiver）、命令(连接将军和士兵 Command)。

命令模式的构成角色主要以下三种：

1. 发布者（invoker），用于发出命令，调用命令对象。它不知道如何执行与谁执行。

2. 接收者（receiver），用于提供对应接口处理请求。它不知道谁发起的请求。

3. 命令对象（command），用于接收命令，调用接收者对应接口并处理发布者的请求。

#### 使用场景

1. 假设存在两个组件，有 tabs 和 menuList，我们只需要通过一个方法就可以控制它们的渲染。

2. 这两个组件都是相互独立的，我们如果要让它们渲染，就需要分别实现渲染它们的方法。而我们期望是可以用一个公共的方法同时触发它们进行渲染。

3. 要实现一个方法同时控制这两个组件的渲染，就需要这两个组件分别提供一个方法给这个公共的方法进行调用，这时就可以考虑命令模式。

4. 命令模式可将“动作的请求者”从“动作的执行者”对象中解耦出来。

5. 在这个例子中，动作的请求者是公共的方法，动作的执行者是每个组件。

#### 基本实现示例

```js
// 接受类
class Receiver {
  exexute() {
    console.log("接受者执行请求");
  }
}

// 命令类
class Command {
  // 接受接收者实例参数，用于调用其 exexute 方法
  constructor(recevier) {
    this.recevier = recevier;
  }

  exexute() {
    console.log("命令对象通知接受者如何进行处理请求");
    this.recevier.exexute();
  }
}

// 发布类
class Invoker {
  // 接受命令类实例，用于调用其 exexute 方法
  constructor(command) {
    this.command = command;
  }

  publish() {
    console.log("发布请求");
    this.command.exexute();
  }
}

const recevier = new Receiver();

const order = new Command(recevier);

const invoker = new Invoker(order);

invoker.publish();
```

#### 具体应用场景

同时触发各个组件的渲染：

```js
class MacroCommand {
  constructor() {
    // 用户存储子命令对象
    this.list = new Set();
  }

  add(command) {
    this.list.add(command);
  }

  exexute() {
    this.list.forEach((command) => {
      command.exexute();
    });
  }
}

class Tabs {
  constructor() {
    if (!Tabs.instance) {
      Tabs.instance = this;
    } else {
      return Tabs.instance;
    }
  }

  async exexute() {
    console.log("tabs 执行");
    const res = await this.getData();
    if (res) {
      this.render(res);
    }
  }

  async getData() {
    console.log("加载数据...");
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([0, 1, 2]);
      }, 2000);
    });
  }

  render(res) {
    console.log(res, "页面渲染...");
    const tabs = `
      <div id='tabs'>
        <span>tab1</span>
        <span>tab2</span>
        <span>tab3</span>
      </div>
    `;
    const tabWrap = document.querySelector("#tab-wrap");
    tabWrap.innerHTML = tabs;
  }
}

class MenuList {
  constructor() {
    if (!MenuList.instance) {
      MenuList.instance = this;
    } else {
      return MenuList.instance;
    }
  }

  exexute() {
    console.log("menuList 执行");
    this.render();
  }

  render() {
    const menus = `
    <div id='menus'>
      <span>menu1</span>
      <span>menu2</span>
      <span>menu3</span>
      <span>menu4</span>
      <span>menu5</span>
    </div>
  `;
    const menuWrap = document.querySelector("#menu-wrap");
    menuWrap.innerHTML = menus;
  }
}

const tabs = new Tabs();
const menuList = new MenuList();

const macroCommand = new MacroCommand();

macroCommand.add(tabs);
macroCommand.add(menuList);

macroCommand.exexute();
```
