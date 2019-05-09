(() => {
  "use strict";
  let proxy = new Proxy({}, {
    get(target, property) {
      return 'juanjuan';
    }
  })
  console.log(proxy.name)
})()