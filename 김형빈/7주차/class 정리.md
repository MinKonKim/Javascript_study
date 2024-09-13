<h2>클래스의 기본 사용법</h2>
<h3>Constructor</h3>

- Class의 생성자 함수
- 객체를 초기화하는 역할

```javascript
class Person {
  // 생성자 (constructor)
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 메서드
  sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  }
}

const person = new Person("Alice", 20);
```

<h3>Getter와 Setter</h3>

- getter
  - `get` 키워드 사용
  - 속성값을 반환하는 메서드
- setter
  - `set` 키워드 사용
  - 속성값을 설정하는 메서드

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

<h3>상속</h3>

- Class는 상속을 통해 다른 Class의 기능을 물려받을 수 있다
    - `extends` 키워드를 사용하여 상속
    - `subclass`, `derived class` 또는 `자식 클래스`: 상속 받는 Class
    - `superclass`,`base class` 또는 `부모 클래스`: 상속 하는 Class

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

let d = new Dog("Mitzie");

d.speak(); // "Mitzie barks."
```

- `super` 키워드를 사용하여 부모 클래스의 생성자나 메서드를 호출

```js
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 부모 클래스의 constructor 호출
    this.breed = breed;
  }
}
```

<h3>Static Method</h3>

- `static` 키워드를 사용하여 Class 레벨의 메소드를 정의
- 인스턴스를 만들 필요가 없을 떄 사용

```javascript
class Calculator {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }
}

console.log(Calculator.add(1, 2)); // 3
console.log(Calculator.subtract(3, 2)); // 1
```

<h3>추상 클래스</h3>

- 상속받은 클래스에서 받드시 구현해야 하는 메서드를 정의
- 자바스크립트는 공식적으로 추상 클래스를 지원하지 않지만, 추상화 패텅르 통해 비슷한 기능 구현 가능

```javascript
class Animal {
  constructor(name) {
    if (new.target === Animal) {
      throw new Error("Cannot instantiate an abstract class.");
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

<h3>프라이빗 필드</h3>

- 클래스 외부에서 접근할 수 없는 필드
- `#` 기호를 사용하여 선언

```js
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

<h3>클래스 필드</h3>

- `constructor` 함수 외부에서 직접 클래스 필드를 정의

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
