(() => {
  /* 整个Set */
  /* 创建Set */
  let arr = [1, 2, 3, 3, 3, 4, 5],
      obj = {
        0: 6,
        1: 7,
        length: 2
      },
      set1 = new Set(arr);
    //   set2 = new Set(obj);//报错，obj不是一个iterable对象
  console.log(set1);//Set{1,2,3,4,5}，去除重复项
  /* add,添加项 */
  set1.add('6');
  console.log(set1);//Set{1,2,3,4,5,'6'}，去除重复项
  /* set.size */
  console.log(set1.size);//6
  /* set.has,检测是否存在某一项 */
  console.log(set1.has(5));//true
  console.log(set1.has('5'));//false
  /* set.delete,删除某一项 */
  set1.delete('5');//‘5’不在set1中，因此，不影响set1
  set1.delete(5);
  console.log(set1.size);//5
  /* forEach,遍历set */
  set1.forEach((key, value, set) => {
    console.log(key + ':' + value);
    console.log(Object.is(set1, set));
  })
  /* set.clear,清除set集合 */
  set1.clear();
  console.log(set1.size);//0

  /* 在Set中，+0和-0是相同的 */
  set1.add(+0);
  set1.add(-0);
  console.log(set1.size);//1
  
  /* set转数组,可建立无重复值数组 */
  let set2Array = [...set1];
  console.log(set2Array);//[0]

  /* Set与对象 */
  set1.add(obj);
  obj = null;//obj的引用解除，此时对之前对象的引用只剩set1对他的引用，但在set1中并未对这个对象的解除引用
  console.log(set1);//{0,{0::6,1:7,length:2}}
})()