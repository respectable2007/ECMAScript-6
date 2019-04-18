const fs = require('fs');
function readFile(txt) {
  return new Promise(function(resolve,reject) {
    console.log(1);
    fs.readFile(txt);
  })
}

let f = readFile('txt/sample.txt');
console.log(2)