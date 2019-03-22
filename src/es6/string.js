(function() {
  "use strict";
   /* var text = "";
   console.log(text.length);
   console.log(/^.$/.test(text));
   console.log(text.charAt(0));
   console.log(text.charAt(1));
   console.log(text.charCodeAt(0));
   console.log(text.charCodeAt(1)); */
   /* 𠮷不是BMP字符，占2个码元，32位 */
   var text = "𠮷";
   console.log(text.length);//2
   console.log(text.charCodeAt(0));//55362
   console.log(text.charCodeAt(1));//57271
   console.log(text.codePointAt(0));//134071，返回𠮷的完整的十进制代码点
   console.log(text.codePointAt(1));//57271，𠮷的第二个码元charCodeAt与codePointAt返回值相同
   console.log(text.match(/[\s\S]/gu));//["𠮷"]
   /* includes startsWith  endsWith*/
   let string = 'Hello World!';
   console.log(string.includes('lo'));//true
   console.log(string.includes('lo', 5));//false
   console.log(string.startsWith('h'));//false
   console.log(string.startsWith('h', 2));//false
   console.log(string.endsWith('d'));//false
   console.log(string.endsWith('o', 5));//true
   /* 模板字面量 */
   /* 双或单引号包裹的字符串，在js中直接换行会报错 */
   /* ES5通过\实现多行字符串，\为续接功能。字符串内添加\n实现换行。
   一般采用数组或字符串拼接实现多行字符串 */
   let template = 'string \n\
   a';
   console.log(template);//不建议这种方式
   /* ES5数组实现多行换行字符串 */
   let template1 = ['Hello ',
   'World!'].join('\n');
   console.log(template1);
   /* ES5字符串实现多行换行字符串 */
   let template2 = 'Hello \n'
   + 'World!';
   console.log(template2);
   /* ES6可使用模板字面量实现多行字符串、添加变量、标签化字符串 */
   /* 多行字符串 */
   let template3 = `Hello
World!`;
   console.log(template3.length);
   /* 替换位 */
   /* 模板标签函数，literals为类数组对象，数组是模板字面量被替换位分隔的字符串数组，
   length是数组长度，raw属性是数组，包含对应索引位字符串原始值；
   substitutions代表各个替换位最终值*/
   function tag(literals,...substitutions) {
      let result = '',
          lens = substitutions.length;
      for(let i = 0; i < lens; i++) {
      //  result += literals.raw[i];
       result += literals[i];
       result += substitutions[i];
      }
      result += literals[lens];
      return result;
   }
   let name = 'juanjuan',
       msg = `beautiful`,
       a = 10,
       b = 20,
       template4 = `Hello, ${name}!`,
       template5 = `This is a ${msg} world!`,
       template6 = `Double ${getMsg()}`,
       template7 = `The answer is ${a + b}`,
       /* 标签化模板 */
       template8 = tag`The answer is ${a * b}.`;
   function getMsg() {
     return 'Kill'
   }
   console.log(template4);
   console.log(template5);
   console.log(template6);
   console.log(template7);
   console.log(template8);
  
})()