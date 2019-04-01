(() => {
  "use strict";
  /* 创建符号值 */
  let symbol = Symbol('url');
  console.log(symbol);//Symbol('url')

  /* 符号的类型 */
  console.log(typeof symbol);//symbol

  /* 共享符号 */
  let pub = Symbol.for('uid'),
      obj = {
        [pub] : 'rrr'
      };
  console.log(obj);
  let pub1 = Symbol.for('uid');
  /* pub、pub1共享Symbol('uid')符号 */
  console.log(pub === pub1);//true

  /* 符号的转换 */
  let pub3 = Symbol('uid1');
  console.log(pub3);//隐式调用toString方法，输出Symbol('uid1')字符串
  // console.log(pub3 + 1);//报错，符号不能转为number
  console.log(pub3 && {});//{}，符号值在逻辑运算中认为是true，返回{}对象

  /* Symbol.hasInstance,用来判断一个对象是否为一个构造函数的实例 */
  function MyObject() {

  }
  Object.defineProperty(MyObject, Symbol.hasInstance, {
    /* 任何对象都返回false，函数可以作为值传递给一个对象属性 */
    value: function() {
      return false;
    }
  })
  let a = new MyObject();
  /* 下面两行代码是等价的 */
  console.log(MyObject[Symbol.hasInstance](a));//false
  console.log(a instanceof MyObject);//false

  /* Symbol.isConcatSpreadable,改变类数组对象的在concat中的默认行为，
  设置为true，则表示其数值类型的键对应的值作为独立个体进行操作 */
  let likeArray = {
    0: 'a',
    1: 'b',
    length: 2,
    [Symbol.isConcatSpreadable]: true
  }, arr = ['c', 'd'];
  let arr1 = arr.concat(likeArray);
  /* Symbol.isConcatSpreadable为false时，其输出结果为['c', 'd', ['a', 'b']] */
  console.log(arr1);//['c', 'd', 'a', 'b']

  /* Symbol.match、Symbol.replace、Symbol.search、Symbol.split 
  自定义string字符串的match replace search split的规则*/
  let txtObject = {
    [Symbol.match]: function(value) {
       return value == 10 ? value: value % 10;
    },
    [Symbol.replace]: function(value) {
       return value == 10 ? '十' : value + '';
    },
    [Symbol.search]: function(value) {
       return value == 10 ? true : false;
    },
    [Symbol.split]: function(value) {
      return value == 10 ? '1,' + ' 0' : value;
    }
  }, num = '10';
  console.log(num.match(txtObject));//10
  console.log(num.replace(txtObject));//'十'
  console.log(num.search(txtObject));//true
  console.log(num.split(txtObject));//'1, 0'
  
  /* Symbol.toPrimitive，自定义对象隐式转换的内部规则 */
  let pri = {
    value: 'Hello World',
    [Symbol.toPrimitive]: function(value) {
      switch(value) {
        case 'string': 
          return this.value.toString();
        case 'number':
         return Number(this.value);
        case 'default':
         return this.value.toString();
      }
    }
  };
  console.log(pri + '');//'Hello World'
  console.log(Number(pri) + 2);//NaN

  /* Symbol.toStringTag，定义Object.prototype.toString.call()返回的内容 */
  function Person() {
  };
  Person.prototype[Symbol.toStringTag] = 'Person';
  let p = new Person();
  console.log(Object.prototype.toString.call(p));//[object Person]

  /* Symbol.unscopables，在with语句中不能使用array的某些方法或属性,示例请查看index.html */
})()