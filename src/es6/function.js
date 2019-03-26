function doSomething() {
  console.log(111);
}
(function(){
  "use strict";
 /* 带默认值的函数 */
 function array(url, time = 2000, callback = function() {console.log(111);}) {
    console.log(url);
    /* 未传入参数或参数为undefined时，time为默认值 */
    console.log(time);
    console.log(callback);
    /* arguments对象与函数参数不是事实更新的，
       仅仅保存着函数调用时传入参数的值*/
    console.log(arguments)
    console.log(arguments[1])
    console.log(arguments[2])
    time = 4000;
    console.log(arguments[1]);
  }
//   array();
//   array('/foo', null);
 /* 函数默认值 */
 /* function getValue() {
   return 5;
 } */
 /* 默认值为函数调用 */
 /* function add(f, s = getValue()) {
   return f + s;
 } */
 /* 默认值为前方参数 */
 /* function add(f, s = f) {
   return f + s;
 } */
 /* 默认值为函数调用，且前方参数为函数调用的参数 */
 function getValue(x) {
   return x + 5;
 }
 function add(f, s = getValue(f)) {
   return f + s;
 }
 /* console.log(add(1, 2));
 console.log(add(1)); */

 /* ES5对象的数据属性和访问器属性 */
 let person = {
   edition: 1
 };
 Object.defineProperties(person, {
   /* 数据属性 */    
   _year: {
     value: 2017,
     writable: true
   },
   /* 访问器属性 */
   year: {
    get: function() {
      return this._year;
    },
    set: function(value) {
      this._year = value;
      this.edition = 3;
    }
   },
   /* 数据属性 */
   name: {
      value: 'juanjuan'
   }
 })
 person.year = 2019;
 /* console.log(person.year)
 console.log(person.edition) */

 /* 剩余参数 */
 function pick(object,args,...keys) {
   console.log(keys.length);//剩余参数只包含不具名参数
   console.log(arguments.length);//arguments包含具名参数和剩余参数
   console.log(pick.length);//函数对象的length只包含具名参数
   console.log(arguments[0] === keys[0]);
 }
 /* pick({
   year: 2017,
   name: 'juanjuan'
 }, 'year'); */
 
 /* 扩展运算符 */
 let args = [10, 20, 14, 50];
 /* console.log(Math.max(args, 20));//NaN
 console.log(Math.max.apply(Math, args));//50
 console.log(Math.max(...args));//50,将数组项做为函数参数传入 */

 /* new.target */
 /* 函数的用途 */
 /* function Person(name) {
   this.name = name;
 }
 let p1 = new Person('juanjuan'),
   p2 = Person('juanjuan');
 console.log(p1);//Person对象的实例
 console.log(p2);//undefined */

 /* ES5判断函数如何被调用 */
 function Person(name) {
   if(this instanceof Person) {
     this.name = name;
   } else {
     throw new Error('error');
   }
 }
 let p1 = new Person('juanjuan'),
     /* p2是调用函数，并未使用new运算符，但判断条件凑效了。
        因此，这个判断方法失效，但也没有合适的方法解决这个
        问题，因此ES6提出了new.target*/
     p2 = Person.call(p1, 'shuaijuan');
    //  p3 = Person('juanjuan');
  /* console.log(p1);
  console.log(p2);//this为Person的实例对象，未报错，返回undefined
  console.log(p3);//报错 */

  /* new.target判断函数调用方式 */
  function Student(name) {
    if(new.target === Student) {
      this.name = name;
    } else {
      console.log('error');
    }
  }
  /* let s1 = new Student('juanjuan'),
      s2 = Student.call(s1, 'huahua');//报错
  console.log(s1);
  console.log(s2); */

  /* 块级函数,js引擎遵循如下规则：1、允许在块级作用域（花括号）内声明函数。
     2、函数声明类似于var，即会提升到全局作用域或函数作用域的顶部。
     3、函数声明会提升到所在的块级作用域的顶部。 */
  if(false) {
    console.log(typeof doSomething);
    function doSomething() {
      console.log(111)
    }
    doSomething();
  }
  /* 返回undefined是因为，函数声明变量（函数name属性）提升到函数作用域的顶部，
  但因为代码块是false，函数声明变量并未被赋值；
  在函数作用域外部声明了相同名称的函数，也会返回undefined，
  与作用域链查找有关，先找到一个值为undefined的doSomething变量*/
//   console.log(typeof doSomething);
//   doSomething();//报错
  
  /* 箭头函数 */
  let num1 = 12,
      num2 = 14,
      /* 空参数 */
      f1 = () => 'juanjuan',
      /* 单个参数 */
      f2 = num => ++num,
      /* 多个参数 */
      f3 = (num1, num2) => num1 + num2,
      /* 含有多个语句 */
      f4 = (num1, num2) => {
        let sum = num1 + num2;
        return sum *= 4;
      },
      /* 空函数 */
      f5 = () => {},
      /* 对象字面量 */
      f6 = num => ({
        id: num,
        name: 'juanjuan'
      });
  console.log(f1());//'juanjuan'
  console.log(f2(num1));//13
  console.log(f3(num1, num2));//26
  console.log(f4(num1, num2));//104
  console.log(f5());//undefined
  console.log(f6(num1));//{id: 12,name: 'juanjuan'}

  /* 箭头函数this */
  
})();
