(function(){
  /* var */
  /* var message = 100;
  var message = 101;
  console.log(message); */
  /* var声明同一个标识符，不会报错 */

  //   var fns = []
  /* for(var i = 0; i < 10; i++) {
    fns.push(function(){
      console.log(i)
    })
  }
  fns.forEach(function(item) {
    item();
  }) */
  /* 因变量提升，i共享，为10，循环输出10 */
  
  /* for(var i = 0; i < 10; i++) {
    fns.push((function(i) {
      return function() {
        console.log(i);
      }
    })(i));
  }
  fns.forEach(function(item) {
    item(); 
  }) */
  /* 使用立即调用函数+闭包来改进，循环输出0-9 */

  /* let */
 /*  var message = 100;
  let message = 1000;
  console.log(message); */
  /* 在同一个作用域中，重复声明同一个标识符，报错 */
  /* var message = 100;
  if(message) {
    let message = 1000;
    console.log(message);
  } */
  /* 在另一个作用域中，声明同一个标识符，不会报错 */
  
  /* let fns = [];
  for(let i = 0; i < 10; i++) {
    fns.push(function() {
      console.log(i);
    })
  }
  fns.forEach(function(item) {
    item();
  }) */
  /* let在每次迭代中，会生成一个同名变量并被初始化，循环输出0-9 */

  /* const */
  /* var message = 100;
  const message = 1000;
  console.log(message) */
  /* 同一个作用域下，声明同一个标识符，会报错 */
  /* const message; */
  /* 声明const变量，但未初始化，会报错 */
  /* const message = 100;
  message = 1000; */
  /* 声明const变量，且初始化后，对该变量重新赋值，会报错 */

 /*  let fns = [];
  for(const i = 0; i < 10; i++){
    fns.push(function() {
      console.log(i);
    })
  } */
  /* const声明i，在第二次迭代时，会试图修改i的值，会报错 */
  const fns = [];
  const obj = {
    a: true,
    b: false,
    c: 1
  }
  for(const key in obj) {
    fns.push(function() {
      console.log(key)
    })
  }
  /* const声明key，创建了一个新的变量绑定对象的属性名，不会报错 */
})();