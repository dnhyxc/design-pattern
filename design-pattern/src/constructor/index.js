// 构造器模式
function CreateObject(name, age) {
  this.name = name;
  this.age = age;

  this.say = function () {
    console.log(this.name, this.age);
  };
}

const obj1 = new CreateObject("hmhm", 28);
const obj2 = new CreateObject("snsn", 29);

console.log(obj1);
console.log(obj2);

obj1.say();
obj2.say();
