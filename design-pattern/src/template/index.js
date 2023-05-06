class Container {
  constructor(params = {}) {
    this.params = params;
    this.list = [];
  }

  async init() {
    const list = await this.getData();
    this.list = [...this.list, ...list];
    list?.length && this.render(list);
  }

  getData() {
    throw new Error("必须传入getData方法");
  }

  render(list) {
    console.log(list, "render");
  }
}

class Message extends Container {
  constructor() {
    super();
  }

  // 重写父类 getData 方法
  getData() {
    console.log("message 开始获取数据");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([1, 2, 3, 4, 5]);
      }, 2000);
    });
  }
}

class Article extends Container {
  constructor() {
    super();
  }

  // 重写父类 getData 方法
  getData() {
    console.log("article 开始获取数据");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([6, 7, 8, 9, 10]);
      }, 2000);
    });
  }
}

const message = new Message();
const article = new Article();

message.init();
article.init();

// const Container = function (params = {}) {
//   const F = function () {};

//   F.prototype.init = function () {
//     const list = this.getData();
//     this.render(list);
//   };

//   F.prototype.getData =
//     params.getData ||
//     function () {
//       throw new Error("必须传入 getData 方法");
//     };

//   F.prototype.render = function (list) {
//     console.log(list, "render");
//   };

//   return F;
// };

// const MyClass = Container({
//   getData() {
//     console.log("my class 开始加载数据");
//     return [1, 2, 3];
//   },
// });

// const MyClass2 = Container({
//   getData() {
//     console.log("my class2 开始加载数据");
//     return [4, 5, 6];
//   },
// });

// new MyClass().init();
// new MyClass2().init();
