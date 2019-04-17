import { readFile } from 'fs';
(()=>{
  /* promise构造函数 */
  let promise = new Promise((resolved, rejected) => {
    console.log(resolved);
  });
  let p1 = readFile('../src/txt/sample.txt');

})()