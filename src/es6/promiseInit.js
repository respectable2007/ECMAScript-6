(() => {
  function MyPromise (fn) {
    this.deferreds = [];
    this.state = 0;
    this.value = null;
    let _this = this;//0:pending,1:fulfilled,2:rejected
    function resolve(return_value) {
      if(return_value && (typeof return_value === 'object' || typeof return_value === 'function')) {
        const then = return_value.then;
        if(typeof then === 'function') {
          then.call(return_value, resolve);
          return;
        }
      }
      _this.state = 1;
      _this.value = return_value;
      /* 若异步操作，跳过异步操作，会先调用then方法（resolve未触发），setTimeout函数保证resolve触发后，
         then注册函数顺序执行 */
      setTimeout(() => {
        _this.deferreds.forEach((deferred) => {
          deferred(_this.value);
        })
      }, 0)
    }
    fn(resolve);
  }
  MyPromise.prototype.then = function(deferred) {
    if(this.state === 0) {
      this.deferreds.push(deferred);
      return;
    }
    let _this = this;
    function handle(resolve) {
      const ret = deferred(_this.value);
      /* 上一个then注册函数的返回值，做为其新生成Promise对象的resolve传参 */
      resolve(ret);
    }
    return new MyPromise((resolve) => {
      handle(resolve);
    })
    
  }
  let myPromise = new MyPromise((resolve, reject) => {
    /* do async something */
    resolve('开始洗衣服')
  })
  
  myPromise.then((data) => {
    console.log(data);
    return new MyPromise((resolve,reject) => {
      resolve('衣服洗完了');
    })
  }).then((data) => {
    console.log(data);
    return '衣服晾完了'
  })
})()