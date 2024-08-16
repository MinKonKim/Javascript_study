chapter_2-2

# 스코프, 스코프 체인, outerEnvironmentReference

- ### 스코프란 : 식별자에 대한 유효범위

  - a의 외부에서 선언한 변수는 a의 외부 뿐 아니라 내부에서도 접근이 가능. 
  - a 내부에서 선언한 변수는 오직 a 내부에서만 접근이 가능하다.

- ### 스코프 체인 <br/> : 함수이 중첩에 의해 계층적 구조를 가진다.<br/> 식별자의 유효범위를 안에서부터 바깥으로 차례로 검색해 나가는 것, 이를 가능하게 하는 것이 LexicalEnvironment의 두 번째 수집 자료인 outerEnvironmentReference이다.

  `->  outerEnvironmentReference는 현재 호출된 함수가 선언될 당시의 LexicalEnvironment를 참조`

- #### '선언하다'라는 행위가 실제로 일어날 수 있는 시점이란?
  : 콜 스택 상에서 어떤 실행 컨텍스트가 활성화된 상태일 때 뿐<br/>: 여러 스코프에서 동일한 식별자를 선언한 경우에는 무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능하게 된다.

```
var a = 1
var outer = function () {
    var inner = function () {
        console.log(a)
        var a = 3
    }
    inner()
    console.log(a)
}
outer()
console.log(a)
```
#### > STEP <br/>

1. 시작: 전역 컨텍스트 활성화. environmentRecord에 {a, outer} 식별자를 저장.
선언 시점이 없으므로 outerEnvironment-Reference엔 아무것도 담기지 않는다 (this: 전역 객체)
---
  #### ? *environmentRecord 란? : 환경 레코드는 자바스크립트 코드의 렉시컬 중첩 구조(lexical nesting structure)에 기반하여 식별자들을 특정 변수·함수값으로 바인딩하는 데 사용*

---
2. 전역 스코프에 있는 1을 outer함수에 할당

3. outer함수를 호출, 전역 컨텍스트 코드 임시중단, outer 실행 컨텍스트가 활성화 되어 이동
---

 #### ? *환경 정보란, 코드에 선언된 변수 와 함수, 스코프, this, arguments 등을 의미*

---
4. outer 실행 컨텍스트 환경기록에 {inner} 식별자를 저장
함수 레벨 스코프
var로 선언된 변수와 함수는 함수 내부만 스코프로 인정해주며, 다른 코드 블럭의 변수와 함수는 전역변수, 전역함수로 간주한다.

```
function sayHi(name) {
  if (name) {
    var greet = `Hi, ${name}!`;
  }
  console.log(greet);
}

sayHi('Wonkook');
// "Hi, Wonkook!"
```

console.log 명령어가 조건문 바깥에 있음에도 greet의 값을 참조할 수 있는 것을 확인할 수 있다.

블록 레벨 스코프

ES6부터 등장한 let과 const로 선언된 변수는 블록 레벨 스코프를 지원

```
function sayHi(name) {
  if (name) {
    let greet = `Hi, ${name}!`;
  }
  console.log(greet);
}
sayHi('Wonkook');
// Uncaught ReferenceError: greet is not defined
```

함수 레벨 스코프와 달리 조건문을 포함한 모든 실행 블럭을 스코프로 간주, greet를 참조할 수 없게 된다.<br/>
스코프는 피요한 영영ㄱ에 한정하여 유효 범위가 좁을수록 좋다.

### 변수 은닉화(variable shadowing) <br/> : 여러 스코프에서 동일한 식별자를 선언한 경우, 무조건 스코프 체인 상에서 가장 먼저 검색된 식별자에만 접근이 가능.
```
(function s(){
let a = 'hi'
})() //a is not defined
```
즉, 직접적으로 변경되며 안되는 변수에 대한 접근을 막는 것!

- 전역변수와 지역변수

전역변수 : 전역공간에서 선언한 변수 <br/>
지역변수 : 함수 내부에서 선언한 변수


### this 
실행 컨텍스트의 thisBinding에는 this로 지정된 객체가 저장됩니다.
실행 컨텍스트 활성화 당시에 this가 지정되지 않은 경우 this에는 전역 객체가 저장된다. 
그 외에 함수를 호출하는 방법에 따라 this에 저장되는 대상이 다르다.

실행 컨텍스트 - 실행할 코드에 제공할 환경 정보들을 모아놓은 객체
실행 컨텍스트의 객체는 활성화되는 시점에 VariableEvironment, 렉시컬 환경, ThisBindin의 세가지 정보를 수집.

생성할 때, Variable 환경과 렉시컬 환경이 동일한 내용으로 구성되나, 렉시컬 환경은 함수 실행도중 변경사항 즉시 반영
variable 환경은 초기 상태를 유지.

variable 환경과 렉시컬 환경은 매개변수명, 변수의 식별자, 선언한 함수의 함수명 등을 수집하는 환경레코드와 
컨텍스트의 렉시컬 환경 정보를 참조하는 outerEnvironmentReference로 구성이 되있다.

호이스팅: 실행 컨텍스트가 관여하는 코드 집단의 최상단으로 끌어올린다로 해석

스코프: 변수의 유효범위

this: 실행컨텍스트를 활성화하는 당시에 지정된 this가 저장.

함수를 호출하는 방법에 따라 값이 달라지는데 지정되지 않은 경우 전역 객체가 저장된다.