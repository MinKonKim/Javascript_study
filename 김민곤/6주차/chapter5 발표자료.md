
# Chapter 5 
# 자바스크립트 클로저 (Closure)

## 1. 클로저의 의미 및 원리 이해

### 클로저란?
어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의
실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상.
 
### 클로저의 원리
클로저는 자바스크립트의 **스코프** 체계에 기반을 두고 있다.
함수가 생성될 때, 해당 함수는 자신이 선언된 스코프의 변수들을 참조할 수 있는 링크를 저장하게 된다.
이 링크를 통해 함수가 실행되는 시점에도 이전 스코프의 변수에 접근할 수 있다.

#### 예제:
```javascript
function outerFunction(outerVariable) {
    return function innerFunction(innerVariable) {
        console.log(`Outer Variable: ${outerVariable}`);
        console.log(`Inner Variable: ${innerVariable}`); 
    }
}

const newFunction = outerFunction('outside');
newFunction('inside');

// Outer Variable: outside
// Inner Variable: inside
```
이 코드에서 innerFunction은 outerVariable에 접근할 수 있는데, 이는 클로저 덕분이다. 함수가 실행되는 시점에 outerVariable은 이미 존재하지 않지만, innerFunction은 이를 계속 참조할 수 있다.

## 2. 클로저와 메모리 관리
### 클로저로 인한 메모리 누수
클로저는 함수가 실행된 후에도 외부 함수의 변수를 유지할 수 있기 때문에, 불필요한 변수까지 메모리에 계속 남아있을 수 있다. 이러한 특징이 잘못 사용되면 메모리 누수를 유발할 수 있다.

#### 예제:
```javascript
function createFunction() {
    let largeArray = new Array(1000000).fill('data');
    return function() {
        console.log('Closure with large data');
    }
}

const myFunction = createFunction();
myFunction();  // 'Closure with large data'
// largeArray는 이제 더 이상 필요 없지만, 클로저가 참조하고 있어 메모리에 남아 있음.
```

위 코드에서 largeArray는 함수가 끝났음에도 불구하고 메모리에 남아 있다. 이는 클로저가 해당 배열을 참조하고 있기 때문이다.


### 해결 방법
클로저를 사용할 때는 필요한 데이터만 유지하고, 불필요한 데이터는 제거하는 것이 중요하다. 또한, 클로저가 더 이상 필요하지 않을 때 참조를 끊어주는 것이 메모리 관리를 위한 좋은 습관이다.

```javascript
let myFunction = createFunction();
// 메모리 해제
myFunction = null;
```
## 3. 클로저 활용 사례
### 3-1. 콜백 함수 내부에서 외부 데이터를 사용할 때
클로저는 비동기 처리나 이벤트 리스너와 같은 상황에서 외부 데이터를 참조해야 할 때 유용하다. 예를 들어, 콜백 함수에서 외부 변수를 참조하여 로직을 처리할 수 있다.

#### 예제:
```javascript
function fetchData(url) {
    const apiKey = 'my-secret-api-key';
    
    fetch(url).then(function(response) {
        console.log(`API Key: ${apiKey}`);
        // fetchData에서 선언된 apiKey에 접근
    });
}

fetchData('https://example.com');
```
콜백 함수는 fetchData 함수의 실행이 끝난 후에도 apiKey를 참조할 수 있다.

### 3-2. 접근 권한 제어
클로저를 사용하여 함수 내부에 변수를 감추고, 해당 변수에 대한 접근을 제한할 수 있다. 이는 객체 지향 프로그래밍에서의 캡슐화와 유사한 역할을 한다.

#### 예제:
```javascript
function createCounter() {
    let count = 0;
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.decrement()); // 0
// count 변수는 외부에서 접근할 수 없으며, 클로저를 통해서만 조작 가능
```
### 3-3. 부분 적용 함수 (Partial Application)
부분 적용 함수는 일부 인자를 고정한 채로 함수를 생성하는 방법이다. 클로저를 활용하여 기본값이 설정된 새로운 함수를 반환할 수 있다.

#### 예제1:
```javascript
function createMultiplier(multiplier) {
    return function(value) {
        return value * multiplier;
    };
}

const double = createMultiplier(2);
console.log(double(5)); // 10
const triple = createMultiplier(3);
console.log(triple(5)); // 15
```
- createMultiplier 함수는 곱셈을 수행하는 함수를 반환하는 클로저입니다. multiplier라는 값을 인자로 받고, 이 값을 고정한 후 나머지 값을 나중에 받을 수 있는 함수를 반환합니다.
- 반환된 함수는 나중에 value 값을 인자로 받아, multiplier 값과 곱셈을 수행합니다.

#### 예제2:
```javascript
var debounce = function(eventName, func ,wait){
 var timeoutId = null;
 return function (event){
   var self= this;
   console.log(eventName, 'event 발생');
   clearTimeout(timoutId);
   timeoutId = setTimeout(func.bind(self, event),wait);
 };
var moveHandler = function(e){
 console.log('move event 처리');
};
var wheelHandler = function(e){
 console.log('wheel event 처리');
}
document.body.addEventListener('mousemove', debounce('move',moveHandler, 500));
document.body.addEventListener('mousewheel', debounce('wheel',wheelHandler, 700));
}
```
- debounce 함수는 클로저로 구현되어, 내부에서 timeoutId를 유지하며, 이벤트가 발생할 때마다 기존 타이머를 지우고 새로운 타이머를 설정합니다. 이렇게 하면 이벤트가 여러 번 발생하더라도 마지막 이벤트만 실행됩니다.
- timeoutId는 외부 함수의 변수로서 클로저를 통해 계속해서 참조되므로, 함수가 종료된 후에도 상태를 유지할 수 있습니다.
##### 주요 흐름:
1. debounce 함수는 세 가지 인자를 받습니다: eventName (이벤트 이름), func (실행할 함수), wait (딜레이 시간).
2. 이벤트가 발생할 때마다 debounce 내부 함수가 호출되고, 기존 타이머(timeoutId)를 지우고 새로운 타이머를 설정합니다.
3. 일정 시간이 지나면(예: 500ms 후) 실제 이벤트 핸들러 함수(moveHandler, wheelHandler)가 호출됩니다.
4. 만약 그 사이에 동일한 이벤트가 계속 발생하면 타이머가 초기화되고, 다시 대기 시간이 시작됩니다.
     
### 3-4. 커링 함수 (Currying)
커링은 하나의 함수가 여러 개의 인자를 받는 대신, 각각의 인자를 하나씩 받는 함수를 차례로 반환하는 기법이다. 클로저를 사용하여 이를 구현할 수 있다.

#### 예제:
```javascript
function curry(fn) {
    return function(a) {
        return function(b) {
            return fn(a, b);
        };
    };
}

const sum = (a, b) => a + b;
const curriedSum = curry(sum);

console.log(curriedSum(1)(2)); // 3
```
커링을 통해 함수의 인자를 나누어 받을 수 있으며, 클로저를 통해 각 단계에서의 값을 기억한다.

### 4. 정리
클로저는 자바스크립트에서 중요한 기능으로, 외부 함수의 변수를 기억하여 비동기 처리, 접근 제어, 함수 조합 등의 다양한 용도로 사용될 수 있다.
그러나 클로저의 남용은 메모리 관리에 문제를 일으킬 수 있으므로, 적절한 관리가 필요하다.
