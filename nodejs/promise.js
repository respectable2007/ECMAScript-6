const fs = require('fs');
function readFile(txt) {
  return new Promise(function(resolve,reject) {
    fs.readFile(txt, function(err, data) {
        if(err) {
          reject(err);
          return;
        }
        console.log(data);
        resolve(data);
    });
  })
}

let f = readFile('../nodejs/txt/sample.txt');
/* f对应fs.readFile异步操作，根据文件读取状态，
   将resolve或reject添加到作业队列中。
   调用resolve触发一个异步操作，根据这个异步操作
   的状态，将then或catch的回调函数添加到作业队列
   中
*/
f.then((data) => {
  console.log(data)
}).catch((err) => {
  console.log(err)
})