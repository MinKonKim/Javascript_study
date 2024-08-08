function a() {
  console.log(b);
  var b = "bbb";
  console.log(b);

  function b() {}
  console.log(b);
}
a();

//-------출력 결과------

// [Function: b]
// bbb
// bbb

// -------이 유 ---------

function a() {
  var b; // 변수 선언부 호이스팅
  function b() {} // 함수 선언은 전체를 호이스팅
  console.log(b);
  b = "bbb";

  console.log(b);

  console.log(b);
}
