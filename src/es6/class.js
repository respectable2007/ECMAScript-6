(function() {
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

/* 在类原型上定义访问器属性 */
class Child {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return this.name;
  }
  set name(n) {
    this.name = n;
  }
}
/* 获取对象某个属性的描述符 */
let des = Object.getOwnPropertyDescriptor(Child.prototype, 'name');
console.log('get' in des);
/*立即调用类，创建单例*/
let student = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log('Student: ' + this.name);
  }
}();
student.sayName();

/* 静态成员 */
function PersonType(m) {
  this.m = m;
}
PersonType.create = function(m) {
  return new PersonType(m);
}
let p1 = PersonType.create('Juanjuan'),
    p2 = PersonType.create('Juanmei');
console.log(p1.m);//Juanjuan
console.log(p2.m);//Juanmei
console.log('create' in p1);

/* 类继承 */
class Rectangle {
  /* 相当于
    function Rectangle(width,length) {
      this.width = width;
      this.length = length;
    } 
  */
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }
  /* 相当于Rectangle.prototype.area */
  area() {
    return this.width * this.length;
  }
  /* 基类静态成员 */
  static create(w,h) {
    return new Rectangle(w,h);
  }
}
/* 相当于
   Square.prototype = Object.create(Rectangle.prototype, {
     constructor: Square
   }) 
*/
class Square extends Rectangle{
  /* 相当于Rectangle.call(this,length,length) */
  constructor(length) {
    super(length, length)
  }
  /* 定义与基类相同名称的方法，可屏蔽基类方法 */
  area() {
    return this.length * 2;
  }
  /* 可使用super调用基类方法 */
  area1() {
    console.log('屏蔽后，调用基类方法输出的结果：' + super.area())
  }
}
let s = new Square(10);
console.log(s.area());//输出100
/* 屏蔽基类方法 */
console.log(s.area());//输出20
/* 屏蔽后，调用基类方法输出的结果 */
s.area1();//输出100
/* 派生类继承了基类的静态成员 */
let j = Square.create(3, 5);
console.log(j.area());//15
console.log(j instanceof Square);//false
/* 类继承与表达式 */
let i = {
  s() {
    return JSON.stringify(this);
  }
},
k = {
  area(){
    return this.width * this.length;
  }
}
function mix(...x) {
  function F(){};
  Object.assign(F.prototype, ...x);
  /* 实例对象的prototype为undefined，即不具备原型对象 */
  /* console.log((new F()).prototype);//undefined */
  return F;
}
class Y extends mix(i, k) {
  constructor(width, length) {
    /* super一定在this之前 */
    super();
    this.width = width;
    this.length = length;
  }
}
let m = new Y(4, 5);
console.log(m.area());//20
console.log(m.s());//{"width":4,"length":5}
})()