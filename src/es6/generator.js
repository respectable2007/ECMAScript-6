(() => {
  /* 生成器 */
  function *createIterator(items) {
    yield 1;
    yield 2;
    yield 3;
  }
  let i = createIterator(['a', 'b', 'c']);
  console.log(i.next());//{value:1,done:false}
  console.log(i.next());//{value:2,done:false}
  console.log(i.next());//{value:3,done:false}
  console.log(i.next());//{value:undefined,done:false}

  /* yield，当执行完yield语句后，会停止执行代码，
     直到再次调用next方法后，继续执行代码（不是从头执行） */
 /* 生成器表达式 */
 let a = function *(items) {
   for(let i = 0, lens = items.length; i < lens; i++) {
      yield items[i];
   }
 },
 b = a(['a', 'b', 'c']);
 console.log(b.next());//{value:'a',done:false}
 console.log(b.next());//{value:'b',done:false}
 console.log(b.next());//{value:'c',done:false}
 console.log(b.next());//{value:undefined,done:false}

 /* 生成器是个函数，也可以添加到对象上(ES6速写法) */
 let obj = {
   *createIterator(items) {
      for(let i = 0, lens = items.length; i < lens; i++) {
        yield items[i];
      }
   }
 },
 objIterator = obj.createIterator(['e', 'f', 'g']);
 console.log(objIterator.next());//{value:'e',done:false}
 console.log(objIterator.next());//{value:'f',done:false}
 console.log(objIterator.next());//{value:'g',done:false}
 console.log(objIterator.next());//{value:undefined,done:false}

 /* for-of，迭代可迭代对象（ES6中包含数组、Map、Set） */
 let arr = [ '!', '@', '#', '$'];
 for(let i of arr) {
   console.log(i);//依次输出'!' '@' '#' '$'
 }
 /* 可使用Symbol.iterator检测是否为可迭代对象 */
 console.log(typeof arr[Symbol.iterator] === 'function');//true
 /* 创建可迭代对象 */
 let o = {
   a: 'a',
   b: 'b',
   c: 'c',
   *[Symbol.iterator]() {
      for(let i in this) {
        yield i;
      }
   }
 };
 for(let i of o) {
   console.log(i);//依次输出'a' 'b' 'c'
 }

 /* 内置迭代器-集合迭代器 */
 /* entries()，返回一个包含键值对的迭代器，也返回一个可迭代对象*/
 console.log(arr.entries());
 console.log(typeof arr.entries()[Symbol.iterator] === 'function');
 /* for-of调用arr.entries[Symbol.iterator]()创建的迭代器，Set数组两项相同*/
 for(let i of arr.entries()) {
   console.log(i);//依次输出[0, "!"] [1, "@"] [2, "#"] [3, "$"]
 }
 /* values(),返回一个包含集合内的值的迭代器 */
 for(let i of arr.values()){
  console.log(i);//依次输出'!' '@' '#' '$'
 }
 /* keys(),返回一个包含集合内的键的迭代器，Set的话，values和keys迭代器相同*/
 for(let i of arr.keys()){
    console.log(i);//依次输出'0' '1' '2' '3'
 }
})()