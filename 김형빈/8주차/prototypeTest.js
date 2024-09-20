// var NewConstructor = function () {
//   console.log("this is new constructor!");
// };
// var dataTypes = [
//   1,
//   "test",
//   true,
//   {},
//   [],
//   function () {},
//   /test/,
//   new Number(),
//   new String(),
//   new Boolean(),
//   new Object(),
//   new Array(),
//   new Function(),
//   new RegExp(),
//   new Date(),
//   new Error(),
// ];

// dataTypes.forEach(function (d) {
//   d.constructor = NewConstructor;
//   console.log(d.constructor.name, "&", d instanceof NewConstructor);
// });

// const one = 1;
// one.constructor = NewConstructor; 
// console.log(one.constructor, NewConstructor)

var NewConstructor = function () {
  console.log("this is new constructor!");
};
var arr = [1, 2];
arr = NewConstructor;
// arr.constructor = NewConstructor;
console.log(arr instanceof NewConstructor);

console.dir({a: 1});
console.dir([2, 3]);