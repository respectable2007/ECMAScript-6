import { mixins } from '../utils/mixins.js';
((mixins) => {
  /* 装饰器 */
  @testable(true)
  class MyTestable {}
  /* 添加静态属性 */
  function testable(isTest) {
    return function(target) {
        target.isTestable = isTest;
    }
  }
  console.log(MyTestable.isTestable);

  /* 添加实例属性 */
  @instanceProperty('juanjuan')
  class InstancesProperty {}  
  function instanceProperty(name) {
    return function(target){
      target.prototype.name = name;
    }
  }
  let ins1 = new InstancesProperty();
  console.log(ins1.name);

  const Foo = {
    foo() {
      console.log('shuaijuan')
    }
  }

  /* 混入 */
  @mixins(Foo)
  class MyClass {}
  new MyClass().foo();

  /* 方法的修饰 */
  class  Person {
    @readonly
    name() {
      return 'choujuan';
    }

    @enumerable
    get age() {
      return 1.5;
    }

    @log
    add(a, b) {
      return a + b;
    }
  }
  /* 禁用可写 */
  function readonly(target, name, descriptor) {
    // descriptor.writable = false;
    return descriptor;
  }
  readonly(Person, 'name', Object.getOwnPropertyDescriptor(Person, 'name'))
  console.log(new Person().name())

  /* 禁用遍历 */
  function enumerable(target, name, descriptor) {
    descriptor.enumerable = false;
    return descriptor;
  }
  for(let i in (new Person())) {
    console.log(i);//无输出
  }

  function log(target, name, descriptor) {
    var oldValue = descriptor.value;
    descriptor.value= function() {
      console.log(`Calling "${name}" with`,arguments);
      return oldValue.apply(null, arguments);
    }
    return descriptor;
  }
  console.log(new Person().add(1, 2));//输出3
  
})(mixins)