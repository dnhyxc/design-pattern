### 观察者模式

当一个对象的状态发生改变时，所有依赖于它的对象都会得到通知并自动更新，解决了主体对象与观察者之间功能的耦合，即一个对象状态改变给其它对象通知的问题。

> 观察者模式包含观察目标和观察者两类对象：一个目标可以有任意数目的与之相依赖的观察者。一旦观察目标的状态发生改变，所有的观察者都将得到通知。

```js
// 观察者
class Observer {
  constructor(name, fn = () => {}) {
    this.name = name;
    this.fn = fn;
  }
}

// 被观察者
class Subject {
  constructor(state) {
    this.state = {
      name: state.name || "",
      action: state.action || "",
    };
    this.observers = [];
  }

  // 设置状态
  setState(val) {
    this.state = { ...this.state, ...val };
    this.observers.forEach((i) => {
      i.fn(val);
    });
  }

  // 获取状态
  getState() {
    return this.state;
  }

  // 添加观察者
  addObserver(obs) {
    if (!this.observers.includes(obs)) {
      this.observers.push(obs);
    }
  }

  // 删除观察者
  delObserver(obs) {
    if (this.observers.includes(obs)) {
      this.observers = this.observers.filter((i) => i !== obs);
    }
  }

  // 清除所有观察者
  delAll() {
    this.observers = [];
  }
}

const snsn = new Observer("snsn", (data) => {
  console.log(`嘻嘻！snsn发现${data.name || "你"}${data.action || ""}了`);
});

const hmhm = new Observer("hmhm", (data) => {
  console.log(`哈哈！hmhm发现${data.name || "你"}${data.action || ""}了`);
});

const sub1 = new Subject({ name: "dnhyxc", action: "code" });
const sub2 = new Subject({ action: "code" });
sub1.addObserver(snsn);
sub1.addObserver(hmhm);
sub1.setState({ action: "看电影" });
sub1.setState({ name: "听音乐的dnhyxc" });

sub2.addObserver(snsn);
sub2.addObserver(hmhm);
sub2.setState({ action: "听音乐" });
console.log(sub1);
console.log(sub2);
sub2.delObserver(hmhm);
sub2.setState({ action: "听音乐" });
console.log(sub2);

sub1.delAll();
sub1.setState({ action: "发现不了了吧" });
const res = sub1.getState();
console.log(res);
console.log(sub1);
```

#### 观察者的优缺点

优点：目标者与观察者，功能耦合度降低，专注自身功能逻辑，观察者被动接受更新，时间上解耦，实时接受目标者的更新状态。

缺点：观察者模式虽然实现了对象间依赖关系的低耦合，但却不能对事件通知进行细分管控，如 “筛选通知”、“指定主题事件通知” 等。
