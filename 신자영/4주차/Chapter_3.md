# 3. this

## 3-1 상황에 따라 달라지는 this

자바스크립트에서 this는 기본적으로 실행 컨텍스트가 생성될 때(실행 컨텍스트의 ThisBinding에서) 함께 결정된다. 일반적으로 실행 컨텍스트는 함수를 호출할 때 생성되므로, this는 함수를 호출할 때 결정된다고 볼 수 있다. 하지만 함수를 어떤 방식으로 호출하느냐에 따라 값이 달라지기 때문에 각 상황별로 this의 값을 알아보자.

#### 3-1-1 전역 공간 this는 전역 객체를 가리킨다.

전역 공간 this는 전역 객체를 가리킨다.(개념상 전역 컨텍스트를 생성하는 주체가 바로 전역 객체)

브라우저 환경

``` javascript
console.log(this);
console.log(window);
console.log(this === window); //true
```

Node.js 환경

``` javascript
console.log(this);
console.log(global);
console.log(this === global); //true
```

전역변수와 전역객체

``` javascript
var a = 1
console.log(a); //1
console.log(window.a); //1
console.log(this.a); //1
```

전역공간에서 선언한 변수 a에 1을 할당했을 뿐인데 window.a 와 this.a 모두 1이 출력
전역공간에서의 this는 전역객체를 의미
두값이 같은 값을 출력하는것은 당연 (그 값이 1인것이 의아)[왜?][ window.a 와 this.a 이거인가?]
자바스크립트의 모든 변수는 실은 특정객체의 프로퍼티로서 동작
-> var연상자를 이용해 변수 선언하더라고 실제 자바스크립트 엔진은 어떤 특정 객체(실행 컨텍스트는 변수를 수집해서 프로퍼티로 저장)의 프로퍼티로 인식

"전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다"

#### 3-1-2 메서드로서 호출할때 그 메서드 내부에서의 this

##### 함수 vs 메서드

함수는 그 자체로 독립적인 기능을 수행하는 것이고, 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행하는 것이다. 이 둘의 호출 방식은 함수 앞에 점(.)이 있는지 여부로 간단하게 구분할 수 있다.

``` javascript
var func = function(x) {
console.log(this, x);
}

//함수로서 호출
func(1); // window, 1

var obj = {
method: func
}

//메서드로서 호출
obj.method(2); //{ method: [Function: func] } 2
```

##### 메서드 내부에서의 this

메서드로서 호출하면 this는 호출한 주체(객체)에 대한 정보를 가리킨다.
메서드로서 내부의 this에는 호출한 주체에 대한 정보가 담긴다.
호출한 메서드 바로 앞의 주체에 대한 정보가 담긴다.

``` javascript
var obj = {
    methodA: function(){console.log(this);},
    inner: {methodB: function(){console.log(this);}
    }
};

// methodA 호출 주체는 obj
obj.methodA(); // obj
obj['methodA'](); // obj

// methodB 호출 주체는 inner
obj.inner.methodB(); // obj.inner
obj.inner['methodB'](); // obj.inner
obj['inner'].methodB(); // obj.inner
obj['inner']['methodB'](); // obj.inner
```

#### 3-1-3 함수로서 호출할때 그 메서드 내부에서의 this

##### 함수 내부에서의 this

함수로서 호출하면 this는 일반적으로 전역 객체를 가리킨다.
함수를 함수로서 호출할 경우 this가 지정되지 않는다. 실행 컨텍스트를 활성화할 당시에 this가 지정되지 않는 경우 this는 전역 객체를 바라보기 때문에, 함수에서의 this는 전역 객체를 가리킨다.

##### 메서드의 내부함수에서의 this

메서드 내부의 함수에서도 함수로서 호출되는 경우는 전역 객체를 가리킨다.

``` javascript
var obj1 = {
    outer: function() {
        console.log(this);

        var innerFunc = function() {
            console.log(this);
        }

        innerFunc(); //window (전역객체)

        var obj2 = {
            innerMethod: innerFunc
        };

        obj2.innerMethod(); //obj2
    }
};

obj1.outer(); //obj1
```

##### 메서드의 내부 함수에서의 this를 우회하는 방법

##### this 바인딩 하지 않는 함수

화살표 함수의 등장
함수로서 호출할 때, 호출 주체가 없을 경우 자동으로 전역 객체를 바인딩하지 않고, 호출 당시 주변 환경의 this를 그대로 상속받아 사용할 수 있다면 좋을 것 같다. 그게 자바스크립트의 스코프 체인과 일관성을 지키는 방식이기 때문이다.

이러한 문제점을 해결하기 위해 등장한 것이 화살표 함수이다. ES6에서는 함수 내부에서 this가 전역객체를 바라보는 문제를 보완하고자, this를 바인딩하지 않는 화살표 함수를 도입했다. 화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지게 되어, 상위 스코프의 this를 그대로 활용할 수 있다.

``` javascript
var obj1 = {
outer: function() {
console.log(this);

        var innerFunc = () => {
            console.log(this);
        }

        innerFunc(); //obj1 (상위 스코프의 this)

    }

};

obj1.outer(); //obj1
```

#### 3-1-4 콜백 함수 호출 시 그 함수 내부에서의 this

콜백 함수는 기본적으로 전역 객체를 가리킨다.
콜백 함수도 함수이기 때문에 기본적으로는 this가 전역 객체를 참조한다.
하지만 제어권을 받은 함수에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 가리킨다.

```
// 0.3초 뒤에 전역객체 출력
setTimeout(function() { console.log(this); //window }, 300);

// 전역객체와 배열의 각 요소 출력
[1, 2, 3, 4, 5].forEach(function(x) {
console.log(this, x); //window, eachElement
});

// addEventListener는 콜백 함수를 호출할 때 자신의 this를 상속하도록 지정되어 있음
document.body.innerHTML += `<button id="a">클릭</button>`;
document.body.querySelector('#a')
.addEventListener('click', function(e) {
console.log(this, e); // button element, 이벤트 객체
});
```

#### 3-1-5 생성자 함수 내부에서의 this

생성자 내부 함수는 새로 만들 인스턴스 자신을 가리킨다.
생성자 함수는 공통된 성질을 지니는 객체들을 생성하는 데 사용하는 함수로, new 명령어와 함께 함수를 호출하면 해당 함수가 생성자 함수로서 동작한다.
생성자 함수로서 호출되는 경우 내부에서의 this는 곧 새로 만들 구체적인 인스턴스 자신이 된다.

```
var Cat = function(name, age){
this.bark = '야옹';
this.name = name;
this.age = age;
};

var choco = new Cat('초코', 7);
var nabi = new Cat('나비', 5);

//Cat의 this는 각각 전달된 인스턴스 객체를 가리킴
console.log(choco); // Cat { bark: '야옹, name: '초코', age: 7 }
console.log(nabi); //Cat { bark: '야옹, name: '나비', age: 5 }
```

## 3-2 명시적으로 this 바인딩 하는 방법

명시적으로 this를 바인딩하는 방법
상황에 따라 달라지는 this를 원하는 값으로 바인딩하는 방법을 알아보자.

#### 3-2-1 call메서드 3-2-2 apply메서드

call 메서드는 호출 주체인 함수를 즉시 실행하도록 하는 명령으로, 첫 번째 인자를 this로 바인딩하고 이후의 인자들을 호출할 함수의 매개변수로 전달하면 된다.
apply 메서드는 call과 동일한 역할을 수행하며, 두 번째 인자를 배열로 받는다는 점만 다르다.

```
var func = function (a, b, c) {
console.log(this, a, b, c);
}

func(1, 2, 3); // window 1 2 3
func.call({x: 1}, 4, 5, 6); // {x: 1} 4 5 6
func.apply({x: 2}, [4, 5, 6]); // {x: 2} 4 5 6
```

#### 3-2-3 call, apply 메서드 활용

유사배열객체에 call, apply 메서드를 이용하면 배열 메서드를 활용할 수 있게 된다.
ES6에서는 이를 위해 Array.from(순회 가능한 모든 종류의 데이터 타입을 배열로 전환) 메서드를 도입했다.

#### 3-2-4 bind 메서드 활용

bind 메서드는 call과 비슷하지만, 즉시 호출하지 않고 넘겨받은 this 및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 메서드이다.
함수에 this를 미리 적용할 때 혹은 부분 적용 함수를 구현할 때 활용할 수 있다.
bind를 통해 새로 만든 함수는 name 프로퍼티에 bound라는 접두어가 붙는다는 특징이 있다. 따라서 call이나 apply보다 코드를 추적하기 수월하다.

```
var func = function(a, b, c, d){
console.log(this, a, b, c, d);
};

func(1, 2, 3, 4); //window 1 2 3 4

//this 적용
var bindFunc1 = func.bind({ x:1 });
bindFunc1(5, 6, 7, 8); //{ x:1 } 5 6 7 8

//부분 함수 적용
var bindFunc2 = func.bind({ x:1 }, 4, 5);
bindFunc2(6, 7); //{ x:1 } 4 5 6 7
bindFunc2(8, 9); //{ x:1 } 4 5 8 9
```

#### 3-2-5 화살표 함수의 예외사항

#### 3-2-6 별도의 인자로 this를 받는 경우 (콜백 함수 내에서의 this)
