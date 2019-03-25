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
 pick({
   year: 2017,
   name: 'juanjuan'
 }, 'year');
})();
