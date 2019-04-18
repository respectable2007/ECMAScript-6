(()=>{
  /* promise构造函数 */
  let promise = new Promise((resolve, reject) => {
    console.log(resolve);
  });
  /* Promise构造函数抛出错误 */
  let p = new Promise((resolve, reject) => {
    console.log(0);
    throw new Error('Error');
  })
  p.catch((e) => {
    console.log(e.message);//Error
  })
  /* promie.resolve() */
  /* setTimout会在下次事件循环时，被执行 */
  setTimeout(()=>{
    console.log(3);
  },0)
  /* Promise.resolve会在本次事件循环结束时，被执行 */
  new Promise((resolve) => {
    resolve()
  }).then(()=>{
    console.log(2.5);
  })
  Promise.resolve().then(()=>{
    console.log(2);
  })
  console.log(1);
  /* 以上依次输出 1 'Error' 2.5 2 3 */
  
  /* Promise.resolve(thenable) */
  const thenable0 = {
    then(resolve,reject) {
      resolve('settled');
      reject('error');
    }
  }
  /* 参数是thenable对象，
     thenable对象状态确定，其then方法立即执行，调用resolve
     方法；
     确定Promise.resolve实例对象的状态，
     thenable的resolve参数传递给then回调函数。
     也就是说返回的Promise实例对象的状态，取决于thenable对
     像then方法操作状态，若resolve在前，则执行then回调函数，
     反之，则执行catch回调函数。
  */
  Promise.resolve(thenable0)
  .then((value) => {
    console.log(value);
  }).catch((e) => {
    console.log(e);
  })
  /* promie.reject() */
  const thenable = {
    then(resolve,reject) {
      reject('error');
    }
  }
  /* Promise.reject会在本次事件循环结束时，被执行 */
  Promise.reject(thenable).catch((e) => {
    console.log(e)
  })
  /* 依次输出 1 'Error' 2.5 2 theable对象 'settled' 3 */
  /* 异步操作谁最早结束，就将回调函数加入消息队列中 */
})()