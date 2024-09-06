# 5. 클로저

## 5-1 클로저의 의미 및 원리 이해

클로저는 함수와 그 함수가 선언된 당시의 렉시컬 환경(Lexical Environment) 간의 상호 관계로 인해 발생하는 현상. 이를 통해 내부 함수가 외부 함수의 변수를 참조할 수 있음. 즉, 클로저는 "어떤 함수에서 선언한 변수를 참조하는 내부 함수에서 발생하는 현상"으로 볼 수 있음.

```javascript
var outer = function () {
    var a = 1;
    var inner = function () {
        return ++a;
    };
    return inner;
};

var outer2 = outer(); // outer 종료, outer2는 inner를 참조
console.log(outer2()); // 2
console.log(outer2()); // 3
```

1. outer 함수 실행: `outer` 함수는 `a` 변수를 선언하고 `inner` 함수를 반환합니다.
2. outer 함수 종료: `outer2` 변수는 `inner` 함수를 참조하게 되어, `outer` 함수는 종료되었지만, 내부 함수 `inner`는 여전히 외부 함수 `outer`의 변수를 참조할 수 있습니다.
3. 클로저 발생: `outer2()`를 호출할 때 `inner` 함수는 외부 함수의 변수 `a`에 접근하여 값을 변경하고 반환합니다.

## 5-2 클로저와 메모리 관리

클로저는 외부 함수의 변수를 내부 함수에서 참조할 수 있게 해주는 강력한 기능. 하지만 이로 인해 메모리 누수 문제가 발생할 수 있음. 이유는 클로저가 참조하는 외부 함수의 변수들이 가비지 컬렉션(GC)의 수거 대상에서 제외되기 때문. 따라서 클로저가 더 이상 필요하지 않을 때는 참조 카운트를 0으로 만들어야 합니다.

### 참조 카운트를 0으로 만드는 방법

클로저로 인해 유지되고 있는 외부 함수의 변수를 해제하려면,
그 변수에 기본형 데이터(예: `null`, `undefined`)를 할당하여 참조를 끊어야 한다

```javascript
var outer = (function () {
    var a = 1;
    var inner = function () {
        return ++a;
    };
    return inner;
})();

console.log(outer); // [Function: inner]
outer = null; // 참조 해제
console.log(outer); // null
```

1. 클로저 생성: 즉시 실행 함수로 `outer`에 `inner` 함수를 반환
2. 클로저 참조 해제: `outer`에 `null`을 할당하여, 클로저가 참조하고 있던 `inner` 함수와 `a` 변수의 연결을 끊음
3. 가비지 컬렉션 대상: `outer`가 더 이상 `inner`를 참조하지 않으므로, `a`는 가비지 컬렉션에 의해 수거될 수 있음

### 5-3-1 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때

-   기본 방식: 콜백 함수가 외부 변수를 참조하면 클로저가 발생, 콜백 내부에서 외부 변수에 접근 가능.

```javascript
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

fruits.forEach(function (fruit) {
    var $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', function () {
        alert('your choice is ' + fruit);
    });
    $ul.appendChild($li);
});
document.body.appendChild($ul);
```

-   콜백 함수를 외부로 분리한 버전: `bind` 메서드를 사용해 인자를 미리 적용할 수 있지만, 이벤트 객체가 추가로 전달되는 문제 발생.

```javascript
var alertFruit = function (fruit) {
    alert('your choice is ' + fruit);
};
fruits.forEach(function (fruit) {
    var $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', alertFruit);
    $ul.appendChild($li);
});
document.body.appendChild($ul);
alertFruit(fruits[1]);
```

-   고차 함수 활용: 고차 함수는 클로저를 활용해 외부 변수에 접근할 수 있는 새로운 함수를 반환.

```javascript
var alertFruitBuilder = function (fruit) {
    return function () {
        alert('your choice is ' + fruit);
    };
};
fruits.forEach(function (fruit) {
    var $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', alertFruitBuilder(fruit));
    $ul.appendChild($li);
});
```

### 5-3-2 접근 권한 제어(정보은닉)

-   정보 은닉: 모듈 내부 로직을 외부에 노출하지 않고 유지보수성을 높임.
-   자바스크립트에서의 정보 은닉: 클로저를 사용해 private과 public 멤버를 구분할 수 있음.

### 5-3-3 부분 적용 함수

-   부분 적용 함수: 함수에 일부 인자를 미리 적용하고 나중에 나머지 인자를 전달해 실행.

```javascript
var add = function () {
    var result = 0;
    for (var i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }
    return result;
};
var addPartial = add.bind(null, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10)); // 55
```

-   클로저 활용: 부분 적용 함수는 클로저를 사용하여 미리 저장된 인자들을 나중에 사용할 수 있음.

```javascript
var debounce = function (eventName, func, wait) {
    var timeoutId = null;
    return function (event) {
        var self = this;
        console.log(eventName, 'event 발생');
        clearTimeout(timeoutId);
        timeoutId = seTimeout(func.bind(self, event), wait);
    };
};

var moveHandler = function (e) {
    console.log('move event 처리');
};
var wheelHandler = function (e) {
    console.log('wheel event 처리');
};
document.body.addEventListener('mousemove', debounce('move', moveHandler, 500));
document.body.addEventListener('mousewheel', debounce('wheel', wheelHandler, 700));
```

### 5-3-4 커링 함수

-   여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출되게끔 체인 형태로 구성한 함수. 필요한 인자 개수만큼 함수를 만들어 계속 리턴하다가 마지막에 모든 인자를 조합하여 리턴함.

-   한 번에 하나의 인자만 전달함. 중간 과정의 함수를 실행한 결과는 그 다음 인자를 받기 위해 대기할 뿐이므로 마지막 인자가 전달되기 전까지 원본 함수가 실행되지 않음.(부분 적용 함수는 여러 개의 인자를 전달할 수 있고 실행 결과를 재실행할 때 무조건 원본 함수가 실행됨.)

-   각 단계에서 받은 인자들은 모두 마지막 단계에서 참조되므로 GC의 수거 대상이 되지 않고 메모리에 쌓였다가 마지막 호출로 실행 컨텍스트가 종료된 후에 한꺼번에 GC의 수거 대상이 됨.

```javascript
var curry5 = function (func) {
    return function (a) {
        return function (b) {
            return function (c) {
                return function (d) {
                    return function (e) {
                        return func(a, b, c, d, e);
                    };
                };
            };
        };
    };
};
var getMax = curry5(Math.max);
console.log(getMax(1)(2)(3)(4)(5));
```

-   가독성 향상: ES6 화살표 함수를 사용해 커링 함수를 간결하게 작성 가능.

```javascript
var curry5 = (func) => (a) => (b) => (c) => (d) => (e) => func(a, b, c, d, e);
```
