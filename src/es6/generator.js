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
 /* 集合类型默认迭代器，数组和Set是values，Map是entries */
 let ar = ['a', 'b', 'c'],
     sr = new Set(ar),
     mr = new Map([[0, 'a'], [1, 'b'],[2, 'c']]);
 for(let i of ar) {
   console.log(i);//依次输出'a' 'b' 'c'
 }
 for(let i of sr) {
   console.log(i);//依次输出'a' 'b' 'c'
 }
 mr.set(3, 'd');
 for(let i of mr) {
   console.log(i);//依次输出[0, 'a'] [1, 'b'] [2,'c'] [3, 'd']
 }
 /* 迭代器的高级用法 */
 /* 给next方法传入参数 */
 function *advanceIterator() {
   try {
     for(let i = 0; i < 8; i++) {
       yield i;
     }
   } catch(ex) {
     let s = 'ex';
     yield s + 3;
   }
 }
 let iterator = advanceIterator();
 /* 正常运行迭代器 */
 console.log(iterator.next());//{value:1,done:false}
 console.log(iterator.next(1));//{value:3,done:false}
 console.log(iterator.next(2));//{value:5,done:false}
 console.log(iterator.next(3));//{value:undefined,done:false}

  /* 包含错误运行迭代器 */
  console.log(iterator.next());//{value:undefined,done:false}
  console.log(iterator.next(1));//{value:undefined,done:false}
  console.log(iterator.throw(new Error('error')));//抛出异常
  console.log(iterator.next(3));//{value:undefined,done:true}

  /* 生成器内return */
  function *returnIterator() {
    yield 1;
    return 'a';
    yield 2;//永远不会被执行
  }
  let rIterator = returnIterator();
  console.log(rIterator.next());//{value:1,done:false}
  console.log(rIterator.next());//{value:'a',done:true}
  console.log(typeof rIterator[Symbol.iterator] === 'function');//true
  /* 以下代码，rIterator虽然为可迭代对象，但是，其内部已经执行到return语句，
    之后的yield语句不会被执行。所以，不会有输出，若将以上两条next方法注释掉。
    会只输出1，而不会输出'a' */
  for(let i of rIterator) {
    console.log(i);//无输出
  }

  /* yield*语句 */
  function *h() {
    yield 'Hello';
    return 'Hello';
  }
  function *j() {
    yield 1;
    let res = yield *h();
    yield res + ' World!';
  }
  let yIterator = j();
  console.log(yIterator.next());//{value:1,done:false}
  console.log(yIterator.next());//{value:'Hello',done:false}
  console.log(yIterator.next());//{value:'Hello World!',done:false}
  console.log(yIterator.next());//{value:undefined,done:true}
  /* 任何具有[Symbol.iterator]符号函数的数据都可以使用yield*进行迭代 */
  let yy = (function *() {
    yield 'x';
    yield * 'abcdefg';
  }())
  console.log(yy.next().value);//x
  console.log(yy.next().value);//a

  /* 生成器与异步编程 */
  
})()