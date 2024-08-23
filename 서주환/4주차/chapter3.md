# this

### <span style='color:#009000'>객체 지향 언어에서의 this는 클래스로 생성한 인스턴스 객체를 의미, <br/> js에서의 this는 어디서든 사용 가능

실행 컨텍스트가 생성될 때 함께 결정된다.<br/>
실행 컨텍스트는 함수를 호출할 때 생성, this는 함수를 호출할 때 결정된다.

## <span style='background-color:#f5f0ff'> 전역공간에서의 this

### <span style='color:#009000'>전역 공간에서의 this는 전역 객체를 가리킴. <br/>### 전역 객체는 런타임 환경에 따라 다른 이름과 정보를 가지고 있다.

- 브라우저: window<br/>
- Node.js: global

전역변수를 선언하면 JS엔진은 이를 전역객체의 프로퍼티로도 할당된다.

JS의 모든 변수는 실은 특정 객체의 프로퍼티로서 동작한다.

전역 변수를 선언하면 자바스크립트 엔진이 이를 자동으로 전역 객체의 프로퍼티로 할당하면서 추가적으로 해당 프로퍼티의 configurable속성(변경 및 삭제 가능성)을 false로 정의한다.

var로 선언한 전역변수와 전역객체의 프로퍼티는 호이스팅 여부와 configurable여부에서 차이를 보인다.

# 메서드로서 호출할 때 그 메서드 내부에서의 this

### <span style='color:#009000'>함수 vs 메서드<br/> : 미리 정의한 동작을 수행하는 코드 뭉치

이 둘을 구분하는 유이란 차이는 *독립성*에 있다

- 함수로서의 호출: 그 자체로 독립적인 기능을 수행<br/>
- 메서드로서의 호출: 자신이 호출한 대상 객체에 관한 동작을 수행<br/>

점 표기법, 대괄호 표기법, 어떤 함수를 호출할 때, 함수이름(프로퍼티명)앞에 객체가 명시돼 있는 경우 메서드로 호출한 것이고 그렇지 않으면 모두 함수로 호출한 것이다.

### <span style='color:#009000'>메서드 내부에서의 this

: this에는 호출한 주체에 대한 정보가 담긴다.<br/>
어떤 함수를 메서드로서 호출하는 경우, 호출 주체는 함수명(프로퍼티명) 앞의 객체이다.<br/> 점 표기법의 경우, 마지막 점 앞에 명시된 객체가 곧 this가 되는 것이다.

# 함수로서 호출할 때 그 함수 내부에서의 this

### <span style='color:#009000'> 함수 내부에서의 this</span>

: 함수로서 호출하는 것은 호출 주체(객체지향 언어에서의 객체)를 명시하지 않고 개발자가 코드에 직접 관여해서 실행한 것이기 때문에 호출 주체의 정보를 알 수 없다.<br/>
_함수에서의 this는 전역 객체를 가리킨다._

### <span style='color:#009000'> 매서드의 내부함수에서의 this</span>

```
var obj1 = {
    outer: function () {
        console.log(this) // obj1
        var innerFunc = function () {
            console.log(this) //window, obj2
        }
        innerFunc()

        var obj2 = {
            innerMethod: innerFunc
        }
        obj2.innerMethod()
    }
}
obj1.outer()
```

#### <순서>

```
1 객체 생성, 객체 내부에서 outer라는 프로퍼티가 있고 여기에 익명함수가 연결, 생성한 객체를 변수 obj1에 할당<br/>
15 obj1.outer 호출
2 obg1.outer 함수의 실행 컨텍스트가 생성되면서 호이스팅, 스코프 체인 정보 수집-> this를 바인딩
이 함수를 호출할 때 함수명인 outer 앞 (.)이 있었으므로 메서드로 호출한 것. obj1이 바인딩
3 obj1 객체 정보가 출력
4 호이스팅된 변수 innerFunc는 outer 스코프 내에서만 접근 할 수있는 지역변수, 지역변수에 익명함수 할당
7 innerFunc호출
4 innerFunc 함수의 실행 컨텍스트가 생성 -> 호이스팅, 스코프 체인 수집, this 바인딩 등을 수행
(.)이 없기에 함수로서 호출 this가 지정되지 않았고 자동으로 스코프 체인상의 최상위 객체인 전역객체(window)가 바인딩된다.
5 window 객체 정보가 출력
9 호이스팅된 변수 obj2 역시 outer 스코프 내에서만 접근할 수 있는 지역변수. 객체 재할당-> 객체에는 innerMethod라는 프로퍼티가 있고 앞서 정의도니 변수 innerFunc와 연결된 익명 함수가 연결
12 obj2.innerMethod를 호출
9 obj2.innerMethod 함수의 실행 컨텍스트가 생성. 호출할 때 함수명인 innerMethod 앞에 (.)이 있었으니 메서드로서 호출. this에 obj2가 바인딩된다.
10 obj2 객체 정보가 출력
```

=> this 바인딩에 관해서는 함수의 주변환경은 중요치 않고 해당 함수를 호출하는 구문 앞에 점 또는 대괄호 표기의 유무가 관건이다.

### <span style='color:#009000'> 매서드의 내부 함수에서의 this를 우회하는 방법</span>

#### 1. 변수 활용

```
var obj = {
    outer: function() {
        console.log(this)
        var innerFunc1 == function() {
            console.log(this)
        }
        innerFunc1()

        var self = this
        var innerFunc2 = function() {
            console.log(self)
        }
        innerFunc2()
    }
}
obj.outer()
```

innerFunc1 내부의 this는 전역객체를 가르킨다.
outer 스코프에서 self라는 변수에 this를 저장한 상태에서 호출한 innerFunc2의 경우 self엔 객체 obj가 출력

---

#### 2. self, this를 활용하여 메서드 안에서 this를 저장한 후 활용

---

#### 3. this를 바인딩 하지 않는 함수 -> ES6의 문법 중 하나인 arrow function을 도입하는 것<br/> 화살표 함수는 실행 컨텍스트를 생성할 때 this바인딩 과정 자체가 빠지기 때문에 상위 스코프의 this를 그대로 활용

그 밖에도 call, apply 등의 매서드를 활용해 함수를 호출할 때 명시적으로 this를 지정하는 방법이 있다.

#### - call 메서드

: 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령. call매서드의 첫 번째 인자를 this로 바인딩하고, 이후의 인자들을 호출할 함수의 매개변수로 한다.

```
function.prototype.call(thisArg[,arg1[,arg][,..]])
```

#### - apply 메서드

: call메서드와 기능적으로 완전히 동일. 차이점은 두 번째 인자로 매개변수의 '배열'을 받는다.

```
function.prototype(thisArg[,argArray])

```

# 콜백 함수 호출 시, 그함수 내부에서의 this

함수 a의 제어권을 다른 함수 or 메서드 b에게 넘겨주는 경우 함수 a를 콜백 함수라 한다.<br/>
함수 a는 함수b의 내부 로직에 따라 실행, this역시 함수 b 내부 로직에서 정한 규칙에 따라 값이 결정, 제어권을 받은 함수에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조하게 된다.

콜백 함수의 제어권을 가지고 있는 함수(메서드)가 콜백 함수에서의 this를 결정. 정의하지 않는 경우엔 기본적으로 전역객체를 바라본다.

# 생성자 함수 내부에서의 this

: 어떤 공통된 성질을 지니는 객체들을 생성하는데 사용하는 함수
객체 지향 언어에서의 생성자- 클래스 / 객체- 인스턴스

```
var Cat = function (name,age) {
    this.bark = '야옹'
    this.name = name
    this.age = age
}
var choco = new Cat('초코', 7)
var nabi = new Cat('나비', 5)
console.log(choco, nabi)
```

#### <결과값>

```
Cat { bark: '야옹', name: '초코', age: 7 }
Cat { bark: '야옹', name: '나비', age: 5 }
```

함수 내부에서 this에 접근하여 bark, name, age 프로퍼티에 값을 각각 대입한다.

# 명시적으로 this를 바인딩하는 방법

this에 별도의 대상을 바인딩하는 방법

## <span style='background-color:#f5f0ff'> call 메서드

: 임의의 객체를 this로 지정할 수 있다.

```
var func = function (a,b,c) {
    console.log(this, a, b, c)
}

func(1,2,3)
func.call({x:1}, 4, 5, 6)
```

<결과값>

```
window{...}1 2 3
{ x: 1 } 4 5 6
```

## <span style='background-color:#f5f0ff'> apply 메서드

: 배열의 요소들을 호출할 함수의 매개변수로 지정한다는 점(그 외에는 call 메서드와 기능적으로 동일하다)

```
var func = function (a, b, c) {
  console.log(this, a, b, c);
};
func.apply({ x: 1 }, [4, 5, 6]);

var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};
obj.method.apply({ a: 4 }, [5, 6]);

```

<결과값>

```
{ x: 1 } 4 5 6
4 5 6
```

### <span style='color:#009000'>두 메서드의 활용</span>

1. 유사배열개체에 메서드를 적용
   : 객체에는 배열 메서드를 직접 적용할 수 없다.
   그러나 키가 0 또는 양의 정수인 프로퍼티가 존재하고 length 프로퍼티의 값이 0 또는 양의 정수인 객체 , 배열의 구조와 유사한 객체의 경우 배열 매서드를 차용할 수 있다.

> slice 메서드 = 시작 인덱스값과 마지막 인덱스값을 받아 시작값부터 마지막값의 앞부분까지의 배열 요소를 추출하는 메서드인데 매개변수를 아무것도 넘기지 않을 경우엔 원본 배열의 얕은 복사본을 반환

call 메서드를 이용해 원본인 유사배열객체의 얕은 복사를 수행한 것인데, slice메서드가 배열 메서드이기에 복사본 배열로 반환하게 된 것이다.

문자열의 경우 length 프로퍼티가 읽기 전용이기에 원본 문자열에 변경을 가하는 메서드(push, pop, unshift, splice 등)는 에러를 던지며, concat처럼 대상이 반드시 배열이어야 하는 경우에는 에러는 나지 않지만 제대로 된 값을 얻을 수 없다.

ES6에서는 유사배열 객체 또는 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는 Array.from 메서드를 새로 도입했다.

```
var obj = {
    0:'a',
    1:'b',
    2:'c',
    lenghth: 3
}
var arr = Array.from(obj)
console.log(arr)
```

<결과값>

```
[ 'a', 'b', 'c' ]
```

## <span style='background-color:#f5f0ff'>생성자 내부에서 다른 생성자를 호출

: 생성자 내부에 다른 생성자와 공통된 내용이 있을 경우, call or apply를 이용해 다른 생성자를 호출하면 간단하게 반복을 줄일 수 있다.

### 여러 인수를 묶어 하나의 배열로 전달하고 싶을 때 - apply활용

최대/최솟값을 구할 때 Math.max/Math.min 메서드에 apply를 적용하면 간편해진다
ES6에서는 spread operator를 이요하면 apply적용보다 더욱 간편하다.

```
const number = [10, 20, 3, 19, 25, 39]
const max = Math.max(...number)
const min = Math.min(...number)
console.log(max,min)
```

<결과값>

```
39 3
```

명시적으로 별도의 this를 바인딩하면서 함수 또는 메서드를 실행하는 방법이 있지만, 오히려 this를 예측하기 어렵게 만들어 코드 해석을 방해한다는 단점이 있다.

## bind 메서드
```
Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])
```

call과 비슷하지만 즉시 호출하지는 않고 넘겨 받은 this 및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 메서드
새로운 함수를 호출할 때 인수를 넘기면 그 인수들은 기존 bind 메서드를 호출할 때 전달했던 인수들의 뒤에 이어서 등록된다.

## 화살표 함수의 예외사항
함수 내부에는 this가 아예 없으며, 접근하고자 하면 스코프체인상 가장 가까운 this에 접근

### 명시적 this 바인딩이 없는이상 늘 성립한다.

- 전역공간에서의 this는 전역객체를 참조한다.
- 함수를 메서드로서 호출한 경우 this는 메서드 호출 주체를 참조
- 함수를 함수로서 호출한 경우 this는 전역객체를 참조. 메서드의 내부함수에서도 같다
- 콜백함수 내부에서의 this는 해당 콜백 함수의 제어권을 넘겨받은 함수가 정의한 바에 따르면, 정의하지 않는 경우에는 전역객체를 참조
- 생성자 함수에서의 this는 생성될 인스턴스를 참조

### 명시적 this 바인딩. this를 예측할 수 있다.

- call, apply 메서드는 this를 명시적으로 지정하면서 함수 또는 메서드를 호출한다.
- bind 메서드는 this 및 함수에 넘길 인수를 일부 지정해서 새로운 함수를 만든다.
- 요소를 순회하면서 콜백 함수를 반복 호출하는 내용의 일부 메서드는 별도의 인자로 this를 받기도 한다.