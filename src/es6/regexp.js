(function(){
  /*pattern总是返回包含第一个匹配项的数组；
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
  console.log(gPattern.lastIndex);//7，匹配第一次后，lastIndex发生变化，变为第一个匹配项+1的位置
  console.log(yPattern.lastIndex);//7
  console.log('--------');
  pattern.lastIndex = 1;
  gPattern.lastIndex = 1;
  yPattern.lastIndex = 1;
  console.log('********');
  console.log(pattern.exec(text));//['hello1 ']
  console.log(gPattern.exec(text));//['hello2 ']
  console.log(yPattern.exec(text));//null
  console.log('********');
})();