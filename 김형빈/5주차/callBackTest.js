var obj1 = {
  name: "obj1",
  func: function () {
    console.log(this.name);
  },
};

// var obj1 = {
//   name: "obj1",
//   func: function () {
//     var self = this;
//     return function () {
//       console.log(self.name);
//     };
//   },
// };

// var callback = obj1.func();
// setTimeout(callback, 1000);

var obj3 = { name: "obj3" };
// var callback3 = obj1.func.call(obj3);
var callback3 = obj1.func.bind(obj3);
setTimeout(callback3, 2000);
