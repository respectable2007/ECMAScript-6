(() => {
  "use strict";
  /* 对象解构 */
  let node = {
    type: 'click',
    name: 'target'
  },
  node1 = {
    type: 'move',
    name: 'mouse'
  },
  node2 = {
    type2: 'moveover',
    name2: 'mouse'
  },
  /* 默认值 */
  { type, name, value = '1'} = node;
  console.log(type); //click
  console.log(name); //target
  /* 使用解构声明变量，且当未查找到相同的属性名，则该变量为undefined，
  当设有默认值时，其值是默认值 */
  console.log(value); //1

   /* let同名报错 */
   /* let { type, name} = node; */
  
   /* 花括号被解析为代码块，而代码块不能被赋值，因此，报错 */
   /* { typpe, name} = node1; */

   /* 使用解构赋值已声明的变量 */
   /*  ({ type, name} = node1);
   console.log(type); //move
   console.log(name); //mouse */
   
   /* 解构表达式最终是=右侧的值 */
   function outPut(value) {
      console.log(value === node1);//true
   }
   /* 使用解构给type和name重写赋值，
      其解构表达式最终结果是node1，
      并被传入outPut函数内 */
   outPut({type, name} = node1);
   console.log(type);//move
   console.log(name);//mouse

   /* 若重新赋值解构时，新添加了一个变量，此时，会报错 */
   /* ({ type, name, value, value1 } = node2);
   console.log(type); //moveover
   console.log(name); //mouse
   console.log(value);//undefined
   console.log(value1);//报错，因为变量未声明 */

   /* 赋值给与属性名不同的变量名 */
   //({ type: localType, name: localName} = node2);//报错，因为localType、localName未声明

   /* 解构表达式中，冒号左侧为检查的位置，冒号右侧为赋值对象 */
   /* let { type2: localType, name2: localName} = node2;
   //console.log(type2); //报错，冒号左侧仅为检查的位置
   console.log(localType); //moveover
   console.log(localName); //mouse */

   /* 解构嵌套对象 */
   let menu = {
     id: 0,
     name: '一级菜单',
     others: {
       icon: 'icon1',
       children: [],
       developer: {
          name: 'juanjuan',
          job: 'web-front'
       }
     }
   },
   { others: { developer}} = menu;
   /* console.log(developer.name);//juanjuan
   console.log(developer.job);//web-front */

   /* 无意义的声明 */
   let { others: {}} = menu;

   /* 数组解构 */
   
})();