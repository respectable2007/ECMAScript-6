((doc) => {
  /* 方括号表示法是基于码元工作，因此不能正确访问双码元字符 */
  let message = '𠮷 B';
  console.log(message[0]);
  console.log(message[1]);
  /* 字符串默认的迭代器是基于字符而不是码元，配合for-of循环，
     可能会得到更理想的结果 */
  for(let i of message) {
    console.log(i);//依次输出'𠮷' ' ' 'B'
  }
  let divs = doc.getElementsByTagName('div');
  for(let i of divs) {
    /* 依次输出：
       <div class="div1"></div>
       <div class="div2"></div>
       <div class="div3"></div>
       <div class="div4"></div>
    */
    console.log(i);
  }
  /* 扩展运算符（...）,可将任意可迭代对象转为数组 */
  /* 字符串 */
  let ss = [...message];
  console.log(ss);//['𠮷',' ','B']
  /* NodeList */
  let ns = [...divs];//
  console.log(ns);//[div.div1, div.div2, div.div3, div.div4]
  /* 可在数组字面量中任意使用扩展运算符 */
  let sn = [1, ...message, ...divs];
  console.log(sn);//[0, '𠮷', ' ', 'B', div.div1, div.div2, div.div3, div.div4]
})(document)