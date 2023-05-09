// 抽象工厂模式

// 父类实现公共的方法
class User {
  constructor(name, role, pages) {
    this.name = name;
    this.role = role;
    this.pages = pages;
  }

  getAuthInfo() {
    console.log(`${this.name}是${this.role}权限，具有访问${this.pages}的权限`);
  }

  dataShow() {
    throw new Error("抽象方法需要被子类实现");
  }
}

// 继承父类
class SuperAdmin extends User {
  constructor(name) {
    super(name, "superadmin", ["home", "classify", "create", "setting"]);
  }

  dataShow() {
    console.log("superadmin-dataShow");
  }

  editAuth() {
    console.log("编辑权限");
  }

  addUser() {
    console.log("增加用户");
  }

  createArticle() {
    console.log("增加权限");
  }
}

class Admin extends User {
  constructor(name) {
    super(name, "admin", ["home", "classify", "create"]);
  }

  dataShow() {
    console.log("admin-dataShow");
  }

  addUser() {
    console.log("增加用户");
  }

  createArticle() {
    console.log("创建文章");
  }
}

class Editor extends User {
  constructor(name) {
    super(name, "editor", ["home", "create"]);
  }

  createArticle() {
    console.log("创建文章");
  }

  dataShow() {
    console.log("admin-dataShow");
  }
}

// 返回对应的类
function getAbstractUserFactory(role) {
  switch (role) {
    case "superadmin":
      return SuperAdmin;

    case "admin":
      return Admin;

    case "editor":
      return Editor;

    default:
      throw new Error("参数异常，只能传入 superadmin 或 admin 或 editor");
  }
}

const SuperAdminUser = getAbstractUserFactory("superadmin");
const AdminUser = getAbstractUserFactory("admin");
const EditorUser = getAbstractUserFactory("editor");

const superadmin = new SuperAdminUser("dnhyxc");
const admin = new AdminUser("夏陌");
const editor = new EditorUser("墨客");

superadmin.getAuthInfo();
superadmin.dataShow();

admin.getAuthInfo();
admin.dataShow();

editor.getAuthInfo();
editor.dataShow();

console.log(superadmin.pages, "superadmin pages");
console.log(admin.pages, "admin pages");
console.log(editor.pages, "editor pages");
