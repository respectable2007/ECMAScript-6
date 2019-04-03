(() => {
  function createIterator(items) {
    var i = 0;
    return {
      next: function() {
        let done,
            v,
            j = Object.prototype.toString.call(items),
            s;
        switch(j) {
          case '[object Array]':
          let length = items.length; 
          done = i >= length;
          v = done ? undefined : items[i ++];
          break;
        //   case '[object Object]':

        }
        
        
        return {
          value: v,
          done: done
        }
      }
    }
  }
  let iterator = createIterator([1, 2, 3]);
  console.log(iterator.next());//{value:1,done:false}
  console.log(iterator.next());//{value:2,done:false}
  console.log(iterator.next());//{value:3,done:false}
  console.log(iterator.next());//{value:undefined,done:true}
})();