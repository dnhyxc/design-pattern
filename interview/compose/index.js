const arr = [1, 2, 3, 4, 5, 6];
const reduceRightRes = arr.reduceRight((total, cur, index, arr) => {
  // 5 '<cur index>' 4 => 4 '<cur index>' 3 => 3 '<cur index>' 2 => 2 '<cur index>' 1 => 1 '<cur index>' 0
  console.log(cur, "<cur index>", index);

  return total + cur;
});

console.log(reduceRightRes);

const reduceRes = arr.reduce((total, cur, index, arr) => {
  // 2 '<cur index>' 1 => 3 '<cur index>' 2 => 4 '<cur index>' 3 => 5 '<cur index>' 4 => 6 '<cur index>' 5
  console.log(cur, "<cur index>", index);

  return total + cur;
});

console.log(reduceRes);

function compose(...funs) {
  return (value) => {
    return funs.reduceRight((total, prevFun) => prevFun(total), value);
  };
}

const add = (x) => x + 1;
const mul = (x) => x * 6;
const div = (x) => x / 2;
const sub = (x) => x - 2;

const result1 = div(mul(add(2)));

const composeRes = compose(div, mul, add)(2);

console.log(composeRes, "composeRes", result1); // 9 'composeRes' 9

function pipe(...funs) {
  return (value) => {
    return funs.reduce((total, nextFun) => {
      return nextFun(total);
    }, value);
  };
}

const pipeRes = pipe(div, mul, add)(2);

const result2 = add(mul(div(2)));

console.log(pipeRes, "pipeRes", result2); // 7 'pipeRes' 7

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
console.log(middleFun1Res, "middleFun1Res");

const middleFun2Res = middleFun2(sub(2));
console.log(middleFun2Res, "middleFun2Res");

const composeReduxRes = composeRedux(div, mul, add, sub)(2);
console.log(composeReduxRes, "composeReduxRes");
