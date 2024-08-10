var sum = function (x, y) {
  return x + y;
};

var a = sum(1, 2);
console.log(a);
var sum = function (x, y) {
  return x + "+" + y + "=" + (x + y);
};

var c = sum(1, 2);
console.log(c);

// ------ 결과 ------
// 3
// 1+2=3

// ------ 이  유 ------

var sum;
var a;
var c;

sum = function (x, y) {
  // 변수 sum 에 function 할당
  return x + y;
};

a = sum(1, 2); // a 라는 변수에 sum을 실행한 값 할당.
console.log(a);

sum = function (x, y) {
  // sum 에 새로운 함수 다시 할당.
  return x + "+" + y + "=" + (x + y);
};

c = sum(1, 2); //  c 라는 함수에 바뀐 sum을 실행한 값 할당.
console.log(c);
