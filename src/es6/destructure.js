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
   let nums = [1, 2, 3];

   /* 常规解构 */
   /* let [n1, n2, n3] = nums;
   console.log(n1); //1
   console.log(n2); //2
   console.log(n3); //3 */

   /* 忽略某些项 */
   /* let [,,n] = nums;
   console.log(n);//3 */
   
   /* 不提供初始值，会报错 */
   /* let [n,,]; */
   
   /* 可使用解构对已声明的变量赋值 */
   /* let [n1, n2, n3] = nums;
   console.log(n1);//1
   console.log(n2);//2
   console.log(n3);//3
   [n1, n2, n3] = [4, 5, 6];
   console.log(n1);//4
   console.log(n2);//5
   console.log(n3);//6 */

   /* 可使用解构赋值表达式互换变量值，无需第三方变量 */
   let a = 10, b =20;
   [a, b] = [b, a];
   console.log(a);//20
   console.log(b);//10

   /* 剩余项，可用来克隆数组 */
  /*  let [n1, ...n] = nums;
   console.log(n1);//1
   console.log(n);//[2,3] */

   /* 混合解构 */
   let list = {
     type: 'item',
     name: 'juanjuan',
     location: {
       district: 'binjiang',
       road: 'dongxindadao',
       NO: 310010,
       community: {
         name1: 'qianjiangwan',
         name2: 'hetianshangcheng'
       }
     },
     range: [0,1]
   };
   let {location:{ community:{name1}},range: [index]} = list;
   console.log(name1);//qianjiangwan
   console.log(index);//0

   /* 函数参数解构 */
   function set(name,{age = 24, sex = 'female'} = {}) {
     console.log(name);
     console.log(age);
     console.log(sex);
   }
   /* 即使参数解构内每个项都设置了默认值，也会报错，
   是因为，传入的参数解构的最终值为undefined，与
   每一项的默认值无关。
   可通过设置整个参数解构的默认值解决这个问题 */
   set('juanjuan');
})();