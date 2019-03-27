(() => {
  "use strict";
  /* 对象字面量语法扩展 */
  let foo = 'bar',
      bar = 'juanjuan',
      /* 属性初始化器速记法（简写表示法） */
      obj1 = { bar,
      /* 方法简写 */
      sayHi() {
        console.log(this.bar)
      },
      /* 属性表达式声明对象属性 */
      [foo]: 'xiaomaomi',
    //   [foo]//报错，属性表达式与简写表示不能同时出现
    };
  /* [foo]和bar重名，ES6不会检查重名属性。
     当出现重名后，该属性实际值为后排那个属性的值 */
  console.log(obj1.bar);//xiaomaomi
  obj1.sayHi();//xiaomaomi
  console.log(obj1.foo);//undefined

  /* 对象自有属性枚举顺序：1、数字类型键，按升序；
  2、字符串，按添加顺序；3、符号类型键，按添加顺序 */
  let obj2 = {
    a: 'a',
    0: 0,
    2: 2,
    c: 'c',
    b: 'b',
    1: 1
  },
  args = [];
  obj2.d = 'd';
  console.log(Object.getOwnPropertyNames(obj2));//["0", "1", "2", "a", "c", "b", "d"]
  for(let i in obj2) {
    args.push(i);
  }
  console.log(args);//目前看，firefox、chrome中for-in循环与ES6规定的顺序相同

  /* 更改对象原型对象setPrototypeof*/
  let p = {
    greet() {
      return 'Hello';
    }
  }
  let q = {
    greet() {
      return 'Bojurn';
    }
  }
  let m = Object.create(p);
  console.log(m.greet()); //Hello
  Object.setPrototypeOf(m, q);//m对象的原型更改为q
  console.log(m.greet()); //Bojurn

  /* super */
  let a = {
    greet() {
      return 'Hello';
    }
  },
  b = {
    greet() {
      return Object.getPrototypeOf(this).greet.call(this);
    }
  },
  c = {};
  Object.setPrototypeOf(c, b);
  /* 堆栈溢出，报错，是因为c对象调用greet方法，
  从作用域链查找到了原型对象的greet方法，执行内部代码，
  this指向的是c，Object.getPrototypeOf(this)相当于b对象，
  之后调用greet方法并其作用域指向c对象，
  再次执行greet内部代码，this是c，Object.getPrototypeOf(this)相当于b对象，
  之后用greet方法并其作用域指向c对象，就这样递归调用，直到达到调用栈最大值，
  造成堆栈移除，从而报错*/
  //console.log(c.greet());//Uncaught RangeError: Maximum call stack size exceeded
  
  /* 改进以上多层继承问题的方法，使用super。
     super执行当前对象的原型对象，不是动态的 */
  let e = {
    greet() {
      return 'Hello';
    }
  },
  f = {
    greet() {
      return super.greet();
    }
  },
  g = Object.create(f);
  /* 报错，因为f的原型对象是默认的Object对象，没有greet方法 */
//   console.log(f instanceof Object);//原型是默认的Object对象
//   console.log(g.greet());
//   Object.setPrototypeOf(f, e);
  /* 返回Hello */
//   console.log(g.greet());
})();