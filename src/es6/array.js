import { type } from "os";

(() => {
  "use strict";
  /* Array.of，创建数组，传入数值型参数，不会成为数组的长度值 */
  let a1 = Array.of(1, '2');
  console.log(a1.length);//1

  /* Array.from，可将可迭代对象或类数组对象转为数组 */
  /* 类数组对象 */
  let o = {
    v: 3,
    cal(value) {
      return this.v * value;
    }
  },
  o1 = {
    *[Symbol.iterator]() {
      yield 1;
      yield 2;
      yield 3;
    }
  };
  function translate() {
    return Array.from(arguments, o.cal, o);
  }
  console.log(translate(1, 2, 3));//[3,6,9]
  console.log(Array.from(o1));//[1,2,3]

  /* 数组新方法 */
  let numbers = [1,2,3,4,5,6,7,8];
  let j = numbers.forEach((i) => {
    return i > 2;
  })
  console.log(j);
  console.log(numbers);
  /* find findIndex */
  console.log(numbers.find(v => v > 3));//4
  console.log(numbers.findIndex(v => v > 3));//3
  /* fill */
  /* 只有一个参数，则填充数组所有项 */
  // console.log(numbers.fill(9));//[9,9,9,9,9,9,9,9]
  /* 可选择要填充数组的位置,不替换指定的结束位置 */
  //console.log(numbers.fill('x',3,5));//[1,2,3,'x','x',6,7,8]
  /* copyWithin */
  /* 接收2个参数，从哪个位置开始修改，从哪个位置开始复制 */
  //console.log(numbers.copyWithin(4,0));//[1,2,3,4,1,2,3,4]
  /* 接收3个参数，从哪个位置开始修改，从哪个位置开始复制，从哪个位置结束复制（不包括结束位置） */
  console.log(numbers.copyWithin(4,0,2));//[1,2,3,4,1,2,7,8]

  /* 类型化数组 */
  /* 数组缓冲区 */
  let buf = new ArrayBuffer(12);
  console.log(buf.byteLength);//12
  let buf1 = buf.slice(4,6);
  console.log(buf1.byteLength);//2
  /* 读取与写入数据 */
  let b1 = new ArrayBuffer(1),
      d = new DataView(b1, 0, 1);
  d.setInt8(0, 6);
  console.log(d.getInt8(0));//8
  //console.log(d.getInt16(0));//报错不满足16位
  d.setInt8(0, 256);
  console.log(d.getInt8(0));//0
  /* 类型化数组特定类型构造器 */
  /* 创建特定类型的类型化数组，创建方式1：数组缓冲区 */
  let u = new Int8Array(b1);
  /* 元素大小 */
  console.log(Int8Array.BYTES_PER_ELEMENT);//1
  console.log(u.BYTES_PER_ELEMENT);//1
  /* 创建特定类型的类型化数组，创建方式2：类型化数组构造器+单个数值参数 */
  let u1 = new Int8Array(2),
      u2 = new Int16Array(2);
  console.log(u1.length);//2个元素
  console.log(u1.byteLength);//2个字节
  console.log(u2.length);//2个元素
  console.log(u2.byteLength);//4个字节
  /* 创建特定类型的类型化数组，创建方式3：类型化数组构造器+对象参数
  对象参数有类型化数组、可迭代对象、数组、类数组对象 */
  u1[0] = 256;
  console.log(u1[0]);//超出范围，处理后，结果为0
  u[1] = 2;
  let u3 = new Uint16Array(u1),
      u4 = new Int8Array([19,20]),
      u5 = new Int8Array({
        0:21,
        1:22,
        length:2
      });
  console.log(u3.byteLength);//4
  console.log(u3[0]);//0，u3存储的是u1处理后的数据
  console.log(u4[0]);//19
  console.log(u5[0]);//21
  console.log(u5.length);//2
  /* 类型化数组length是不可写入的，松散模式下，被忽略，严格模式下报错 */
  // u5.length = 10;//报错
  /* 类型化数组迭代器 */
  for(let i of u5.entries()){
    console.log(i);//依次输出[0,21] [1,22]
  }
 let arr = [...u5];
 console.log(arr instanceof Array);//true
 console.log(arr);//[21, 22]
 /* 类型化数组of与from方法 */
 let u6 = Int8Array.of(23,24,25),
     u7 = Int8Array.from([26,27,28]);
 console.log(typeof u6);//object
 console.log(u6 instanceof Int8Array);//true
 console.log(u7 instanceof Int8Array);//true

 /* 类型化数组不能伸展或收缩，其length是固定的 */
 u7[3] = 29;
 console.log(u7[3]);//undefined

 /* 类型化数组会对传入的值类型进行检验，若不符合则转为0 */
 let u8 = u7.map(v => 'h');
 /* 在map方法中，返回的为字符串，与类型化数组允许的类型不符合，则转为0。 */
 console.log(u8);//Int8Array(3) [0, 0, 0]

 /* set，从一个数组的元素赋值给新的类型化数组 */
})()