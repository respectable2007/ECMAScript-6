(() => {
  let list = [1, 2, 3, 4];
  async function value(v) {
    return await v;
  }
  async function output(list) {
    let lens = list.length;
    for(let i = 0 ; i < lens; i++) {
      await value(list[i]).then(v => {
        console.log(v)
      });
    }
  }
  output(list)
})()