# 4. 콜백함수

---

## 4-1 콜백함수란

콜백 함수: 다른 함수의 인자로 넘겨져, 제어권을 위임받은 코드가 적절한 시점에 실행하는 함수입니다. 예를 들어, 스폰지밥이 직접 일어나는 대신 알람시계를 맞춰놓고 일어나는 경우처럼 제어권을 알람시계에 넘기는 개념입니다.

---

## 4-2 제어권

#### 4-2-1 호출시점

호출 시점 - 제어권을 넘겨받은 함수는 그 함수의 호출 시점에 대한 제어권도 가진다.

    ```javascript
    var count = 0;
    var cbFunc = function () {
        console.log(count);
        if (++count > 4) clearInterval(timer);
    };
    var timer = setInterval(cbFunc, 300);
    // cbFunc();
    ```

→ 원래 cbFunc()를 수행한다면 그 호출주체와 제어권은 모두 사용자가 되죠.
→ setInterval로 넘겨주게 되면 그 호출주체와 제어권은 모두 setInterval이 돼요.
|code|호출 주체|제어권|
|cbFunc();|사용자|사용자|
|setInterval(cbFunc, 300);|setInterval|setInterval|

#### 4-2-2 인자

인자 - 콜백 함수를 넘겨받을 함수를 정의할 때, 그 콜백 함수의 인자를 넘겨받을 함수가 지정할 수 있다.

**`map`** 함수는 각 배열 요소를 변환하여 새로운 배열을 반환합니다. **기존 배열을 변경하지 않고**, 새로운 배열을 생성

```javascript
// map 함수에 의해 새로운 배열을 생성해서 newArr에 담고 있네요!
var newArr = [10, 20, 30].map(function (currentValue, index) {
    console.log(currentValue, index);
    return currentValue + 5;
});
console.log(newArr);

// -- 실행 결과 --
// 10 0
// 20 1
// 30 2
// [ 15, 25, 35 ]
```

그렇다면 콜백함수에서 여러분이 넣으신 **`currentValue, index`** 이 변수의 순서를 바꾸면?

```javascript
// map 함수에 의해 새로운 배열을 생성해서 newArr에 담고 있네요!
var newArr2 = [10, 20, 30].map(function (index, currentValue) {
    console.log(index, currentValue);
    return currentValue + 5;
});
console.log(newArr2);

// -- 실행 결과 --
// 10 0
// 20 1
// 30 2
// [ 5, 6, 7 ]
```

컴퓨터는 사람이 아니기 때문에, **`index - currentValue`**의 의미를 사람처럼 이해할 수 없다. 따라서 의도하지 않은 값이 나와버림

map 메서드를 호출해서 원하는 배열을 얻고자 한다면 정의된 규칙대로 작성, 이 모든것은 전적으로 map 메서드. 즉, 콜백 함수를 넘겨받은 코드에게 그 제어권이 있습니다.
인자(의 순서)까지도 제어권이 그에게 있는 것

#### 4-2-2 this

앞전 시간에서 우리는 콜백 함수도 함수이기 때문에 기본적으로는 this가 전역객체를 참조한다
제어권을 넘겨받을 코드에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조한다.

-   예시: `Array.prototype.map` 구현
    ```javascript
    Array.prototype.map = function (callback, thisArg) {
        var mappedArr = [];
        for (var i = 0; i < this.length; i++) {
            var mappedValue = callback.call(thisArg || window, this[i], i, this);
            mappedArr[i] = mappedValue;
        }
        return mappedArr;
    };
    ```
    -   `this`에는 `thisArg` 값이 있으면 그 값을, 없으면 전역 객체를 참조하게 됩니다.
    -   제어권을 넘겨받은 코드에서 `call`/`apply` 메서드를 사용해 콜백 함수의 `this`를 특정 객체로 바인딩할 수 있습니다.
    -   결론적으로, 콜백 함수의 `this`는 제어권을 넘겨받은 코드가 설정할 수 있습니다.

---

#### 4-3. 콜백 함수는 함수다

-   **메서드를 콜백 함수로 전달한 경우**
    ```javascript
    var obj = {
        vals: [1, 2, 3],
        logValues: function (v, i) {
            console.log(this, v, i);
        },
    };
    obj.logValues(1, 2); // {vals: [1, 2, 3], logValues: f} 1 2
    [4, 5, 6].forEach(obj.logValues); // Window {...} 4 0 ...
    ```
    -   객체의 메서드를 콜백 함수로 전달하면, 메서드가 아닌 일반 함수로 호출됩니다.
    -   중요한 점은 객체의 메서드를 콜백으로 넘겨도 이는 단지 함수로 호출될 뿐, 메서드로서의 기능을 하지 않는다는 것입니다.

---

#### 4-4. 콜백 함수 내부의 this에 다른 값 바인딩하기

객체의 메서드를 콜백 함수로 전달하면 해당 객체를 this로 바라볼 수 없다. 그럼에도 콜백 함수 내부에서 this가 객체를 바라보게 하고 싶다면 어떻게 해야 할까?

별도의 인지로 this를 받는 함수의 경우에는 여기에 원하는 값을 넘겨주면 되지만 그렇지 않은 경우에는 this의 제어권도 넘겨주게 되므로 사용자가 임의로 값을 바꿀 수 없다.

그래서 전통적으로 this를 다른 변수에 담아 콜백 함수로 활용할 함수에서는 this 대신 그 변수를 사용하게 하고, 이를 클로저로 만다는 방식이 많이 사용되었다.

-   **콜백 함수 내부의 this에 다른 값을 바인딩하는 방법(1) - 전통적인 방식**
    ```javascript
    var obj1 = {
        name: 'obj1',
        func: function () {
            var self = this;
            return function () {
                console.log(self.name);
            };
        },
    };
    var callback = obj1.func();
    setTimeout(callback, 1000);
    ```
    obj1.func 메서드 내부에서 self 변수에 this를 담고, 익명 함수를 선언과 동시에 반환한다.
    obj1.func를 호출하면 엎서 선언한 내부함수가 반환되어 callback 변수에 담긴다.
    callback을 setTimeout 함수에 인자로 전달하면 1초 뒤 callback이 실행되면서 obj1을 출력한다.
-   **콜백 함수 내부에서 this를 사용하지 않은 경우**
    ```javascript
    var obj1 = {
        name: 'obj1',
        func: function () {
            console.log(obj1.name);
        },
    };
    setTimeout(obj1.func, 1000);
    ```
    이는 앞선 예제에서 this를 사용하지 않았을 때의 결과이다. 훨씬 간결하고 직관적이지만 작성한 함수를 this를 이용해 다양한 상황에서 재활용할 수 없다.

처음부터 바라볼 객체를 명시적으로 obj1로 지정했기 때문에 어떤 방법으로든 다른 객체를 바라보게끔 할 수 없다.

-   **func 함수 재활용**

```javascript
var obj1 = {
    name: 'obj1',
    func: function () {
        console.log(obj1.name);
    },
};
var obj2 = {
    name: 'obj2',
    func: obj1.func,
};
var callback2 = obj2.func();
setTimeout(callback2, 1500);
var obj3 = { name: 'obj3' };
var callback3 = obj1.func.call(obj3);
setTimeout(callback3, 2000);
```

callback2에는 obj1의 func을 복사한 obj2의 func를 실행한 결과를 담아 이를 콜백으로 사용한다.
callback3의 경우 obj1의 func를 실행하면서 this를 obj3가 되도록 지정해 이를 콜백으로 사용한다.
이를 실행하면 실행 시점으로부터 1.5초 후에는 'obj2'가, 실행 시점으로부처 2초 후에는 'obj3'가 출력된다.

이는 번거롭긴 하지만 this를 우회적으로나마 활용함으로써 다양한 상황에서 원하는 객체를 바라보는 콜백 함수를 만들 수 있는 방법이다. 하지만 불편하고 메모리를 낭비하는 측면도 있다.

-   **콜백 함수 내부의 this에 다른 값을 바인딩하는 방법(2) - bind 메서드 활용**
    ```javascript
    var obj1 = {
        name: 'obj1',
        func: function () {
            console.log(this.name);
        },
    };
    setTimeout(obj1.func.bind(obj1), 1000);
    var obj2 = { name: 'obj2' };
    setTimeout(obj1.func.bind(obj2), 1500);
    ```

이를 보완한 방법이 바로 ES5에서 등장한 bind 메서드를 이용하는 방법이다.

ㅈㅈ
