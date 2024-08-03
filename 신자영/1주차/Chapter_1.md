# JavaScript 데이터 타입

![데이터 타입의 종류](https://github.com/user-attachments/assets/a7aaad18-e8c0-451f-b31a-3728fad85770)

## 1. 데이터 타입의 종류

### 1-1. 기본형 (Primitive Types)

-   **number**: 숫자 타입
-   **string**: 문자열 타입
-   **boolean**: 참/거짓 값
-   **null**: 값이 없음을 나타내는 타입
-   **undefined**: 값이 정의되지 않았음을 나타내는 타입
-   **symbol**: 고유하고 변경 불가능한 값

> 기본형 데이터는 값이 복제되며, 불변성(immutability)을 띄고 있습니다.

### 1-2. 참조형 (Reference Types)

-   **object**: 객체 타입
    -   **array**: 배열 타입
    -   **function**: 함수 타입
    -   **date**: 날짜 및 시간 타입
    -   **regexp**: 정규 표현식 타입
    -   **Map**: 키-값 쌍을 저장하는 객체
    -   **WeakMap**: 가비지 컬렉션에 의한 메모리 해제를 지원하는 Map
    -   **Set**: 유일한 값을 저장하는 집합
    -   **WeakSet**: 가비지 컬렉션에 의한 메모리 해제를 지원하는 Set

> 참조형 데이터는 참조가 복제되며, 값이 담긴 주솟값을 가리킵니다.

## 2. 데이터 타입에 관한 배경지식

### 2-1. 메모리와 데이터

![비트와 바이트](https://github.com/user-attachments/assets/7e74989c-b1de-4fcd-aefb-dba95087ea48)

-   **비트**: 0 또는 1의 두 가지 값을 표현할 수 있음.
-   **바이트**: 1바이트 = 8비트로 구성되어 있으며, 2의 8제곱 (256) 개의 값을 표현할 수 있음.
-   **바이트 생성 배경**: 비트 단위로 위치를 확인하는 것은 비효율적이며, 바이트 단위로 묶어 표현할 수 있는 값이 늘어나고 검색 시간이 줄어듭니다. 그러나 많은 비트를 한 단위로 묶으면 낭비되는 비트가 발생할 수 있습니다.
-   **동적 타입 vs 정적 타입**
    -   정적 타입 언어: 메모리 낭비 최소화 (예: C++, Java)
    -   동적 타입 언어: 64비트 메모리 사용 (예: JavaScript)

### 2-2. 식별자와 변수

-   **변수**: 변할 수 있는 데이터를 담을 수 있는 공간.
-   **식별자**: 변수를 식별하는 이름.

## 3. 변수 선언과 데이터 할당

### 3-1. 변수 선언

```javascript
var a;
```

변수 `a`를 선언하고, 메모리에서 비어있는 공간을 확보합니다.

### 변수 선언에 대한 메모리 영역의 변화

![변수 선언에 대한 메모리 영역의 변화](https://github.com/user-attachments/assets/2f36e7ab-4737-4886-bb5d-573e331ce89d)

-   **변수 확보**: 메모리에서 비어있는 공간 하나를 확보합니다. (예: `1003`)
-   **식별자**: 이 공간의 이름을 `a`로 지정합니다.

이후 사용자가 `a`에 접근하면 컴퓨터는 메모리에서 `a`라는 이름을 가진 주소(`1003`)를 검색하여 담긴 데이터를 반환합니다.

### 3-2. 데이터 할당

```javascript
var a; // 변수 a 선언
a = 'abc'; // 변수 a에 데이터 할당

var a = 'abc'; // 변수 선언과 할당을 한 문장으로 표현
```

문자열 `'abc'`를 데이터 영역에 저장하고, 그 주소를 변수 `a`에 저장합니다.

## 4. 기본형 데이터와 참조형 데이터

### 4-1. 불변값

```javascript
var a = 'abc';
a = a + 'def'; // 새로운 문자열 'abcdef' 생성
```

기본형 데이터는 불변성을 가지고, 변경 시 새로운 값이 생성됩니다.

### 4-2. 가변값

```javascript
var obj1 = { a: 1, b: 'bbb' };
var obj2 = obj1; // 같은 객체를 참조
obj2.c = 20; // obj1도 변경됨
```

참조형 데이터는 가변적이며, 내부 값이 변경될 수 있습니다.

## 5. 불변 객체

### 5-1. 불변 객체 만들기

불변 객체를 만들기 위해 새로운 객체를 반환하거나, 라이브러리를 활용할 수 있습니다.

```javascript
var user = { name: 'Kim', gender: 'female' };
var changeName = function (user, newName) {
    return { ...user, name: newName };
};
```

### 5-2. 얕은 복사 vs 깊은 복사

-   **얕은 복사 (Shallow Copy)**: 바로 아래 단계의 값만 복사합니다.
-   **깊은 복사 (Deep Copy)**: 내부의 모든 값들을 재귀적으로 복사합니다.

```javascript
// 얕은 복사
var copyObject = function (target) {
    var result = {};
    for (var prop in target) {
        result[prop] = target[prop];
    }
    return result;
};

// 깊은 복사
var copyObjectDeep = function (target) {
    var result = {};
    if (typeof target === 'object' && target !== null) {
        for (var prop in target) {
            result[prop] = copyObjectDeep(target[prop]);
        }
    } else {
        result = target;
    }
    return result;
};
```

## 6. `undefined`와 `null`

### 6-1. `undefined`

-   값이 대입되지 않은 변수
-   객체의 존재하지 않는 프로퍼티 접근
-   반환 값이 없는 함수

```javascript
var obj = { a: 1 };
console.log(obj.a); // 1
console.log(obj.b); // 객체의 존재하지 않는 프로퍼티 접근
console.log(b); // 반환 값이 없는 함수
```

### 6-2. `null`

-   명시적으로 ‘비어있음’을 나타내고 싶을 때 사용

```javascript
var n = null;
console.log(n); // null
```
