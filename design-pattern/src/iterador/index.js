// 迭代器模式

// 因为对象本身不支持 for of 循环，如果要使某个对象支持 for of 循环就需要手动为这个对象增加迭代器
const response = {
  code: 200,
  name: "dnhyxc",
  list: ["xixi", "zczc", "yhyh", "hmhm", "snsn"],
  [Symbol.iterator]: function () {
    let index = 0;
    return {
      next: () => {
        if (index < this.list.length) {
          return {
            value: this.list[index++],
            done: false,
          };
        }
        return {
          value: undefined,
          done: true,
        };
      },
    };
  },
};

const res = response[Symbol.iterator]();

console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());

for (let i of response) {
  console.log(i, "i");
}

const obj = {
  list: ["xixi", "zczc", "yhyh", "hmhm", "snsn"],
};

Object.defineProperty(obj, Symbol.iterator, {
  value: function () {
    let index = 0;
    return {
      next: () => {
        if (index < obj.list.length) {
          return {
            value: obj.list[index++],
            done: false,
          };
        }
        return {
          value: undefined,
          done: true,
        };
      },
    };
  },
});

const res2 = response[Symbol.iterator]();

console.log(res2.next());
console.log(res2.next());
console.log(res2.next());
console.log(res2.next());
console.log(res2.next());
console.log(res2.next());

for (let i of obj) {
  console.log(i, "iiii");
}
