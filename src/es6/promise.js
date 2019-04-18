(()=>{
  /* promise构造函数 */
  let promise = new Promise((resolved, rejected) => {
    console.log(resolved);
  });
  /* promie.resolve */
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
  /* 依次输出 1 2.5 2 3 */
})()