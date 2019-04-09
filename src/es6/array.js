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
})()