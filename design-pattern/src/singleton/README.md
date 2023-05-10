### 单例模式

保证一个类仅仅只有一个实例，并提供一个访问它的全局访问点。它主要解决一个全局使用的类频繁地创建和销毁，占用内存。

#### 适用场景

1. 引用第三方库（多次引用只会使用一个库引用）。

2. 弹窗（登录框，信息提升框）。

3. 购物车 (一个用户只有一个购物车)。

4. 全局态管理 store (Vuex / Redux)。

#### 实现方式

利用闭包的方式实现：

```js
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
```

通过 Class 实现：

```js
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
```

#### 单例模式的优缺点

优点：

- 适用于单一对象，只生成一个对象实例，避免频繁创建和销毁实例，减少内存占用。

缺点：

- 不适用动态扩展对象，或需创建多个相似对象的场景。
