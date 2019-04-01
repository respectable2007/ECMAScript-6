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

  /*  */
})()