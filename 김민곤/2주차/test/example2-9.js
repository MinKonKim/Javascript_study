console.log(sum(1, 2));
console.log(multiply(3, 4)); // -- "multiply is not a function"

function sum(a, b) {
  // 함수 선언문
  return a + b;
}

var multiply = function (a, b) {
  // 함수 표현식
  return a * b;
};

// 결론 : 에러

// ------ 이 유 ------

// function sum () {...}        // -- 함수 전체 호이스팅
// var multiply                 // -- 변수명만 호이스팅
// console.log(sum(1, 2));      // -- sum 함수 실행 ok!
// console.log(multiply(3, 4)); // -- multiply 가 뭔데!

// multiply = function(...){...}
