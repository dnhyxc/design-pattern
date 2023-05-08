### 迭代器模式

迭代器模式是指提供一种方法顺序来访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的郭成从业务逻辑中分离出来，在使用迭代器模式之后，即便不关心对象的内部构造，也可以按顺序访问其中的每个元素。

迭代器模式的特点：

1. 为遍历不同数据结构 “集合” 提供统一的接口。

2. 能遍历访问 “集合” 数据中的项，不关心项的数据结构。

#### 迭代器模式基本实现

```js
// 统一遍历接口
const myEach = function (arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(i, arr[i]);
  }
};

// 外部调用
myEach([1, 2, 3, 4, 5], function (index, value) {
  console.log(index, value);
  const oli = document.createElement("li");
  oli.innerHTML = value;
  list.appendChild(oli);
});
```

#### 迭代器模式的应用场景

使用迭代器模式实现对象支持 for...of 循环，从而只对外暴露出该对象中某个指定的值：

- 实现通过 for...of 循环只对外暴露出 hobby 数组的属性值：

```js
const obj = {
  name: "dnhyxc",
  age: "18",
  hobby: ["xixi", "zczc", "yhyh", "hmhm", "snsn"],
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

const res = response[Symbol.iterator]();

console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());
console.log(res.next());

for (let i of obj) {
  console.log(i, "iiii");
}
```
