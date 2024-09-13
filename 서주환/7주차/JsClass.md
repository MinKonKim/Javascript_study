# class 개념

클래스는 객체를 생성하기 위한 템플릿.

ES6에서 도입됐으며 기존의 프로토타입 기반 상속을 보다 명확하고 사용하기 쉽게 만들어준다.

클래스 내에 정의된 함수 = method
클래스를 통해 생성된 객체 = 인스턴스
함수처럼 호출하기 전까지는 코드가 실행되지 않는다.
클래스 이름은 항상 대문자로 시작한다.
consturctor는 class에서 필요한 기초 정보를 세팅하는 곳이다. 객체를 new로 생성할 때 가장먼저 자동으로 호출된다.

## <span style= 'color:orange'> 클래스 선언

: constructor는 인스턴스를 생성하고 클래스 필드를 초기화하기 위한 특수한 매서드이다.<br/>
constrictor는 클래스 안에 한 개만 존재할 수 있다.<br/>
2개 이상이 있을 경우엔 syntax Error가 발생한다.

```
class person {
  height = 184

  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

let person1 = new Person('jacob', 32)
console.log(person1.name)
console.log(person1.age)
console.log(person1.height)
```

클래스 필드의 선언 초기화는 반드시 constructor 내부에서 실시<br/>
constructor 내부에 선언한 클래스 필드는 클래스가 생성할 인스턴스에 바인딩된다.<br/>
클래스 필드는 그 인스턴스의 프로퍼티가 되며, 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다.<br/>

JS 클래스 문법에선 인스턴스 변수를 반드시 지정하지 않고 생성자(constructor)을 통해 `this.변수` 문법으로 자동 생성될 수 있다.

`클래스의 본문은 strict mode에서 실행된다. 성능 향상을 위해 더 엄격한 문법이 적용`

<br/>

## <span style= 'color:orange'> 클래스 메서드 정의

: 클래스의 메서드를 정의할 때 객체 리터럴에서 사용하던 문법과 유사한 문법을 사용한다.

```
class Calculator {
    add(x, y) {
        return x + y
    }
    subtract(x, y) {
        return x - y
    }
}

let calc = new Calculator()
calc.add(1, 10) //11
```

객체 리터럴의 문법과 마찬가지로, 임의의 표현식을 대괄호로 둘러싸서 메서드의 이름을 사용할 수 있다.

```
const methodName = 'introduce' //클래스 메서드 이름

class Person {
    constructor({name, age}) {
        this.name = name
        this.age = age
    }
    // 아래 메서드의 이름은 `introduce`가 된다.
    [methodName]() {
        return `안녕하세요, 제 이름은 ${this.name}입니다.`
    }
}
console.log(new Person({name: `홍길동`, age: 20}).introduce()) // 안녕하세요 , 제 이름은 홍길동 입니다.
```

<br/>

### <span style= 'color:violet'>  Getter/ Setter
: 클래스 내에서 Getter 혹은 Setter를 정의하고 싶을 때 메서드 이름 앞에 get 또는 set을 붙여주면 된다.

<br/>

### <span style= 'color:violet'> 정적 메서드(static)
: 정적 메서드는 클래스의 인스턴스가 아닌 클래스 이름으로 곧바로 호출되는 메서드

static 키워드를 메서드 이름 앞에 붙여주면 해당 메서드는 정적 메서드가 된다.<br/>
우리가 랜덤값을 얻기 위해 Math.ramdom() 같은 메서드를 쓰듯, 따로 new Math()없이 곧바로 클래스명.<br/> 메서드명으로 함수를 호출해서 사용하는 것이 바로 random 메서드가 static으로 설정되어 있기 때문이다.

```
class Person {
    construcor({name, age}) { //생성자 인스턴스
        this.name = name
        this.age = age
    }
    static static_name = 'STATIC' //정적 인스턴스

    getName() { //인스턴스(프로토타임) 메서드
        return this.name
    }
    static statuc_getrName() { // 정적 메서드
        return this.static_name
    }
}

const person = new Person({ name: 'j', age: 20})
person.getName() // j
person.static_getName() // STATIC
```

<br/>

### <span style= 'color:violet'> 클래스 상속
: 클래스 상속 (class inheritance, subclassing) 기능을 통해 한 클래스의 기능을 닥른 클래스에서 재사용 할 수 있다.

extends 키워드 : 클래스를 다른 클래스의 하위 클래스로 만들기 위해 사용

`'부모 클래스-자식 클래스 관계'`, `'슈퍼 클래스-서브 클래스 관계'`라고도 말한다.

자식 클래스 a를 통해 부모 클래스 b의 정적 메서드와 정적 속성을 사용할 수 있다.<br/>
부모 클래스 b의 인스턴스 메서드와 인스턴스 속성을 자식 클래스 a의 인스턴스에서 사용 가능

<br/>

### <span style= 'color:violet'> super 키워드
: 생성자 내부에서 super를 함수처럼 호출하면, 부모 클래스의 생성자가 호출<br/>
: 정적 메서드 내부에서는 super.prop과 같이 써 부모 클래스의 prop 정적 속성에 접근 가능<br/>
: 인스턴스 메서드 내부에서는 super.prop과 같이 써 부모 클래스의 prop 인스턴스 속성에 접근 가능
: 추가적으로 자식만의 값을 사용하고 싶을 때.

<br/>

## <span style= 'color:orange'> Private 클래스 변수
ES2021 이전엔 자바스크립트 클래스의 모든 메서드는 퍼블릭으로 지정되었다.<br/>
이후부터는 메서드와 필드명 앞에 '#'을 붙여 프라이빗 메서드와 필드 정의가 가능해졌다.

```
class myClass { // private 변수
    #num = 100

    //private 메서드
    #privMethod() {
        console.log(this.#num) // 프라이빗 변수 호출
    }

    publicMthod() {
        this.#privMethod() // 프라이빗 메서드 호출
    }
}

let newClass = new myClass()
newClass.publicMethod() //100
```

