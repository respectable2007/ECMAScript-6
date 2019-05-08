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
  @mixins(Foo)
  class MyClass {}
  new MyClass().foo();
})(mixins)