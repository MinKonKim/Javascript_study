// 함수 선언문에 위험성!!!!!!!!

console.log(sum(3, 4));

function sum(a, b) {
  // 함수 선언문
  return a + b;
}

var a = sum(1, 2);
console.log(a);

function sum(x, y) {
  return x + "+" + y + "=" + (x + y);
}

var c = sum(1, 2);
console.log(c);

//  ----- 결 과 -----
// 3+4=7
// 1+2=3
// 1+2=3

// ------ 이 유 ------
function sum(a, b) {
  // 함수 선언문
  return a + b;
}
function sum(x, y) {
  //  -- 함수 override

  return x + "+" + y + "=" + (x + y);
}
var a;
var c;

console.log(sum(3, 4)); // -- 마지막으로 선언된 sum 함수 실행,

a = sum(1, 2);
console.log(a); // -- 위와 동일

c = sum(1, 2);
console.log(c); // -- 위와 동일
