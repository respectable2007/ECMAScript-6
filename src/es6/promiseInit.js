((global, factory) => {
  // UmD
  if(typeof define === 'function' && define.amd) {
    // AMD
    define(['util'], (_) => {
      return factory(global, _);
    })
  } else if(typeof module === 'object' && typeof module.exports === 'object') {
    // node/commonJS
    module.exports = factory(global, require('util'), true);
  } else {
    factory(global, global._)
  }
})(typeof window !== 'undefined' ? window : this, (global, _, noGlobal) => {
   if(noGlobal !== true) {
     global.MyPromise = MyPromise;
   }
   let deferreds = [],
       rejects = [],
       state = 0,//0:pending,1:fulfilled,2:rejected
       value = null;
   function MyPromise (fn) {
    state = 0;
    function resolve(return_value) {
      if(state !== 0) {
        return;
      }
      if(return_value && (typeof return_value === 'object' || typeof return_value === 'function')) {
        const then = return_value.then;
        if(typeof then === 'function') {
          then.call(return_value, resolve);
          return;
        }
      }
      state = 1;
      value = return_value;
      /* 若异步操作，跳过异步操作，会先调用then方法（resolve未触发），setTimeout函数保证resolve触发后，
         then注册函数顺序执行 */
      setTimeout(() => {
        deferreds.forEach((deferred) => {
          deferred(value);
        })
      }, 0)
    }
    function reject(_value) {
      if(state !== 0) {
        return;
      }
      if(_value && (typeof _value === 'object' || typeof _value === 'function')) {
        const catches = _value.catch;
        if(typeof catches === 'function') {
          catches.call(_value, reject);
          return;
        }
      }
      value = _value;
      state = 2;
      setTimeout(() => {
        rejects.forEach(reject => {
          reject(value);
        })
      },0)
    }
    fn(resolve, reject);
  }
  MyPromise.prototype.then = function(deferred) {
    if(state === 0) {
      deferreds.push(deferred);
      return;
    }
    function handle(resolve) {
      const ret = deferred(value);
      /* 上一个then注册函数的返回值，做为其新生成Promise对象的resolve传参 */
      resolve(ret);
    }
    return new MyPromise((resolve) => {
      handle(resolve);
    })
    
  }
  MyPromise.prototype.catch = function(fail) {
    if( state === 0) {
      rejects.push(fail);
      return;
    }
    let that = this;
    function handle(resolve,reject) {
      const ret = fail(value);
        reject(ret);
    }
    return new MyPromise((resolve, reject) => {
      handle(resolve,reject);
    });
  }
})
let myPromise = new MyPromise((resolve, reject) => {
  reject('begin');
})
myPromise.then((data) => {
  console.log(data)
  return new MyPromise((resolve,reject) => {
    reject('error');
  })  
}).catch( e => {
  console.log(e)
})
/* 当第一个Promise为reject时，then方法被触发，而不是直接调用catch？？？ */