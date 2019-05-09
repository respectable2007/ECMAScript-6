(() => {
  "use strict";
  let proxy = new Proxy({}, {
    get(target, property) {
      return 'juanjuan';
    }
  })
  console.log(proxy.name)

  let object = {
    proxy: new Proxy({}, {
      get(target, property) {
        return 'shuaijuan';
      }     
    })
  }
  console.log(object.proxy.name);

  /* Proxy取消 */
  let {proxy1, revoke} = Proxy.revocable({},{})
  proxy1.fn = 3;
  revoke();//取消
  proxy1.fn = 4;
})()