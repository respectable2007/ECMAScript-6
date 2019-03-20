/*不被提升，类名不能在内部重写*/
class Person {
  /*严格模式，constructor内创建自有属性*/
  constructor(name) {
    this.name = name;
  }
  /*内部方法没有[[constructor]]属性，不能使用new关键字*/
  sayName() {
    console.log(this.name);
  }
}
/*类构造器必须使用new关键字*/
let p = new Person('juanjuan');
p.sayName();
function list(p) {
  /* 只打印了name属性，sayName方法未被打印。
  因此，ES6的类内部的方法是不能被枚举的 */
  for(let i in p) {
    console.log(p)
  }
}
list(p);
/**/