// // 함수와 메서드에서의 this 바인딩
// var obj = {
//   outer: function () {
//     console.log(this);
//     var innerFunc1 = function () {
//       console.log(this);
//     };
//     innerFunc1();
//     var self = this;
//     var innerFunc2 = function () {
//       console.log(self);
//     };
//     innerFunc2();
//   },
// };

// obj.outer();

// // 콜백 함수 내부에서의 this

// setTimeout(function () {
//   console.log(this);
// }, 3000);

// [1, 2, 3, 4, 5].forEach(function (x) {
//   console.log(this, x);
// });

// document.body.innerHTML += '<button id="a">클릭</button>';
// document.body.querySelector("#a").addEventListener("click", function (e) {
//   console.log(this, e);
// });

//bind 함수 이름 확인
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
var bindFunc = func.bind({ x: 1 }, 4, 5);
var bindFunc2 = func.call({ x: 1 }, 4, 5);

console.log(func.name); // func
console.log(bindFunc);
console.log(bindFunc2);

// bind 메서드 - 내부 함수에 this 전달

// var obj = {
//   logThis: function () {
//     console.log(this);
//   },
//   logThisLater1: function () {
//     setTimeout(this.logThis, 500);
//   },
//   logThisLater2: function () {
//     setTimeout(this.logThis.bind(this), 1000);
//   },
//   logThisLater3: function () {
//     setTimeout(this.logThis.call(this), 2000);
//   },
// };

// obj.logThisLater1();
// obj.logThisLater2();
// obj.logThisLater3();
