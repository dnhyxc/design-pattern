// 建造者模式

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
