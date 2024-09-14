### 클래스와 인스턴스의 개념 이해

자바스크립트는 프로토 타입 기반 언어라서 '상속'개념이 존재하지 않지만, ES6 이후 클래스 문법이 추가되고, 클래스 문법에서도 일정 부분은 프로토타입을 활용하고 있습니다.

![클래스 간의 상하관계](https://github.com/user-attachments/assets/1f06e429-7deb-4ecf-b681-27a5d96211fc)

#### 클래스 (Class)

클래스는 사물의 공통적인 특성을 모아 정의한 추상적인 개념으로, **상위 클래스(SuperClass)**와 **하위 클래스(SubClass)**로 나눌 수 있습니다.

-   **상위 클래스 (SuperClass)**: 공통적인 속성과 메서드를 가진 기본 클래스.
-   **하위 클래스 (SubClass)**: 상위 클래스의 속성을 상속받아 구체적인 요구 사항이 추가되거나 변경된 클래스.

#### 인스턴스 (Instance)

인스턴스는 단 하나의 class만을 기반으로 만들어진 실존하는 객체입니다

### 자바스크립트의 클래스

-   생성자 함수 Array를 new 연산자와 함께 호출하면 인스턴스가 생성됩니다.
-   Array를 일종의 클래스라고 하면, Array의 prototype 객체 내부 요소들이 인스턴스에 상속된다고 볼 수 있다.
-   인스턴스에 상속되는지(인스턴스가 참조되는지) 여부에 따라 **스태틱 멤버**와 프로토타입 메서드로 구분됩니다.

![프로토타입 클래스 개념 적용](https://github.com/user-attachments/assets/80469b92-7a52-451a-be51-da95db410503)

```javascript
// 생성자
var Rectangle = function (width, height) {
    this.width = width;
    this.height = height;
};

// (프로토타입) 메서드
Rectangle.prototype.getArea = function () {
    return this.width * this.height;
};

// 스태틱 메서드
Rectangle.isRectangle = function (instance) {
    return instance instanceof Rectangle && instance.width > 0 && instance.height > 0;
};

var rect1 = new Rectangle(3, 4);

console.log(rect1.getArea()); // 12\
// 잘못된 호출: rect1은 스태틱 메서드를 호출할 수 없다.
console.log(rect1.isRectangle()); // Error: rect1.isRectangle is not a function
console.log(Rectangle.isRectangle(rect1)); // true
```

-   getArea는 rect1.**proto**.getArea에 접근하는데, **proto**가 생략했으므로, this가 rect1채로 실행되어 해당 메서드의 값이 반환됩니다. 이처럼 인스턴스에 직접 호출할 수 있는 메서드가 프로토타입 메서드라고 합니다.
-   rect1에 isRectangle메서드가 있는지 검색했는데 없고, rect1.**proto**에도 없으며, Object.prototype에도 없는 걸 알고, 함수가 아니어서 실행할 수 없다는 에러가 발생합니다. 이렇게 인스턴스에서 직접 접근할 수 없는 메서드를 스태틱 메서드라고 합니다.

### 클래스 상속

자바스크립트에서 클래스 상속을 구현하기 위한 방법은 여러 가지가 있습니다:

1. **SubClass.prototype에 SuperClass의 인스턴스를 할당**하고, 필요한 프로퍼티를 삭제하는 방법.
2. **빈 함수(Bridge)**를 활용하는 방법.
3. **Object.create**를 이용하는 방법.

#### ES6의 클래스 및 클래스 상속

ES6에서는 클래스를 정의하는 문법이 추가되었습니다. 아래는 ES5와 ES6의 클래스 문법을 비교한 예시입니다.

```javascript
// ES5
var ES5 = function (name) {
    this.name = name;
};

ES5.staticMethod = function () {
    return this.name + ' staticMethod';
};

ES5.prototype.method = function () {
    return this.name + ' method';
};

var es5Instance = new ES5('es5');
console.log(ES5.staticMethod); // ES5 staticMethod
console.log(es5Instance.method()); // es5 method

// ES6
var ES6 = class {
    constructor(name) {
        this.name = name;
    }

    static staticMethod() {
        return this.name + ' staticMethod';
    }

    method() {
        return this.name + ' method';
    }
};

var es6Instance = new ES6('es6');
console.log(ES6.staticMethod()); // ES6 staticMethod
console.log(es6Instance.method()); // es6 method
```

-   클래스 문법에서 constructor는 ES5의 생성자 함수와 동일한 역할을 수행합니다.
-   static 키워드는 해당 메서드가 static 메서드임을 알리는 내용으로 생성자 함수(클래스) 자신만 호출할 수 있습니다.
-   method()는 prototype 객체 내부에 할당되는 메서드로, 인스턴스가 프로토타입 체이닝을 통해 자신의 것처럼 호출할 수 있는 메서드입니다.

### ES6의 클래스 상속 예시

ES6 클래스 문법을 사용하여 상속을 구현할 수 있습니다.

```javascript
var Rectangle = class {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
};

var Square = class extends Rectangle {
    constructor(width) {
        super(width, width);
    }

    getArea() {
        console.log('size: ', super.getArea());
    }
};

var square = new Square(5);
square.getArea(); // size: 25
```

-   ES6의 클래스 문법에서의 상속받는 SubClass를 만들기 위해 class 명령 뒤 extends 키워드와 상속받고 싶은 SuperClass를 적으면 상속 관계 설정이 끝납니다.
-   constructor 내부에는 super라는 키워드를 함수처럼 사용할 수 있는데, 이는 SuperClass의 constructor를 실행합니다.

### Static Method

-   **정의 및 호출**: `static` 키워드로 정의된 메서드는 클래스 자체에 소속되며, 클래스의 인스턴스가 아닌 클래스 이름으로 호출할 수 있습니다. 이런 메서드는 객체의 상태에 접근할 수 없으므로, 일반적으로 인스턴스와 무관한 유틸리티 기능을 구현할 때 사용됩니다.

-   **용도**: 보통 인스턴스 생성 없이 호출할 수 있는 메서드가 필요한 경우에 유용합니다. 예를 들어, 수학적 계산, 데이터 변환 등의 기능을 구현할 때 사용됩니다.

**예제:**

```javascript
class MathHelper {
    static add(a, b) {
        return a + b;
    }
}

console.log(MathHelper.add(2, 3)); // 5
```

### Getter와 Setter

-   **Getter**: 속성의 값을 읽기 위한 메서드로, 속성처럼 사용할 수 있습니다. `get` 키워드를 사용하여 정의합니다.
-   **Setter**: 속성의 값을 설정하기 위한 메서드로, 속성처럼 사용할 수 있습니다. `set` 키워드를 사용하여 정의합니다.

-   **용도**: 속성 값을 제어하거나 유효성 검사를 할 때 유용합니다. 특히, 내부 상태를 보호하고 데이터 무결성을 유지하는 데 도움이 됩니다.

**예제:**

```javascript
class Person {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName;
    }
}

const person = new Person('John');
console.log(person.name); // John
person.name = 'Jane';
console.log(person.name); // Jane
```

### 프라이빗 필드 및 접근 제어

-   **프라이빗 필드**: `#` 기호를 사용하여 정의된 필드는 클래스 외부에서 접근할 수 없습니다. 이는 클래스의 내부 상태를 보호하고 데이터 은닉을 통해 객체의 무결성을 유지하는 데 사용됩니다.

-   **용도**: 클래스의 내부 구현 세부사항을 외부에 노출하지 않음으로써, 클래스 사용자와 구현 간의 의존성을 줄이고, 데이터 무결성을 유지합니다.

**예제:**

```javascript
class Counter {
    #count = 0; // Private field

    increment() {
        this.#count++;
    }

    getCount() {
        return this.#count;
    }
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount()); // 1
console.log(counter.#count); // SyntaxError: Private field '#count' must be declared in an enclosing class
```

### 추상 클래스 패턴 적용

-   **추상 클래스**: 직접 인스턴스화할 수 없는 클래스이며, 다른 클래스에서 상속받아 구현해야 합니다. 추상 클래스는 공통의 인터페이스를 정의하고, 이를 상속받은 클래스가 구체적인 구현을 제공하도록 강제합니다.

-   **용도**: 공통 기능을 정의하고, 이를 기반으로 다양한 세부 구현을 강제할 때 유용합니다. 주로 객체 지향 프로그래밍에서 상속을 활용하여 코드의 재사용성과 유연성을 높이는 데 사용됩니다.

**예제:**

```javascript
class Animal {
    constructor(name) {
        if (new.target === Animal) {
            throw new Error('Cannot instantiate an abstract class.');
        }
        this.name = name;
    }

    speak() {
        throw new Error("Method 'speak()' must be implemented.");
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}

const dog = new Dog('Rex');
dog.speak(); // Rex barks.
```

### 클래스 필드의 활용

-   **클래스 필드**: 클래스 정의에서 직접 초기화된 변수로, 모든 인스턴스에서 공통적으로 적용됩니다. 클래스 필드는 객체가 생성될 때 기본값을 설정하거나 특정 값을 유지하는 데 유용합니다.

-   **용도**: 클래스의 상태를 추적하거나, 인스턴스 간에 공유되는 데이터를 관리할 때 유용합니다.

**예제:**

```javascript
class Person {
    name = 'John'; // 클래스 필드

    constructor(age) {
        this.age = age;
    }
}

const person = new Person(30);
console.log(person.name); // John
```
