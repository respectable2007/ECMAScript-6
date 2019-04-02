(() => {
  "use strict";
  /* map */
  /* 创建map */
  let map = new Map(),
      n = 1,
      nan = NaN,
      b = true,
      s = '2',
      o = {},
      o1 = {0:0},
      o2 = null,
      o3 = undefined;
  /* 任意类型都可作为map的键 */
  map.set(n, 'a');
  map.set(nan, 'NaN');
  map.set(b, 'b');
  map.set(s, 'c');
  map.set(o, 'd');
  map.set(o1, 'e');
  map.set(o2, 'f');
  map.set(o3, 'g');
  /* 读取键对应的值 */
  console.log(map.get(n));//'a'

  /* 读取map中键值对的个数 */
  console.log(map.size);//8

  /* has,判断是否存在某个键 */
  console.log(map.has(o2));//true
  console.log(map.has(NaN));//true

  /* delete,删除某个键及其值 */
  map.delete(o3);
  console.log(map.size);//7

  /* forEach,遍历map，回调函数参数：值，键，map本身 */
  map.forEach((v,k,m) => {
    console.log(k + ':' + v);
    console.log(map === m);
  })
  /* clear,清空map */
  map.clear();
  console.log(map.size);//0

  /* 使用二维数组，将数据一次性大量添加入map */
  let map1 = new Map([['@', 2],['#', 3],['$', 4],['%', 5]]);
  console.log(map1.size);//4

  /* Map中的对象引用，若map不被置为null，则一直占用内存，不能被收回，
     造成内存泄漏。WeakMap可以解决这个问题，当只剩下WeakMap中的对象
     引用，不影响垃圾回收，可以释放内存 */
 let weakmap = new WeakMap();
 weakmap.set(o, 'wa');
//  weakmap.set(o2, 'wa');//报错，null不能为WeakMap的键
//  weakmap.set(o3, 'wa');//报错，undefined不能为WeakMap的键

  /* 读取键的值 */
  console.log(weakmap.get(o));//'wa'

  /* 删除某一个键 */
  weakmap.delete(o);
  console.log(weakmap.get(o));//undefined

  /* 以下属性或方法WeakMap均不支持 */
  console.log(weakmap.size);//undefined
//   weakmap.clear();//报错
//   weakmap.forEach(()=>{});//报错
//    weakmap.keys();//报错
    // weakmap.values();//报错
})()