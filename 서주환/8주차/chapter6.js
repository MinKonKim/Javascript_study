// var Person = function (name) {
//     this.name = name
// }
// Person.prototype.getName = function () {
//     return this.name
// }

// var iu = new Person('지금')
// iu.getName = function () {
//     return '바로' + this.name
// }
// console.log(iu.getName()) // 바로 지금

var Grade = function () {
  var args = Array.prototype.slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
  this.length = args.length;
};
var g = new Grade(100, 80);
