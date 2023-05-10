// 单例模式

// 通过闭包实现
const singleton = (function () {
  let instance = null;

  function User(name, age) {
    this.name = name;
    this.age = age;
  }

  return function (name, age) {
    if (!instance) {
      instance = new User(name, age);
    }
    return instance;
  };
})();

const user1 = singleton("dnhyxc", 18);
const user2 = singleton("hmhm", 28);

console.log(user1, user2);
console.log(user1 === user2);

// 使用 Class 实现
class Single {
  constructor(name, age) {
    if (!Single.instance) {
      this.name = name;
      this.age = age;
      Single.instance = this;
    }

    return Single.instance;
  }

  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }
}

const dnhyxc = new Single("dnhyxc", 18);
const hmhm = new Single("hmhm", 28);

console.log(dnhyxc, "dnhyxc");
console.log(hmhm, "hmhm");
console.log(hmhm === dnhyxc);
console.log(dnhyxc.getName());
console.log(dnhyxc.getAge());

// 通过单例模式实现模态框
class CreateModal {
  constructor(params) {
    if (!CreateModal.instance) {
      this.init(params);
      this.createElement();
      this.bindEvent();
      CreateModal.instance = this;
    }
    return CreateModal.instance;
  }

  init({
    wrapClassName,
    titleClassName = "title",
    contentClassName = "content-body",
    footerClassName = "footer",
    content = "",
    cancelText = "取消",
    okText = "确定",
  }) {
    this.wrapClassName = wrapClassName;
    this.titleClassName = titleClassName;
    this.contentClassName = contentClassName;
    this.footerClassName = footerClassName;
    this.content = content;
    this.cancelText = cancelText;
    this.okText = okText;
  }

  createElement() {
    this.element = document.createElement("div");
    this.oTitle = document.createElement("div");
    this.oContent = document.createElement("div");
    this.oFooter = document.createElement("div");
    this.cancelBtn = document.createElement("button");
    this.okBtn = document.createElement("button");
    this.element.className = this.wrapClassName;
    this.oTitle.innerHTML = "标题";
    this.oTitle.className = this.titleClassName;
    this.oContent.className = this.contentClassName;
    if (typeof this.content === "string") {
      this.oContent.innerHTML = this.content;
    } else {
      this.oContent.appendChild(this.content);
    }
    this.oFooter.className = this.footerClassName;
    this.cancelBtn.innerHTML = this.cancelText;
    this.okBtn.innerHTML = this.okText;
    this.oFooter.appendChild(this.cancelBtn);
    this.oFooter.appendChild(this.okBtn);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.oTitle);
    fragment.appendChild(this.oContent);
    fragment.appendChild(this.oFooter);
    this.element.appendChild(fragment);
    document.body.appendChild(this.element);
    this.element.style.display = "none";
  }

  changeTitle(title = "标题", className) {
    if (!this.oTitle) {
      throw new Error("请在 show() 方法之后调用 changeTitle()");
    }
    this.oTitle.innerHTML = title;
    this.oTitle.className = className || this.titleClassName;
  }

  changeContent(content) {
    if (!this.oContent) {
      throw new Error("请在 show() 方法之后调用 changeContent()");
    }
    this.oContent.innerHTML = "";
    if (typeof content === "string") {
      this.oContent.innerHTML = content;
    } else {
      this.oContent.appendChild(content);
    }
  }

  bindEvent() {
    this.cancelBtn.addEventListener("click", () => {
      console.log("点击取消，关闭弹窗");
      this.element.style.display = "none";
    });

    this.okBtn.addEventListener("click", () => {
      console.log("点击确定，关闭弹窗");
      this.element.style.display = "none";
    });
  }

  show() {
    this.element.style.display = "flex";
  }
}

const contentStr = `
  <div class='content'>
  <div>我是弹窗内容1</div>
  <div>我是弹窗内容2</div>
  <div>我是弹窗内容3</div>
  </div>
`;

const content = document.createElement("div");
content.className = "content";
content.innerHTML = `
  <div>我是弹窗内容1-element</div>
  <div>我是弹窗内容2-element</div>
  <div>我是弹窗内容3-element</div>
`;

const onChangeTitle = (modal) => {
  modal.changeTitle("我已经更换标题了");
};

const onChangeContent = (modal2) => {
  modal2.changeContent(content);
};

const showModal = (modal) => {
  modal.show();
  changeTitltBtn.style.display = "inline-block";
  changeContentBtn.style.display = "inline-block";
};

singletonWrap.addEventListener("click", (e) => {
  const modal = new CreateModal({
    wrapClassName: "single-modal",
    content: contentStr,
  });

  const modal2 = new CreateModal({
    wrapClassName: "single-modal",
    content: content,
  });

  console.log(modal2 === modal, "modal2 === modal");

  const { target } = e;

  switch (target.id) {
    case "singletonBtn":
      showModal(modal2);
      break;
    case "changeTitltBtn":
      onChangeTitle(modal);
      break;
    case "changeContentBtn":
      onChangeContent(modal2);
      break;

    default:
      break;
  }
});
