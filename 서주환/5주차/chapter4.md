<br/>
<br/>

# <span style='color:orange'>콜백 함수

콜백 함수란 다른 코드의 인자로 넘겨주는 함수이다.
필요에 따라 적절한 때에 실행

콜백함수는 제어권과 연관이 있다.

<br/>

## <span style='color:yellow'>제어권

```
var intervalID = scope.setInterval(func, delay[, param1, param2, ...])
```

<br/>

### <span style='color: green'>호출 시점

```
var count = 0

var timer = setInterval(function() {
console.log(count)
if (++count > 4) clearInterval(timer)
}, 300)
```

```
var intervalID = scope.setInterval(func, delay[, param1, param2, ...])
```

scope에 window 객체 또는 worker의 인스턴스가 들어올 수 있다.
setInterval을 실행하면 반복적으로 실행되는 내용 자체를 특정할 수 있는 고유한 ID값이 반환된다.

변수에 담는 이유는 반복 실행되는 중간에 종료할 수 있게 하기 위해서다.

<br/>

### <span style='color: green'>인자

```
Array.prototype.map(callback[, thisArg])
callback: function(currentValue, index, array)
```

map 메서드는 첫 번째 인자로 callback 함수를 받고, 생략 가능한 두 번째 인자로 콜백 함수 내부에서 this로 인식할 대상을 특정화 한다.<br/>
thisArg를 생략할 경우 일반적인 함수와 마찬가지로 전역객체가 바인딩된다.<br/>
map메서드의 대상이 되는 배열의 모든 요소들을 처음부터 끝까지 꺼내어 콜백 함수를 반복 호출 콜백 함수의 실행 결과들을 모아 새로운 배열을 만든다.<br/>
콜백 함수의 첫 인자엔 배열 요소 중 현재값, 두 번째 인자엔 현재값의 인덱스, 세 번째 인자엔 대상이 되는 배열 자체가 담긴다

jquery의 메서드들은 기본적으로 첫 인자에 index가, 두 번째 인자엔 currentValue가 들어온다.<br/>
map 매서드를 호출해서 원하는 배열을 얻으려면 map 메서드에 정의된 규칙에 따라 함수를 작성해야 한다.<br/>
콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수를 호출할 떄 인자에 어떤 값들을 어떤 순서로 넘길 것인지에 대한 제어권을 가진다.

<br/>

### <span style='color: green'>this

제어권을 넘겨받을 코드에서 call/apply 메서드의 첫 번째 인자에 콜백 함수 내부에서 this가 될 대상을 명시적으로 바인딩 하기 때문이다.

<br/>

## <span style='color:yellow'> 콜백 함수는 함수다

콜백 함수로 어떤 객체의 메서드를 전달하더라도 그 메서드는 메서드가 아닌 함수로 호출된다.

<br/>

## <span style='color:yellow'> 콜백 함수 내부 this에 다른 값 바인딩하기

별도의 인자로 this를 받는 함수의 경우에는 여기에 원하는 값을 넘겨주면 되지만<br/> 그렇지 않은 경우에는 this의 제어권도 넘겨주게 되므로 사용자가 임의로 값을 바꿀 수 없다.<br/>
this를 다른 변수에 담아 콜백 함수로 활용할 함수에서는 this대신 그 변수를 사용하게 하고, 클로저로 만드는 방식이 많이 쓰였다.

<br/>

## <span style='color:yellow'> 콜백 지옥과 비동기 제어

콜백지옥은 콜백 함수를 익명 함수로 전달하는 가정이 반복되어 코드의 들여쓰기 수준이 감당하기 힘들 정도로 깊어지는 현상.<br/>
주로 이벤트 처리나 서버 통신과 같이 비동기적 작업을 수행하기 위해 이런 형태가 빈번하지만 가독성이 떨어지고 코드 수정이 어렵다.

동기적 코드 : 현재 실행중인 코드가 완료된 후에야 다음 코드를 실행하는 방식<br/>
cpu의 계산에 의해 즉시 처리가 가능한 대부분의 코드는 동기적인 코드이다

비동기적 코드 : 현재 실행중인 코드의 완료 여부와 무관하게 즉시 다음 코드로 넘어간다.<br/>
사용자의 요청에 의해 특정 시간이 경과되기 전까지 어떤 함수의 실행을 **보류**, <br/>사용자의 직접적 개입이 있을 떄 함수를 실행하도록 **대기**,<br/> 브라우저가 아닌 별도의 대상에 요청 -> **응답이 왔을 때** 함수를 실행하도록 대기<br/>
즉, 별도 요청, 실행 대기, 보류등과 관련된 코드는 비동기적 코드이다.

가독성을 높이기 위해 익명의 콜백 함수를 모두 기명함수로 전환<br/>
함수 선언과 호출만 구분할 수 있다면 위에서 아래의 순서대로 읽어 내려가는데 문제는 없다.<br/> 다만 일회성 함수를 전부 변수에 할당해야하는 것이 반복되고 복잡하여 좋은 방법은 아니라고 본다.

<br/>

### <span style='color: green'> ES6에서 Promise, Generator, ES8에선 async/await 도입

- Promise : new 연산자와 함께 호출한 promise 인자로 넘겨주는 콜백함수는 호출할 때 바로 실행되지만, <br/>내부에 resolve or rejected 함수를 호출하는 구문이 있을 경우 실행되기 전까지 다음으로(then,catch구문) 넘어가지 않는다.

- Generator : 함수를 실행하면 inerator가 반환, next라는 메서드를 가지고 있다. <br/>이 메서드를 호출하면 함수 내부에서 가장 먼저 등장하는 yield에서 함수 실행을 멈춘다.<br/>
  이후 next메서드를 호출하면 멈췄던 부분에서 시작해 다음 yield에서 실행을 멈춘다.<br/> 즉 비동기 작업이 완료되는 시점마다 next 메서드를 호출해준다면 함수 내부의 소스가 위에서 아래로 순차적으로 진행된다.

- async/await : 가독성이 좋고 작성법이 간단하다<br/>
  비동기 작업을 하고자 하는 함수 앞 async를 표시, <br/>함수 내부에서 실질적으로 비동기 작업이 필요한 위치마다 await를 표기하면 자동적으로 await 뒤의 내용을 promise로 전환 -> 해당 내용이 resolve된 이후에 다음 단계를 진행한다
