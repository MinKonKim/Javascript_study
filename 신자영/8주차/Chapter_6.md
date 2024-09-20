# 6 프로토타입

---

## 6-1 프로토타입의 개념 이해

### 6-1-1 Constructor, Prototype, Instance

![image](https://github.com/user-attachments/assets/bf3db17b-3209-4450-91a6-6bc79de6d0ff)

-   **생성자 함수**(constructor)와 `new` 연산자를 함께 사용하면 새로운 **인스턴스**(instance)가 생성된다.
-   인스턴스는 `__proto__`라는 프로퍼티를 자동으로 가지며, 이는 생성자 함수의 `prototype`을 참조한다.

#### 예시:

```javascript
var suzi = new Person('Suzi');
suzi.__proto__.getName(); // undefined
```

-   이때, `suzi.__proto__`를 통해 메서드를 호출하면 `this`가 `suzi` 객체를 가리키지 않아 `undefined`가 출력된다.

#### **proto**와 prototype의 관계

-   인스턴스의 `__proto__` 속성은 생성자 함수의 `prototype` 속성을 참조한다.
-   인스턴스는 생성자 함수의 프로토타입에 정의된 메서드와 속성을 사용할 수 있다.

#### 예시:

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
};

var suzi = new Person('Suzi');

console.log(suzi.__proto__ === Person.prototype); // true
console.log(suzi.getName()); // "Suzi"
```

---

### 6-1-2 Constructor 프로퍼티

-   생성자 함수의 `prototype` 객체에는 `constructor`라는 프로퍼티가 존재하며, 이는 해당 생성자 함수를 참조한다.
-   `constructor`는 기본형 리터럴 변수(Number, String, Boolean)를 제외하면 값을 변경할 수 있다.

#### 예시:

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function () {
    console.log(`Hello, my name is ${this.name}`);
};

console.log(Person.prototype.constructor === Person); // true

var john = new Person('John');
console.log(john.constructor === Person); // true
john.sayHello(); // "Hello, my name is John"
```

---

###### 다양한 constructor 접근 방법

```javascript
// 생성자 함수 정의
function Person(name) {
    this.name = name;
}

// 생성자 함수의 prototype에 메서드 추가
Person.prototype.sayHello = function () {
    console.log(`Hello, my name is ${this.name}`);
};

// 생성자 함수의 prototype 객체의 constructor 프로퍼티 확인 방법

// 1. 직접 접근
console.log(Person.prototype.constructor === Person); // true

// 2. 인스턴스에서 접근
var john = new Person('John');
console.log(john.constructor === Person); // true

// 3. Object.getPrototypeOf 사용
console.log(Object.getPrototypeOf(john).constructor === Person); // true

// 4. instanceof 연산자 사용
console.log(john instanceof Person); // true

// 5. constructor 속성 직접 확인
console.log(john.constructor === john.__proto__.constructor); // true
```

---

## 6-2 프로토타입의 체인

#### 6-2-1 메서드 오버라이드

-   **메서드 오버라이드**란, 인스턴스가 동일한 이름의 프로퍼티나 메서드를 가지면 원래의 메서드 위에 새로운 메서드가 얹어지는 것을 의미한다.
-   기존 메서드가 제거되는 것이 아니라, 새 메서드가 덮어쓰여지는 형태로 동작한다.

```javascript
// 생성자 함수 정의
let Person = function (name) {
    this.name = name; // 생성자 함수로 객체를 초기화할 때 name 속성을 설정
};

// 생성자 함수의 prototype에 메서드 추가
Person.prototype.getName = function () {
    return this.name; // getName 메서드는 객체의 name 속성 값을 반환
};

// 인스턴스에서 메서드 오버라이드
let iu = new Person('지금');
iu.getName = function () {
    return '바로 ' + this.name;
};

// 오버라이드된 메서드 호출
console.log(iu.getName()); // "바로 지금"
```

#### 6-2-2 프로토타입 체인

-   모든 객체는 `__proto__`라는 숨겨진 링크를 통해 자신의 부모 객체(프로토타입)를 참조한다.
-   이 **프로토타입 체인**을 따라가면서 부모 객체의 메서드와 속성에 접근할 수 있으며, 최종적으로 `null`에 도달한다.
-   이를 통해 객체는 상속을 구현한다.

```javascript
let arr = [1, 2];

Array.prototype.toString.call(arr); // "1,2"
Object.prototype.toString.call(arr); // "[object Array]"

arr.toString(); // "1,2"

arr.toString = function () {
    return this.join('_');
};

arr.toString(); // "1_2"
```

-   `arr.toString()` 호출 시, 자바스크립트는 먼저 `arr`에서 `toString` 메서드를 찾는다.  
    없으면 `Array.prototype`에서, 그 다음에는 `Object.prototype`에서 찾아가며 메서드를 실행한다.

#### 6-2-3 객체 전용 메서드의 예외사항

-   모든 생성자 함수의 `prototype`은 객체이기 때문에 **Object.prototype**이 프로토타입 체인의 최상단에 존재한다.
-   객체 전용 메서드는 다른 데이터 타입에서 예상치 못한 동작을 유발할 수 있다.

```javascript
Object.prototype.getEntries = function () {
    let res = [];
    for (let prop in this) {
        if (this.hasOwnProperty(prop)) {
            res.push([prop, this[prop]]);
        }
    }
    return res;
};

let data = [
    ['object', { a: 1, b: 2, c: 3 }],
    ['number', 345],
    ['string', 'abc'],
    ['boolean', false],
    ['func', function () {}],
    ['array', [1, 2, 3]],
];

// 각 데이터 타입에 대해 getEntries 호출
data.forEach(function (datum) {
    console.log(datum[1].getEntries());
});
```

-   **예상 결과**:
    -   객체(`{ a: 1, b: 2, c: 3 }`): `[['a', 1], ['b', 2], ['c', 3]]`
    -   숫자, 문자열, 불리언 등: 빈 배열 반환.
    -   자바스크립트는 객체가 아닌 데이터 타입에 대해 원시 값을 래퍼 객체로 자동 변환하지만, 래퍼 객체에는 `getEntries` 메서드가 없기 때문에 예상치 못한 결과가 나올 수 있다.

#### 6-2-4 다중 프로토타입 체인

-   자바스크립트의 내장 데이터 타입들은 대부분 프로토타입 체인이 1~2단계로 끝나지만, 사용자 정의 객체에서는 무한히 이어지는 프로토타입 체인이 가능하다.
-   이를 통해 다양한 상속 구조를 구현할 수 있다.

```javascript
let Grade = function () {
    let args = Array.prototype.slice.call(arguments); // 인자들을 배열로 변환
    for (let i = 0; i < args.length; i++) {
        this[i] = args[i]; // Grade 객체의 속성으로 인자들을 할당
    }
    this.length = args.length; // Grade 객체의 length 속성 설정
};

// Grade 객체 생성
let g = new Grade(100, 80);
```

-   이 예시에서는 `Grade` 객체가 배열처럼 동작하며, 이를 통해 다중 상속 구조를 구현할 수 있다.

---
