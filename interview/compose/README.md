### compose 函数

compose 函数可以将需要嵌套执行的函数平铺，嵌套执行就是一个函数的返回值将作为另一个函数的参数。具体表现如下：

```js
fun1(fun2(fun3(fun4(fun5(value)))));
```

compose 的出现，可以解决上述多层嵌套带来的代码可读性差及不好维护的问题，compose 具体结构如下：

```js
compose(fun1, fun2, fun3, fun4, fun5)(value);
```

compose 的执行顺序是**从右往左**，也就是：fun5 => fun4 => fun3 => fun2 => fun1。

#### 实现 compose 的方式

可以使用 reduceRight() 方法实现，该方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。reduceRight 与 reduce 极其相似，只是累加的顺序不一样而已，reduce 的累加顺序是从左往右。

```js
const arr = [1, 2, 3, 4, 5, 6];
const reduceRightRes = arr.reduceRight((total, cur, index, arr) => {
  // 5 '<cur index>' 4  ==>  4 '<cur index>' 3  ==>  3 '<cur index>' 2  ==>  2 '<cur index>' 1  ==>  1 '<cur index>' 0
  console.log(cur, "<cur index>", index);

  return total + cur;
});

console.log(reduceRightRes);
```

compose 具体实现方式如下：

```js
function compose(...funs) {
  return (value) => {
    return funs.reduceRight((total, prevFun) => prevFun(total), value);
  };
}

const add = (x) => x + 1;
const mul = (x) => x * 6;
const div = (x) => x / 2;

const composeRes = compose(div, mul, add)(2);

const result = div(mul(add(2)));

console.log(composeRes, "composeRes", result); // 9 'composeRes' 9
```

#### 应用 compose 的场景

Redux 中使用 compose 的示例代码解析：

```js
function composeRedux(...funs) {
  if (funs.length === 0) {
    return (arg) => arg;
  }

  if (funs.length === 1) {
    return funs[0];
  }

  return funs.reduce((a, b) => {
    /**
     * a: div, b: mul
     * a: (...args) => a(b(...args)) 等价于：middleFun1, b: add
     * a: (...drgs) => div(mul(add(...args))) 等价于：middleFun2, b: sub
     */
    return (...args) => a(b(...args));
  });
}

function middleFun1(...args) {
  return div(mul(...args));
}

// 等价于：div(mul(add(...args)))
function middleFun2(...args) {
  return middleFun1(add(...args));
}

const middleFun1Res = middleFun1(add(2));
console.log(middleFun1Res, "middleFun1Res"); // 9

const middleFun2Res = middleFun2(sub(2));
console.log(middleFun2Res, "middleFun2Res"); // 3

const composeReduxRes = composeRedux(div, mul, add, sub)(2);
console.log(composeReduxRes, "composeReduxRes"); // 3
```

### pipe 函数

pipe 函数与 compose 函数类似，只是执行顺序与 compose 相反而已，因此 pipe 可以使用 reduce 实现：

```js
function pipe(...funs) {
  return (value) => {
    return funs.reduce((total, nextFun) => nextFun(total), value);
  };
}

const add = (x) => x + 1;
const mul = (x) => x * 6;
const div = (x) => x / 2;

const pipeRes = pipe(div, mul, add)(2);

const result = add(mul(div(2)));

console.log(pipeRes, "pipeRes", result); // 7 'pipeRes' 7
```
