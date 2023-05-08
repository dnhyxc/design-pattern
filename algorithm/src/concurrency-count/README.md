### 实现异步任务请求并发数

#### 基于任务队列实现

```js
class TaskQueue {
  constructor(limit) {
    this.max = limit;
    this.taskList = [];
    /*
    这里使用定时器是为了在同步任务 taskQueue.addTask(task) 
    将所有的任务添加进入任务池之后再触发 run 执行。
    */
    setTimeout(() => {
      this.run();
    });
  }

  addTask(task) {
    this.taskList.push(task);
  }

  run() {
    const length = this.taskList.length;
    if (!length) return;
    const min = Math.min(this.max, length);
    for (let i = 0; i < min; i++) {
      this.max--;
      const task = this.taskList.shift();
      this.getData(task);
    }
  }

  getData(task) {
    task()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.max++;
        this.run();
      });
  }
}

function createTask(i) {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i);
      }, 5000);
    });
  };
}

const taskQueue = new TaskQueue(4);

for (let i = 0; i < 20; i++) {
  const task = createTask(i);
  taskQueue.addTask(task);
}
```

#### 基于 Promise.race 和 Promise.all 实现

```js
async function sleep(n, name = "test") {
  return new Promise((resolve) => {
    console.log(n, name, "start");
    setTimeout(() => {
      console.log(n, name, "end-------------");
      resolve({ n, name });
    }, n * 1000);
  });
}

// 限制并发数，item是异步函数队列
async function asyncPool({ limit, items }) {
  const promises = [];
  const pool = new Set();

  const auxiliaryFn = async (fn) => await fn();

  for (const item of items) {
    // 获取到每个 sleep 函数的 promise 返回值，即 Promise({n: xxx, name: 'xxx'})
    const promise = auxiliaryFn(item);

    promises.push(promise);
    pool.add(promise);

    promise.finally(() => {
      pool.delete(promise);
    });

    if (pool.size >= limit) {
      await Promise.race(pool);
    }
  }

  return Promise.all(promises);
}

async function start() {
  await asyncPool({
    limit: 2,
    items: [
      () => sleep(1, "睡觉"),
      () => sleep(3, "刷视频"),
      () => sleep(2, "看书"),
      () => sleep(3.5, "coding"),
      () => sleep(5, "健身"),
    ],
  });
  console.log("结束");
}

start();
```
