// 命令模式
class Receiver {
  // 接受类
  exexute() {
    console.log("接受者执行请求");
  }
}

class Command {
  // 接受接收者实例参数，用于调用其 exexute 方法
  constructor(recevier) {
    this.recevier = recevier;
  }

  // 命令类
  exexute() {
    console.log("命令对象通知接受者如何进行处理请求");
    this.recevier.exexute();
  }
}

class Invoker {
  // 发布类，接受命令类实例，用于调用其 exexute 方法
  constructor(command) {
    this.command = command;
  }

  order() {
    console.log("发布请求");
    this.command.exexute();
  }
}

const recevier = new Receiver();

const order = new Command(recevier);

const invoker = new Invoker(order);

invoker.order();

// 具体使用场景
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
