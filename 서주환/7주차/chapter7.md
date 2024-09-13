# 클래스(Class)

<br/>

## 클래스와 인스턴스의 개념 이해

![IMG_0277](https://github.com/user-attachments/assets/5fdfbc0a-79e8-4cdc-8de5-88cae4fb38b3)

음식, 과일은 모든 집단(클래스)이다.<br/>
음식은 과일보다 상위(superior)개념이고, 과일은 음식보다 하위(subordinate)개념이다.

- 상위 클래스(superclass), 하위 클래스(subclass)로 표현

 <br/>

---

<br/>

![IMG_0278](https://github.com/user-attachments/assets/efbebf5a-5513-4ca7-9c23-902cdf9f3c58)

음식은 과일의 superclass이다. 과일은 음식의 subclass이면서 귤류의 superclass이다.
음식은 귤류의 super-superclass, 귤류는 음식의 sub-subclass이다
하위 개념은 상위 개념을 포함하면서 더 구체적인 개념이 추가된다.<br/>
예로 최상위 분류인 음식 클래스는 <span style= 'color:yellow'>'먹을 수 있다'</span>정도면 하위의 과일 클래스는 <span style= 'color:yellow'>'먹을 수 있다 + 나무에서 열린다'</span>의 개념이 되고 그 하위의 귤류 클래스는 <span style= 'color:yellow'>'먹을 수 있다 + 나무에서 열린다 + 새콤한 맛이 나는 과육이 들어있다'</span>가 된다.
클래스는 하위로 갈수록 상위 클래스의 속성을 상속하면서 구체적 조건이 추가 또는 변경된다. 물론 하위 클래스가 구체화 된다해도 결국 추상적 개념일 뿐이다.

감귤, 자몽, 천혜향 등은 음식에 속해 먹을 수 있고, 과일에 속해 나무에 열리며, 귤류에 속해 새콤한 맛이 나는 과육이 들어있는 구체적 개체들이다.

어떤 클래스의 속성을 지니는 실존하는 개체를 일컬어 인스턴스(어떤 조건에 부합하는 구체적 예시)라고 한다.

---

<br/>

사용자가 직접 여러 가지 클래스를 정의해야 하고 클래스를 바탕으로 인스턴스를 만들 때 비로소 어떤 개체가 클래스의 속성을 지니게 된다. 한 인스턴스는 하나의 클래스만을 바탕으로 만들어진다.

어떤 인스턴스가 다양한 클래스에 속할 수는 있지만 이 클래스들은 모두 인스턴스 입장에선 '직계존속'이다.

클래스가 먼저 정의돼야만 그로부터 공통적 요소를 지니는 개체들을 생성할 수 있다.

<br/>

## 자바스크립트의 클래스

생성자 함수 Array를 new 연산자와 함께 호출하면 인스턴스가 생성.<br/>
이 때 Array를 일종의 클래스라고 하면, Array의 prototype 객체 내부 요소들이 인스턴스에 `상속`된다 라고 볼 수 있다. <br/>
엄밀하게 상속이 아닌 프로토타입 체이닝에 의한 참조지만 동일하게 동작하므로 무방하다.
protype 프로퍼티를 제외한 나머지는 인스턴스에 상속되지 않는다.<br/>

인스턴스에 상속되는지(인스턴스가 참조하는지) 여부에 따라 스태틱 멤버와 인스턴스 멤버로 나뉜다.

이 분류는 다른 언어의 클래스 구성요소에 대한 정의를 차용한 것으로 클래스 입장에서 사용 대상에 따라 구분한 것이다.

<br/>

![IMG_0282](https://github.com/user-attachments/assets/4ba1a393-b01d-48e4-b50b-1f6421a5c10a)

<br/>

```
var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
}; // 생성자
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
}; // (프로토타입) 메서드

Rectangle.isRectangle = function (instance) {
  return (
    instance instanceof Rectangle && instance.width > 0 && instance.height > 0
  );
}; // 스태틱 메서드

var rect1 = new Rectangle(3, 4);
console.log(rect1.getArea()); // 12 (0)
console.log(rect1.isRectangle(rect1)); // Error (x)
console.log(Rectangle.isRectangle(rect1)); // true

```

Rectangle 함수를 new 연산자와 함께 호출, 생성된 인스터스를 rec1에 할당. width, height 프로퍼티에 각각 3,4 값 할당

인스턴스에 직접 호출할 수 있는 메서드가 프로토타입 메서드이다.

인스턴스에서 직접 접근할 수 없는 메서드를 스태틱 메서드라 한다.
생성자 함수를 this로 해야만 호출 할 수 있다.

<br/>

![IMG_0283](https://github.com/user-attachments/assets/7152d345-708b-4c8b-86ba-c2851a91cbee)

클래스 자체를 this로 해서 직접 접근해야만 하는 스태틱 메서드를 호출할 때의 클래스는 그 자체가 하나의 개체로서 취급된다.

<br/>

## 클래스 상속

### 기본 구현

객체지향에서 가장 중요한 요소 중 하나이다.

![IMG_0286](https://github.com/user-attachments/assets/ce557b1e-580d-485d-9441-0af168ddc0a8)

```
g.push(90)
console.log(g) // Grade {0 : 100, 1 : 80, 2: 90, length : 3}

delete g.length
g.push(70)
console.log(g) // Grade { 0 : 70, 1 : 80, 2 : 90, length : 1}
```
Grade 클래스의 인스턴스는 배열 매서드를 상속하지만 기본적으로 일반 객체의 성질을 그대로 지니므로 삭제가 가능해서 문제가 된다.