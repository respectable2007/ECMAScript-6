(()=> {
  /* 问题2：Promise的底层实现 */
  function MyPromise(fn) {
    let missions = [],
        value = null,
        fails = [],
        state = 'Pending';//Promise状态
    fn(resolve, reject);
    /* resolve函数 */
    function resolve(_return_value) {
      if(state === 'Rejected') {
        return;
      }
      value = _return_value;
      state = 'Fulfilled';
      console.log(0);
      /* 异步操作 */
      setTimeout(() => {
        missions.forEach(mission => {
          mission(value);
        })
      },0);
    }
    let next_resolve = null,
        next_reject = null;
     /* then方法 */
    this.then = function(mission) {
      /* 保存当前的resolve，保证状态正确 */
      function fn(resolve, reject) {
        next_resolve = resolve;
        next_reject = reject;
        /* if( state === 'Pending') {
          missions.push(mission);
        } */
        if( state === 'Fulfilled') {
          /* then方法回调函数的返回值 */
          let result = mission(value);
          /* 返回thenable对象 */
          if((Object.prototype.toString.call(result) === '[object Function]' || Object.prototype.toString.call(result) === '[object Object]') && 'then' in result){
            if(Object.prototype.toString.call(result['then']) === '[object Function]') {
              result.then(next_resolve);
            }
          } else {
            next_resolve(result);
          }
        } else {
            reject(value);
        }
      }
      /* then方法返回新的Promise对象 */
      return new MyPromise(fn);
    }
    /* reject函数 */
    function reject(_error) {
      if(state === 'Fulfilled') {
        return;
      }
      value = _error;
      state = 'Rejected';
      setTimeout(() => {
        fails.forEach(fail => {
          fail(value);
        })
      },0)
    }
    /* catch方法 */
    this.catch = function(fail) {
      /* 保存当前的resolve，保证状态正确 */
      function fn(resolve, reject) {
        next_resolve = resolve;
        next_reject = reject;
        if(state === 'Pending') {
          fails.push(fail);
        }
        if(state === 'Rejected') {
          const result = fail(value);
          if((Object.prototype.toString.call(result) === '[object Function]' || Object.prototype.toString.call(result) === '[object Object]') && 'then' in result){
            if(Object.prototype.toString.call(result['then']) === '[object Function]') {
              result.catch(next_reject);
            }
          } else {
            next_reject(result);
          }
        }
      }
      return new MyPromise(fn);
    }
  }
  let myPromise = new MyPromise((resolve, reject) => {
    console.log('开始洗衣服。。。');
    resolve('洗衣服完了');
    // reject('洗衣机出故障了');
  })
  
  myPromise.then((data) => { 
    console.log(data);
    console.log('开始晾衣服了');
    return new MyPromise((resolve,reject) => {
      reject('晾衣杆坏了');
    });
  }).catch((e) => {
    console.log(e);
    console.log('晾衣杆修好了');
  })
})();