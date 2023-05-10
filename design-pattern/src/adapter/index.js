// 适配器模式

class Api1 {
  show() {
    console.log("调用API1中的方法");
  }
}

class Api2 {
  display() {
    console.log("调用API2中的方法");
  }
}

// 实现适配器
class Api2Adapater extends Api2 {
  constructor() {
    super();
  }

  show() {
    this.display();
  }
}

function useApi(api) {
  api.show();
}

useApi(new Api1());
useApi(new Api2Adapater());
