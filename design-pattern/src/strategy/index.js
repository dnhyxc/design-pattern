// 策略模式

const strategy = {
  A: (salary) => {
    return salary * 3;
  },
  B: (salary) => {
    return salary * 2;
  },
  C: (salary) => {
    return salary * 1;
  },
};

function calBonus(level, salary) {
  return strategy[level](salary);
}

const level1 = calBonus("A", 30000);
const level2 = calBonus("B", 20000);
const level3 = calBonus("C", 10000);
console.log(level1);
console.log(level2);
console.log(level3);

// 具体应用示例
const data = [
  {
    title: "test1",
    type: 1,
  },
  {
    title: "test2",
    type: 2,
  },
  {
    title: "test3",
    type: 1,
  },
  {
    title: "test4",
    type: 3,
  },
  {
    title: "test5",
    type: 2,
  },
];

const TYPE_CONFIG = {
  1: {
    text: "驳回",
    class: "redType",
  },
  2: {
    text: "未通过",
    class: "orangeType",
  },
  3: {
    text: "通过",
    class: "greenType",
  },
};

function renderElement(data) {
  strategyWrap.innerHTML = `${data
    .map((i) => {
      return `
        <div class='item'>
          <span class="title">${i.title}</span>
          <span class='${TYPE_CONFIG[i.type].class}'>${
        TYPE_CONFIG[i.type].text
      }</span>
        </div>
      `;
    })
    .join("")}`;
}

renderElement(data);
