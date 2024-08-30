# 콜백함수
## 콜백 함수란?
> 콜백 함수는 다른 코드의 인자로 넘겨주는 함수이다.
> 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수이다.

## 제어권은 뭘까?
```javascript
  var count =0;
  var cbFunc = function(){
  console.log(count);
  if(++count >4 ) clearInterval(timer);
};
var timer = setInterval(cbFunc ,300);
```
- 위 코드 실행 방식과 제어권
  
| code | 호출 주체 | 제어권 |
| ---- | ---- | ----|
| cbFunc(); | 사용자  | 사용자|
| setInterval(cbFunc,300); | setInterval | setInterval |

- 0.3 초에 한 번씩 숫자가 0부터 1씩 증가하며 출력된다.
- 4가 출력된 이후엔 종료 된다.
- 이처럼 콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수 호출 시점에 대한 제어권을 가지게 된다.

## 인자
```javascript
  Array.prototype.map(callback,[,thisArg])
  callback: function(currentValue,index,array)
```
- 첫번째 인자로 callback 함수를 받는다
- 생략가능한 두번째 인자로 callback 함수 내부에서 this로 인식할 대상을 특정할 수 있다.
- thisArg를 생략할 경우에는 일반적인 함수와 마찬가지로 전역객체가 바인딩됩니다.
---
- 콜백함수의 첫번째 인자에는 배열의 요소 중 현재 값이,
- 두번째 인자에는 현재값의 인덱스
- 세번째 인자에는 map메서드의 대상이 되는 배열 자체가 담깁니다.
===
