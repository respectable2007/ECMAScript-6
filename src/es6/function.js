(function(){
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
 let p1 = new Person('juanjuan');
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
  let s1 = new Student('juanjuan'),
      s2 = Student.call(s1, 'huahua');
  console.log(s1);
  console.log(s2);
})();
