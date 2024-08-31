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

## this
> map메서드 구현
```javascript
Array.prototype.map = function (callback,thisArg){
  var mappedArr= [];
  for (var i=0; i<this.length; i++){
    var mappedValue = callback.call(thisArg || windowm, this[i] ,i ,this);
    mappedArr[i] = mappedValue;
  }
return mappedArr;
}
```
- 제어권을 넘겨받을 코드에서 call/apply 메서드의 첫 번째 인자에 콜백 함수 내부에서의 this가 될 대상을 명시적으로 바인딩된다.
  
> 콜백 함수 내부에서의 this
```javascript
  setTimeout(function (){console.log(this);},300);
  [1,2,3,4,5]forEach(function(x){
  console.log(this);
});
document.body.innerHTML += <button id="a">클릭</button>
document.body.querySelector('#a').addEventListener('click',function(e){
  console.log(this,e);
})
```
- 우선 setTimeout 은 내부에서 콜백 함수를 호출할 때 call 메서드의 첫 번째 인자에 전역객체를 넘기기 때문에 콜백 함수 내부에서의 this가 전역 객체를 가르킨다.
- forEach 는 별도의 인자로 this를 받는 경우 에 해당하지만 별도의 인자로 this를 넘겨주지 않았기 때문에 전역 객체를 가르킨다.
- addEventListener는 내부에서 콜백 함수르 호출할 때 call 메서드의 첫 번째 인자에 addEventListener 메서드의 this를 그대로 넘기도록 정의돼 있기 때문에 콜백 함수 내부에서의 this가 addEventListener를 호출한 주체인 HTML 엘리먼트를 가르킨다.

---
## 콜백 함수는 콜백 함수다
> 콜백 함수로 어떤 객체의 메서드를 전달하더라도 그 메서드는 메서드가 아닌 함수로서 호출됩니다.

## 콜백 함수 내부의 this에 다른 값 바인딩하기
- 객체의 메서드를 콜백 함수로 전달하면 해당 객체를 this로 바라볼 수 없게 된다
- 그럼에도 콜백 함수 내부에서 this가 객체를 바라보게 하고 싶다면 어떻게 해야 할까요?
- 전통적으로는 this를 다른 변수에 담아 콜백 함수로 활용할 함수에서는 this 대신 그 변수를 사용하게 하고,
- 이를 클로저로 만드는 방식이 많이 쓰여있습니다.

```javascript
 var obj={
  name :'obj1',
func : function(){
  var self= this;
  return function(){
  console.log(self.name);
  
};
var  callback =obj1.func();
setTimeout(callback,1000);
  }
};
```
- 이 방식이 번거롭지만 재사용성 과 메모리 관리 측면에선 고집되고 있는 방식이다.
- ES5 부터는 bind 메서드를 사용하는 방법이 등장했다.

```javascript
  var obj={
  name :'obj1',
func : function(){
  console.log(this.name);
  }
};

setTimeout(obj1.func.bind(obj1),100);

var obj2 = {name:'obj2'}
;
setTimeout(obj1.func.bind(obj2),1500);
```

**작성 하다 보니 this가 객체를 바라보게 안하면 어찌 되는걸까? 라는 생각이 남**
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function() {
  console.log(this.name);
};

const john = new Person("John");

setTimeout(john.sayName, 1000);

```
- 이럴 경우 this가 undefined
- this가 undefined 되면 코드가 제대로 안돌아가고.. 디버깅해야하고..나라가 무너짐..

---

## 콜백 지옥과 비동기 제어

- 콜백 지옥은 기명함수로 변환하면 됩니다
  - 가독성이 올라가고
  - 함수 선언과 호출로만 구분할 수 있다면 위에서 아래로 읽는데 어려움이 없죠

**일회성인데도?**
- 아ㅋㅋ 비동기 작업 사용하시죠
- ES6의 Promise 도입

- 하지만 지금 누가 씀
- ES7 의 async await이나 쓰시죠
   - 비동기 작업을 동기작업 처럼 보이게 하고
   - 뛰어난 가독성과 간단한 작성

-  
