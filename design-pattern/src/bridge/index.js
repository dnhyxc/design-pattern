// 桥接模式

const Animations = {
  bounce: {
    show(ele) {
      console.log(ele, "弹跳显示");
    },

    hide(ele) {
      console.log(ele, "弹跳隐藏");
    },
  },

  slide: {
    show(ele) {
      console.log(ele, "滑动显示");
    },

    hide(ele) {
      console.log(ele, "滑动隐藏");
    },
  },

  rotate: {
    show(ele) {
      console.log(ele, "旋转显示");
    },

    hide(ele) {
      console.log(ele, "旋转隐藏");
    },
  },
};

function Toast(ele, animation) {
  this.ele = ele;
  this.animation = animation;
  // 扩展 Message 其它属性
}

Toast.prototype.show = function () {
  this.animation.show(this.ele);
};

Toast.prototype.hide = function () {
  this.animation.hide(this.ele);
};

class Message {
  constructor(ele, animation) {
    this.ele = ele;
    this.animation = animation;
  }

  show() {
    this.animation.show(this.ele);
  }

  hide() {
    this.animation.hide(this.ele);
  }

  setContent(value) {
    const content = this.ele.querySelector("#content");
    content.innerHTML = value;
  }
}
const toast1 = new Toast("toast1", Animations.bounce);
const toast2 = new Toast("toast1", Animations.slide);
const message1 = new Message(message, Animations.rotate);
const message2 = new Message(message_2, Animations.bounce);

toast1.show();
toast2.show();
message1.show();
message2.show();

setTimeout(() => {
  message1.setContent("我是message1消息内容");
  message2.setContent("我是message2消息内容");
}, 1500);

setTimeout(() => {
  toast1.hide();
  toast2.hide();
  message1.hide();
  message2.hide();
}, 2000);
