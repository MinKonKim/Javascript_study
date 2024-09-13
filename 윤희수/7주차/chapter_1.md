##클래스 </br>

- 클래스(class)는 객체 지향 프로그래밍에서 중요한 개념으로, 객체를 만들기 위한 '청사진(설계도)'이라고 생각하시면 됩니다. 쉽게 말해, 클래스는 여러 객체(데이터와 기능이 모인 것)를 만들기 위한 틀 같은 것입니다.</br>

#클래스의 기본 구조</br>

1.클래스 정의 : 클래스 정의: class 키워드를 사용해서 클래스를 정의할 수 있습니다. 이 클래스 안에는 여러 특성(속성)과 동작(메서드)이 들어갈 수 있습니다. </br>

```javascript
class Person {
  // 생성자 함수
  constructor(name, age) {
    this.name = name; // 속성
    this.age = age;   // 속성
  }

  // 메서드
  sayHello() {
    console.log(`안녕하세요! 저는 ${this.name}입니다.`);
  }
}
```

2. 생성자 함수 : constructor는 객체를 생성할 때 자동으로 호출되는 함수입니다. 클래스에서 새로운 객체를 만들 때, 이 함수가 실행되면서 속성들을 초기화합니다. </br>
3. 메서드 : 클래스 안에서 사용할 수 있는 함수입니다. 위 예제에서는 sayHello가 메서드입니다. 이 메서드는 객체가 어떤 동작을 할지 정의해줍니다.</br>
4. 객체 생성 : 클래스를 이용해 객체를 만들려면 new 키워드를 사용합니다.</br>
```javascript
const person1 = new Person("철수", 15);
person1.sayHello(); // "안녕하세요! 저는 철수입니다."
```

------------------------------------------------------------
##상속 및 상위 클래스와의 상호 작용</br>
- 상속은 프로그래밍에서 새로운 클래스를 만들 때 기존의 클래스를 바탕으로 만들어내는 개념입니다. 이렇게 하면 기존 클래스의 기능을 그대로 가져오면서, 필요한 부분만 추가하거나 변경할 수 있습니다. 이걸 쉽게 말하면 "물려받는 것"이라고 생각하면 됩니다.</br>

상속의 기본 개념</br>
- 상위 클래스(부모 클래스): 원래 존재하던 클래스입니다. 상위 클래스라고 부르는 이유는 이 클래스의 기능을 다른 클래스가 물려받기 때문입니다.</br>

- 하위 클래스(자식 클래스): 상위 클래스를 상속받아 만들어진 새로운 클래스입니다. 이 클래스는 상위 클래스의 기능을 물려받아 사용할 수 있습니다.</br>

* 예시
아래는 Animal이라는 상위 클래스를 만들어서, 이를 상속받은 Dog라는 하위 클래스를 만드는 예시입니다.</br>

```javascript
// 상위 클래스
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name}가 소리를 냅니다.`);
  }
}

// 하위 클래스
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 상위 클래스의 생성자 호출
    this.breed = breed; // 새로운 속성 추가
  }

  // 메서드 오버라이딩 (상위 클래스의 메서드를 재정의)
  speak() {
    console.log(`${this.name}가 멍멍 소리를 냅니다.`);
  }
}

const myDog = new Dog("바둑이", "진돗개");
myDog.speak(); // "바둑이가 멍멍 소리를 냅니다."
```
상속에서의 상호 작용</br>
-super 키워드: super는 상위 클래스의 생성자나 메서드를 호출할 때 사용됩니다. 하위 클래스에서 상위 클래스의 기능을 사용하고 싶을 때 super를 호출하여 상위 클래스의 메서드나 속성을 재사용할 수 있습니다.</br>
위 예시에서 super(name)은 상위 클래스 Animal의 생성자를 호출하여 name 속성을 설정하는 역할을 합니다.</br>

-메서드 오버라이딩: 하위 클래스에서 상위 클래스의 메서드를 재정의할 수 있습니다. </br>
위 예시에서 Dog 클래스는 speak 메서드를 오버라이딩해서, Animal의 speak 메서드를 덮어쓰고 강아지에 맞는 소리를 내도록 변경했습니다.</br>

-----------------------------------------------------------
 정적 메서드 (Static Methods)</br>

-정적 메서드</br>
정적 메서드는 클래스의 인스턴스(객체)가 아니라 클래스 자체에서 직접 호출할 수 있는 메서드입니다.</br>
일반적으로 클래스에 속한 메서드는 객체를 만들어서 그 객체를 통해 호출하지만, 정적 메서드는 객체를 만들지 않고도 바로 사용할 수 있습니다.</br>

* 예시
```javascript
class Calculator {
  // 정적 메서드
  static add(a, b) {
    return a + b;
  }
}

// 객체를 만들지 않고 클래스에서 바로 메서드 호출
console.log(Calculator.add(5, 3)); // 8
```
-Calculator 클래스의 add 메서드는 정적 메서드입니다. 그래서 new Calculator() 같은 객체를 만들지 않고, 바로 Calculator.add(5, 3) 이렇게 클래스에서 직접 호출할 수 있습니다.</br>
언제 사용하나?: 정적 메서드는 객체마다 달라질 필요 없는, 클래스 전반에 공통적인 기능이 있을 때 사용합니다. 예를 들어 계산기처럼 특정 계산을 해야 하는 상황에서 정적 메서드를 사용할 수 있습니다.</br>

 -------------------------------------
 Getters와 Setters</br>
 Getters와 Setters는 객체의 속성에 접근하고 수정하는 방법을 보다 편리하게 제공하는 기능입니다.</br>

 - Getter: 객체의 속성 값을 읽을 때 사용합니다. 마치 속성처럼 호출되지만, 사실 함수처럼 동작합니다.</br>
 - Setter: 객체의 속성 값을 설정(수정)할 때 사용합니다. 특정 값을 변경할 때 추가적인 로직이 필요할 경우 유용합니다.</br>

* 예시
```javascript
class Person {
  constructor(name) {
    this._name = name; // 속성 이름 앞에 언더스코어(_)를 붙여서 직접 접근을 피하게 함
  }

  // Getter
  get name() {
    return this._name;
  }

  // Setter
  set name(newName) {
    if (newName.length > 0) {
      this._name = newName;
    } else {
      console.log("이름이 비어있을 수 없습니다.");
    }
  }
}

const person1 = new Person("철수");
console.log(person1.name); // Getter 호출, "철수" 출력

person1.name = "영희"; // Setter 호출
console.log(person1.name); // "영희" 출력

person1.name = ""; // Setter 호출, 오류 메시지 출력

```
-Person 클래스에서는 name 속성을 바로 사용하지 않고, _name이라는 속성을 대신 사용합니다. Getter와 Setter를 통해 외부에서 속성에 접근하고 값을 설정할 수 있습니다.</br>
get name()은 객체의 name 속성 값을 가져올 때 실행됩니다.</br>
set name(newName)은 새로운 값을 설정할 때 실행되며, 값이 비어있지 않을 때만 변경되도록 합니다.</br>

-----------------------------------------------------------

프라이빗 필드</br>
프라이빗 필드는 클래스 내부에서만 접근할 수 있는 속성입니다. 즉, 클래스 외부에서는 이 필드에 직접 접근하거나 수정할 수 없고, 클래스 내부에서만 사용할 수 있도록 보호되는 데이터입니다. 프라이빗 필드는 속성 이름 앞에 #을 붙여서 만듭니다.</br>

```javascript
class BankAccount {
  // 프라이빗 필드 정의
  #balance = 0;

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`입금 완료! 현재 잔액: ${this.#balance}`);
    } else {
      console.log("입금할 금액은 0보다 커야 합니다.");
    }
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100); // "입금 완료! 현재 잔액: 100"
console.log(account.getBalance()); // "100"

// 외부에서 프라이빗 필드에 직접 접근할 수 없음
console.log(account.#balance); // 오류 발생: 프라이빗 필드는 외부에서 접근 불가
```
-BankAccount 클래스에서 #balance는 프라이빗 필드입니다.</br>
클래스 안의 메서드(예: deposit 메서드)를 통해서만 잔액을 변경하거나 확인할 수 있고, 클래스 외부에서는 #balance에 직접 접근할 수 없습니다.</br>
외부에서 잔액에 직접 접근하는 것을 막음으로써, 예기치 않은 방식으로 값이 변경되는 일을 방지할 수 있습니다.</br>

--------------------------------------------------------
접근 제어</br>
- 접근 제어는 객체의 속성이나 메서드에 대한 접근을 제어하는 방법입니다.</br>
자바스크립트에서 프라이빗 필드를 사용해 내부 데이터를 보호할 수 있으며, Getters와 Setters 같은 메서드를 통해 필요한 경우에만 외부에서 안전하게 접근할 수 있게 합니다.</br>
```javascript
class Person {
  // 프라이빗 필드
  #age = 0;

  // Getter: 외부에서 안전하게 나이를 확인하는 방법
  get age() {
    return this.#age;
  }

  // Setter: 외부에서 나이를 변경할 때 조건을 적용하는 방법
  set age(newAge) {
    if (newAge > 0) {
      this.#age = newAge;
    } else {
      console.log("나이는 0보다 커야 합니다.");
    }
  }
}

const person = new Person();
person.age = 25; // Setter 호출, 나이 설정
console.log(person.age); // Getter 호출, "25" 출력

person.age = -5; // 잘못된 값 설정 시 오류 메시지 출력

```
-Person 클래스에서는 프라이빗 필드 #age를 외부에서 직접 수정하지 못하게 하고, Getter와 Setter를 통해 나이를 설정하거나 확인할 수 있게 했습니다.</br>
이렇게 하면 나이를 안전하게 관리하면서, 잘못된 값이 들어가는 것을 방지할 수 있습니다.</br>

--------------------------------------------------------
추상 클래스 패턴 적용</br>
여러 클래스가 공통으로 가져야 할 기본 구조를 정의해놓는 일종의 설계도라고 생각하면 됩니다. 하지만 추상 클래스 자체로는 객체를 만들 수 없고, 이 클래스를 상속받은 하위 클래스에서 구체적인 동작을 구현해야 합니다.</br>
쉽게 말해, 추상 클래스는 뼈대만 제공하고, 실제 내용은 상속받은 클래스에서 완성하는 방식입니다.</br>

-추상 클래스의 특징</br>
추상 클래스는 직접 객체를 생성할 수 없습니다.</br>
추상 클래스는 다른 클래스들이 상속받아서 사용할 공통된 구조와 메서드를 정의해줍니다.</br>
추상 클래스의 메서드는 하위 클래스에서 구체적인 내용을 작성(오버라이딩) 해야 합니다.</br>

* 예시
```javascript
// 추상 클래스 (실제로는 객체를 만들 수 없음)
class Animal {
  constructor(name) {
    if (new.target === Animal) {
      throw new Error("추상 클래스인 Animal로는 객체를 만들 수 없습니다.");
    }
    this.name = name;
  }

  // 추상 메서드: 하위 클래스에서 반드시 구현해야 함
  makeSound() {
    throw new Error("추상 메서드인 makeSound()는 반드시 구현되어야 합니다.");
  }
}

// 하위 클래스: Animal을 상속받아 구체적인 동작을 구현
class Dog extends Animal {
  makeSound() {
    console.log(`${this.name}가 멍멍 소리를 냅니다.`);
  }
}

class Cat extends Animal {
  makeSound() {
    console.log(`${this.name}가 야옹 소리를 냅니다.`);
  }
}

const myDog = new Dog("바둑이");
myDog.makeSound(); // "바둑이가 멍멍 소리를 냅니다."

const myCat = new Cat("나비");
myCat.makeSound(); // "나비가 야옹 소리를 냅니다."

```
-Animal 클래스: Animal은 추상 클래스입니다. </br>
이 클래스는 makeSound()라는 메서드를 가지고 있지만, 구체적인 동작(예: 소리를 내는 방법)은 정의하지 않았습니다. </br>
대신, 이 메서드는 하위 클래스가 정의해야 합니다. 그래서 Animal 자체로는 객체를 만들 수 없도록 했습니다.</br>

if (new.target === Animal) 구문은 Animal 클래스 자체로 객체를 만들려고 할 때 오류를 발생시킵니다.</br>

-Dog 클래스와 Cat 클래스: Animal 클래스를 상속받아 구체적인 동물을 구현한 클래스입니다.</br>
각 클래스는 makeSound() 메서드를 오버라이딩하여 자신만의 방식으로 소리를 냅니다.</br>
예를 들어, Dog 클래스는 멍멍 소리를 내고, Cat 클래스는 야옹 소리를 냅니다.</br>

-추상 클래스의 목적: 동물마다 소리를 내는 방식은 다르지만, 동물이라는 공통적인 특성을 가지고 있습니다. </br>
Animal 추상 클래스는 이런 공통적인 특성을 정의하고, 각 동물이 자신만의 소리를 낼 수 있도록 유도하는 역할을 합니다.</br>

----------------------------------------------------------
클래스 필드의 활용</br>
클래스 안에서 사용하는 변수라고 생각하면 됩니다.</br>
즉, 객체가 가지고 있는 속성이나 데이터를 클래스 안에서 정의한다고 보면 됩니다. </br>
클래스 필드를 활용하면, 객체가 어떤 정보를 가질지 쉽게 정의하고 관리할 수 있습니다.</br>

클래스 필드의 기본 개념</br>
인스턴스 필드: 객체가 생성될 때마다 각 객체가 개별적으로 가지는 속성입니다.</br>
정적 필드 (Static Field): 모든 객체가 공통적으로 가지는 속성입니다. 정적 필드는 객체가 아니라 클래스 자체에 속하므로, 여러 객체가 같은 값을 공유합니다.</br>


* 인스턴트 필드 예시 
```javascript
class Car {
  // 인스턴스 필드 (각 객체마다 개별적으로 가짐)
  brand = '현대';
  model = '아반떼';

  constructor(color) {
    this.color = color; // 필드를 생성자에서 초기화
  }

  showDetails() {
    console.log(`이 자동차는 ${this.color} 색의 ${this.brand} ${this.model}입니다.`);
  }
}

const car1 = new Car('빨강');
const car2 = new Car('파랑');

car1.showDetails(); // "이 자동차는 빨강 색의 현대 아반떼입니다."
car2.showDetails(); // "이 자동차는 파랑 색의 현대 아반떼입니다."

```
-Car 클래스는 brand, model, color라는 인스턴스 필드를 가지고 있습니다. car1과 car2 객체는 각각 다른 색깔을 가지지만, brand와 model은 같은 값을 가지고 있습니다. 여기서 color는 객체가 생성될 때 생성자에서 초기화됩니다.</br>
-인스턴스 필드는 각 객체마다 고유한 값을 가질 수 있습니다.</br>

* 정적 필드 예시
```javascript
class Car {
  // 정적 필드 (모든 객체가 공유)
  static totalCars = 0;

  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
    Car.totalCars++; // 자동차가 생성될 때마다 총 자동차 수를 증가시킴
  }

  static showTotalCars() {
    console.log(`총 ${Car.totalCars}대의 자동차가 생성되었습니다.`);
  }
}

const car1 = new Car('현대', '아반떼');
const car2 = new Car('기아', 'K5');

Car.showTotalCars(); // "총 2대의 자동차가 생성되었습니다."

```

-totalCars는 정적 필드이므로, Car 클래스로 만들어진 모든 객체가 이 값을 공유합니다. 자동차가 생성될 때마다 totalCars가 증가합니다.</br>
-정적 필드는 객체마다 고유하지 않고, 클래스 전체에서 공유되는 값입니다. 그래서 Car.totalCars처럼 클래스 이름을 통해 접근합니다.</br>
