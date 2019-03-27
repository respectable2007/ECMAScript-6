(() => {
  "use strict";
  /* 对象字面量语法扩展 */
  let foo = 'bar',
      bar = 'juanjuan',
      /* 属性初始化器速记法（简写表示法） */
      obj1 = { bar,
      /* 方法简写 */
      sayHi() {
        console.log(this.bar)
      },
      /* 属性表达式声明对象属性 */
      [foo]: 'xiaomaomi',
    //   [foo]//报错，属性表达式与简写表示不能同时出现
    };
  /* [foo]和bar重名，ES6不会检查重名属性。
     当出现重名后，该属性实际值为后排那个属性的值 */
  console.log(obj1.bar);//xiaomaomi
  obj1.sayHi();//xiaomaomi
  console.log(obj1.foo);//undefined
})();