(() => {
  @testable
  class MyTestable {
    constructor(name) {
      this.name = name;
    }
  }
  function testable(target) {
    target.isTestable = true;
  }
  console.log(MyTestable.isTestable)
})()