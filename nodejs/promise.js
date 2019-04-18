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
/* f对应fs.readFile异步操作
   当读取文件成功时，将then回调函数加入作业队列；
   读取文件失败时，将catch回调函数加入作业队列 */
f.then((data) => {
  console.log(data)
}).catch((err) => {
  console.log(err)
})