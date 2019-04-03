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
})()