# 프로토 타입

클래스 기반 언어에서는 '상속'을 사용, 프로토타입 기반 언어에서는 어떤 객체를 원형으로 삼고 이를 복제(참조)함으로써 상속과 비슷한 효과를 얻는다.

- 유명한 프로그래밍 언어의 상당수가 클래스 기반인 것에 비교하면 프로토 타입은 꽤 독특한 개념이다.

<br/>
<br/>


## <span style= 'color: green'> 프로토 타입의 개념

어떤 생ㅇ성자 함수를 new연산자와 함께 호출 <br/>
Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스 생성<br/>
instance에는 `_ _proto_ _`라는 프로퍼티가 자동으로 부여<br/>
 프로퍼티는 Constructor의 prototype이라는 프로퍼티를 참조한다.

 `prototype`이라는 프로퍼티와 `_ _proto_ _`라는 프로퍼티가 등장, 이 둘의 관계가 프로토 타입 개념의 핵심이다.

 prototype, `_ _proto_ _`은 객체이다.

 prototype객체 내부에는 인스턴스가 사용할 메서드를 저장한다. -> 인스턴스에서도 숨겨진 프로퍼티인 `_ _proto_ _`를 통해 이 메서드들에 접근할 수 있게 된다.

`_ _proto_ _` = 'dunder proto' 라고 발음하고 읽으면 된다.
'dunder'는 double underscore의 줄임말

이해의 편의를 위해 proto를 학습 목적으로만 이해하고 실무에선 권장하지 않는다 대신 Object.getPrototypeOf()/ Object.create()등을 이용하면 된다.

자바스크립트는 함수에 자동으로 객체인 prototype 프로퍼티를 생성해 놓는데, 해당 함수를 생성자 함수로서 사용할 경우, 즉 new 연산자와 함께 함수를 호출할 경우, <br/> 그로 생성된 인스턴스에는 숨겨진 프로퍼티인 `_ _proto_ _`가 자동으로 생성, 이 프로퍼티는 생성자 함수의 prototype 프로퍼티를 참조한다.<br/> `_ _proto_ _`프로퍼티는 생햑 가능하도록 구현되어 있기에 생성자 함수의 prototype에 어떤 메서드나 프로퍼티가 있다면 인스턴스에서도 마치 자신의 것 처럼 해당 메서드나 프로퍼티에 접근할 수 있게 된다.

<br/>


![IMG_0291](https://github.com/user-attachments/assets/e8f34866-bc19-49a1-a15a-dff5e4958aed)

Array를 new 연산자와 함께 호출하여 인스턴스를 생성하든, 배열 리터럴을 생성하든 instancedls [1,2]가 생성.<br/>
인스턴스의 `_ _proto_ _`은 Array.prototype을 참조, `_ _proto_ _` 가 생략 가능하도록 설계되 있기에 인스턴스가 push, pop, forEach 등의 메서드를 자치의 것처럼 호출할 수 있다. <br/>
한편 Array의 prototype프로퍼티 내부에 있지 않은 from, isArray 등의 메서드들은 인스턴스가 직접 호출할 수 없다. <br/>Array 생성자 함수에 직접 접근해야 실행이 가능하다.


<br/>

### <span style='color: violet'>constructor 프로퍼티

생성자 함수의 프로퍼티인 prototype 객체 내부에서 constructor라는 프로퍼티가 존재. 
인스턴스인 `_ _proto_ _`객체 내부에도 마찬가지이다. 단어 그대로 원래의 생성자 함수(본인)를 참조. 인스턴스와의 관계에 있어서 필요한 정보이다.
constructor는 읽기 전용 속성이 부여된 예외적 경우(기본형 리터럴 변수 - number, string, boolean)를 제외하고 값을 바꿀 수 있다.

인스턴스로부터 생성자 정보를 알아내는 유일한 수단인 constructor가 항상 안전하진 않지만, 그렇기에 클래스 상속을 흉내 낼 수 있는 경우가 가능해진 측면도 있다.

<br/>
<br/>

## <span style= 'color: green'>프로토타입 체인

<br/>

### <span style= 'color: violet'> 메서드 오버라이드

<br/>

```
var Person = function (name) {
    this.name = name
}
Person.prototype.getName = function () {
    return this.name
}

var iu = new Person('지금')
iu.getName = function () {
    return '바로' + this.name
}
console.log(iu.getName()) // 바로 지금
```
iu._ _prototype_ _.getName이 아닌 iu 객체에 있는 getName 메서드가 호출됐다. <br/>
메서드 위에 메서드를 덮어씌웠다 = 메서드 오버라이드
원본을 제거하고 다른 대상으로 교체하는 것이 아닌 원본이 그대로 있는 상태에서 다른 대상을 그 위에 얹는 것이라고 생각하면 이해하기 쉽다.

<br/>

### <span style= 'color: violet'> 프로토타입 체인

<br/>

![IMG_0294](https://github.com/user-attachments/assets/adad3c45-0184-4f1f-9430-81dfe718cd7e)


어떤 데이터의`_ _proto_ _`프로퍼티 내부에 다시 `_ _proto_ _`프로퍼티가 연쇄적으로 이어진 것을 프로토타입 체인이라 명명하고, 이 체인을 따라 검색하는 것을 프로토타입 체이닝이라고 한다.

어떤 메서드를 호출하면 자바스크립트 엔진은 데이터 자신의 프로퍼티들을 검색해서 원하는 메서드가 있으면 그 메서드를 실행하고, <br/> 없으면 `_ _proto_ _`를 검색해서 있으면 그 메서드를 실행하고, 없으면 다시 `_ _proto_ _`를 검색해서 실행하는 식으로 진행한다.

![IMG_0295](https://github.com/user-attachments/assets/74428f8e-88fc-4854-b621-7911e9ccd521)

각 생성자 함수는 모두 함수이기에 Function 생성자 함수의 prototype과 연결된다.  <br/>
Function 생성자 함수 역시 함수이므로 다시 Function 생성자 함수의 prototype과 연결된다.  <br/>
실제 메모리상에서 데이터를 무한대의 구조 전체를 들고 있는 것이 아니고, 사용자가 이런 루트를 통해 접근하고자 할 때 해당 정보를 얻을 수 있는 것 뿐이다.

이런 접근은 자체로 의미가 없다. <br/> 이미 생성자 함수를 알고 있으니 어떤 인스턴스가 해당 생성자 함수의 인스턴스인지 여부를 알아야 하는 경우가 아니라면,  굳이 인스턴스를 통해 접근 할 필요가 없다.  <br/>
"직접적 연관"이 있는 삼각형만 주목하면 된다.

<br/>

### <span style= 'color: violet'> 객체 전용 메서드의 예외사항

어떤 생성자 함수이든 prototype은 반드시 객체이기에 Object.prototype이 언제나 프로토타입 체인의 최상단에 존재하게 된다.
즉, 객체에서만 사용할 메서드는 다른 여느 데이터 타입처럼 프로토타입 객체 안에 정의 할 수 없다.
그러나 객체에서만 사용할 메서드를 Object.prototype 내부에 정의한다면 다른 데이터 타입도 해당 메서드를 사용할 수 있게 되기 때문이다.

<br/>

### <span style= 'color: violet'> 다중 프로토타입 체인

<br/>

```
var Grade = function () {
  var args = Array.prototype.slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
  this.length = args.length;
};
var g = new Grade(100, 80);
```

변수 g는 Grade의 인스턴스를 바라본다. <br/>
Grade의 인스턴스는 여러 개의 인자를 받아 각각 순서대로 인덱싱해서 저장, length 프로퍼티가 존재하는 등으로 배열의 형태를 지니지만, 배열의 메서드를 사용할 수 없는 유사배열객체이다. <br/>
인스턴스에서 배열 메서드를 직접 쓸 수 있게 하고 싶을 땐, <br/> g.`_ _proto_ _`, 즉 Grade.prototype이 배열의 인스터스를 바라보게 하면 된다.

<br/><br/>

# 정리 
생성자 함수를 new 연산자와 함께 호출하면 Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스가 생성, 이 인스턴스엔 `_ _proto_ _`라는, Constructor의 prototype프로퍼티를 참조하는 프로퍼티가 자동으로 부여.

`_ _proto_ _`는 생략 가능 속성이라 인스턴스는 Constructor.prototype의 메서드를 마치 자신의 메서드인 것처럼 호출 가능.<br/>
Constructor.prototype에는 constructor라는 프로퍼티가 있고 이는 생성자 함수 자신을 가르킨다.<br/>
인스턴스가 자신의 생성자 함수가 무엇인지를 알고자 할 때 필요한 수단.

`_ _proto_ _`안에 `_ _proto_ _`를 찾아가는 과정을 프로토타입 체이닝이라 하고, 이 프로토타입 체이닝을 통해 각 프로토타입 메서드를 자신의 것으로 호출할 수 있다.<br/> 접근방식은 자신으로부터 가까운대상 -> 먼 대상 으로 나아가며 원하는 값을 찾으면 검색 중단.

객체 전용 메서드는 여느 데이터 타입과 달리 Object 생성자 함수에 스태틱하게 담겨있다.
