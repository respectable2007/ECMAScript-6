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
})()