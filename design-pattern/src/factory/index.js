// 工厂模式
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
