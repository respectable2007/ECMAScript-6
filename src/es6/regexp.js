(function(){
  /*y标志
    pattern总是返回包含第一个匹配项的数组；
    gPattern，全局模式，一直搜索匹配项并返回，直到字符串末尾为止；
    yPattern，y标志，从lastIndex位置开始搜索匹配项，匹配成功返回含有匹配项的数组，不成功终止搜索，返回null。
  */
  let text = 'hello1 hello2 hello3',
      pattern = /hello\d\s/,
      gPattern = /hello\d\s/g,
      yPattern = /hello\d\s/y;
  console.log(pattern.exec(text));//['hello1 ']
  console.log(gPattern.exec(text));//['hello1 ']
  console.log(yPattern.exec(text));//['hello1 ']
  console.log('--------');
  console.log(pattern.lastIndex);//0
  console.log(gPattern.lastIndex);//7，匹配成功后，lastIndex是匹配结果之后的那个字符的索引值
  console.log(yPattern.lastIndex);//7,匹配成功后，lastIndex是匹配结果之后的那个字符的索引值
  console.log('--------');
  pattern.lastIndex = 1;
  gPattern.lastIndex = 1;
  yPattern.lastIndex = 1;
  console.log('********');
  console.log(pattern.exec(text));//['hello1 ']
  console.log(gPattern.exec(text));//['hello2 ']
  console.log(yPattern.exec(text));//null
  console.log('********');
  
  /*复制正则表达式,可设置正则表达式构造器第二个参数，并覆盖被复制表达式的标志*/
  let rel = /\.js$/g,
      rel1 = new RegExp(rel, 'i');
  console.log(rel.toString());
  console.log(rel1.toString());
})();