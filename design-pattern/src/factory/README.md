### 工厂模式

由一个工厂对象决定创建某一种产品对象的实例，主要用来创建同一类对象。

#### 适用场景

简单工厂模式，只能作用于创建的对象数量较少，对象的创建逻辑不复杂时使用。

#### 实现方式

使用构造函数的方式实现：

```js
function UserFactory(role) {
  function User(role, pages) {
    this.role = role;
    this.pages = pages;
  }

  switch (role) {
    case "superadmin":
      return new User("superadmin", ["home", "classify", "create", "setting"]);
    case "admin":
      return new User("admin", ["home", "classify", "create"]);
    case "editor":
      return new User("editor", ["home", "create"]);

    default:
      throw new Error("参数异常，只能传入 superadmin 或 admin 或 editor");
  }
}

const superadmin = new UserFactory("superadmin");
const editor = new UserFactory("editor");

console.log(superadmin, "superadmin");
console.log(editor, "editor");
```

采用 Class 实现：

```js
class Auth {
  constructor(role, pages) {
    this.role = role;
    this.pages = pages;
  }

  static AuthFactory(role) {
    switch (role) {
      case "superadmin":
        return new Auth("superadmin", [
          "home",
          "classify",
          "create",
          "setting",
        ]);
      case "admin":
        return new Auth("admin", ["home", "classify", "create"]);
      case "editor":
        return new Auth("editor", ["home", "create"]);

      default:
        throw new Error("参数异常，只能传入 superadmin 或 admin 或 editor");
    }
  }
}

const superAuth = Auth.AuthFactory("superadmin");
const editorAuth = Auth.AuthFactory("editor");

console.log(superAuth, "superAuth");
console.log(editorAuth, "editorAuth");
```

#### 工厂模式的优缺点

优点：

- 只需要一个正确的参数，就可以获取到你所需要的对象，而无需知道其创建的具体细节。

缺点：

- 在函数内包含了所有对象的创建逻辑和判断逻辑代码，每增加新的构造函数就需要修改逻辑代码，当对象不是上面的 3 个而是 10 个或者更多时，这个函数就会成为一个庞大的超级函数，变得难以维护。
