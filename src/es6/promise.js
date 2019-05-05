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

  /* 全局处理rejected的Promise */
  let rejectPromiseList = new Map();
  window.addEventListener('unhandledrejection', function(e){
    console.log(e);
    rejectPromiseList.set(e.promise, e.reason);
  }, false)
  window.addEventListener('rejectionhandled',function(e) {
    rejectPromiseList.delete(e.promise);
  },false)
  setInterval(() => {
    rejectPromiseList.forEach(function(value,key) {
      console.log(value.message ? value.message: value)
      handleRejection(key, value);
    })
    rejectPromiseList.clear();
  },6000);
  function handleRejection(promise) {
    promise.catch((reason) => {
      console.log(reason);
    })
  }
//   let r = Promise.reject(42);
  /* Promise链的返回值 */
  let p1 = new Promise((resolve, reject) => {
    resolve(43);
  })
  p1.then((v) => {
    console.log(v);//43
    /* 基本类型数值，传递给下一个Promise的完成处理或拒绝处理函数 */
    return v + 2;
  }).then((v) => {
    console.log(v);//45
  })
  /* Promise返回值为Promise对象 */
  let p2 = new Promise((resolve, reject) => {
    resolve('p2')
  }),
  p3 = new Promise((resolve, reject) => {
    resolve('p3')
  });
  p2.then((v) => {
    console.log(v);//p2
    return p3;
    /* 下方then方法挂载在p2.then方法返回的Promise对象，
       该对象的状态与p3异步执行结果有关，若状态为rejected，
       则调用该对象的被拒绝处理函数
    */
  }).then((v) => {
    console.log(v);//p3
  })
  /* 监听多个Promise的方法：
     Promise.all,所有Promise都被执行完毕，该方法返回的Promise对象完成处理函数才被调用,
     任意一个Promise被拒绝，则返回的Promise对象立即调用被拒绝处理函数。
     Promise.race，任意一个Promise被执行完毕，该方法返回的Promise对象完成处理函数才被调用
  */
  /* let p4 = new Promise((resolve,reject) => {
    reject('p4');
  })
  jP1 = Promise.all([p2, p3, p4]);
  jP1.then((v) => {
    console.log(Array.isArray(v));//true
    console.log(v);//['p2', 'p3']
  }).catch((v) => {
    console.log(Array.isArray(v));//false
    console.log(v);//'p4'
  })
  let jP2 = Promise.race([p4, p2, p3]);
  jP2.then((v) => {
    console.log(v);//'p2'
  }) */



  /* 问题1：如何解决多个promise的嵌套问题？
     答：使用Promise.all解决promise嵌套
  */
  let userName = '';
  function getUserName(){
    return new Promise((resolve) => {
      userName = 'juanjuan';
      resolve('juanjuan');
    })
  }
  function getUser(){
    return new Promise((resolve, reject) => {
      if(userName) {
        resolve({
          id: 1,
          userName: userName
        })
      }
      reject('error');
    })
  }
  function getUserPromise(...arrs){
    return Promise.all([...arrs]);
  }
  getUserPromise(getUserName(), getUser()).then((v) => {
    console.log(v);
  }).catch((error) => {
    console.log(error);
  })
  let myPromise = new Promise((resolve, reject) => {
    // console.log('开始洗衣服。。。');
    resolve('衣服洗完了');
    // reject('洗衣机出故障了');
  })
  
  /* setTimeout(() => {
    myPromise.then((data) => {
      console.log(data);
      console.log('开始晾衣服了');
      return new MyPromise((resolve) => {
        resolve('衣服晾好了');
      });
    }).then((v) => {
      console.log(v);
      console.log('等衣服干。。。');
      return '衣服干了';
    }).then((v) => {
        console.log(v);
        console.log('开始收衣服。。。')
    })
  },1000) */
  let myPromise2 = myPromise.catch((e) => {
    // console.log(e);
    return '晾衣杆修好了';
})

myPromise2.then(d => {
    console.log(d)
})
console.log(Object.is(myPromise, myPromise2));
/* sleep函数，在指定的时间后线程被唤醒 */
function sleep(s) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, s)
  })
}
sleep(1000).then(() => {
  console.log(2000);
})
})()