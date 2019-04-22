(()=> {
  /* 问题2：Promise的底层实现 */
  function MyPromise(fn) {
    let missions = [],
        value = null,
        fails = [],
        reason = null,
        state = 'Pending';//Promise状态
    fn(resolve, reject);
    /* resolve函数 */
    function resolve(_return_value) {
      if(state === 'Rejected') {
        return;
      }
      value = _return_value;
      state = 'Fulfilled';
      /* 异步操作 */
      setTimeout(() => {
        missions.forEach(mission => {
          mission(value);
        })
      },0);
    }
     /* then方法 */
    this.then = function(mission) {
      /* 保存当前的resolve，保证状态正确 */
      var next_resolve = null;
      function fn(resolve) {
        next_resolve = resolve;
        if( state === 'Pending') {
          missions.push(mission);
        }
        if( state === 'Fulfilled') {
          let result = mission(value);
          /* 返回thenable对象 */
          if((Object.prototype.toString.call(result) === '[object Function]' || Object.prototype.toString.call(result) === '[object Object]') && 'then' in result){
            if(Object.prototype.toString.call(result['then']) === '[object Function]') {
              result.then(next_resolve);
            }
          } else {
            next_resolve(result);
          }
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
          fail(reason);
        })
      })
    }
    /* catch方法 */
    this.catch = function(fail) {
      /* 保存当前的resolve，保证状态正确 */
      let next_resolve = null;
      function fn(resolve) {
        next_resolve = resolve;
        if(state === 'Rejected') {
          const result = fail(value);
          if((Object.prototype.toString.call(result) === '[object Function]' || Object.prototype.toString.call(result) === '[object Object]') && 'then' in result){
            if(Object.prototype.toString.call(result['then']) === '[object Function]') {
              result.then(next_resolve);
            }
          } else {
            next_resolve(result);
          }
        }
      }
      return new MyPromise(fn);
    }
  }
  MyPromise.prototype.then = function(fn) {

  }
  MyPromise.prototype.catch = function(fn) {
  }
  let myPromise = new MyPromise((resolve, reject) => {
    console.log('开始洗衣服。。。');
    resolve('洗衣服完了');
    reject('洗衣机出故障了');
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
  myPromise.then((v) => {
    console.log(v)
  }).catch((e) => {
    console.log(e);
    return '洗衣机修好了';
  })
})();