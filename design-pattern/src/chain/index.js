// 责任链模式

const chainInp = document.querySelector("#chainInp");
const chainBtn = document.querySelector("#chainBtn");

chainBtn.addEventListener(
  "click",
  () => {
    checks.check();
  },
  false
);

function checkEmpty() {
  if (chainInp.value.length === 0) {
    console.log("内容不能为空");
    return;
  }
  return "next";
}

function checkNumber() {
  if (Number.isNaN(+chainInp.value)) {
    console.log("请输入数字");
    return;
  }
  return "next";
}

function checkLength() {
  if (chainInp.value.length < 6) {
    console.log("不能小于 6 位");
    return;
  }
  return "next";
}

class Chain {
  constructor(fn) {
    this.checkRule = fn;
    this.nextRule = null;
  }

  addRule(nextRule) {
    this.nextRule = new Chain(nextRule);
    return this.nextRule;
  }

  check() {
    this.checkRule() === "next" ? this.nextRule.check() : null;
  }

  end() {
    this.nextRule = {
      check: () => "end",
    };
  }
}

const checks = new Chain(checkEmpty);

checks.addRule(checkNumber).addRule(checkLength).end();
