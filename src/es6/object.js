(() => {
  let person = {
    name: 'juanjuan',
    sayName() {
      console.log(this.sayName);
      console.log(this.name);
    }
  }
  person.sayName();
})();