var a = 1;
function outer() {
    function inner() {
        console.log(a); // undefined
        var a = 3;
    }
    inner();
    console.log(a); // 1
}
outer();
console.log(a); // 1

var a = 1;
function outer() {
    function inner() {
        console.log(a); // 1
    }
    inner();
    console.log(a); // 1
}
outer();
console.log(a); // 1

{
    /* 

 ##   inner 함수가 (var a = 1;)를 참조하지 못하는 이유
inner 함수는 자신의 스코프에서 변수를 선언하고, 이 변수가 inner 함수 내에서 우선적으로 **사용** (로컬 스코프)
결과적으로, inner 함수 내의 (var a = 3;) 선언이 외부 변수를 가립.

한줄 요약
-자바스크립트에서는 함수 스코프 내의 변수 선언이 함수의 로컬 스코프에 우선하며, 이는 외부 스코프의 변수를 가릴 수 있습니다.

*/
}
