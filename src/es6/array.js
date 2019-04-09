(() => {
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
})()