#### 2-3-2. 스코프, 스코프 체인, outerEnvironmentReference

-   **스코프(scope)**

    -   식별자에 대한 유효범위
        -   ES5까지의 자바스크립트는 전역공간을 제외하면 오직 함수에 의해서만 스코프가 생성된다.
        -   ES6에서는 블록에 의해서도 스코프 경계가 발생한다.
            -   let, const, class, strict mode에서의 함수 선언 등에 대해서만 범위로서의 역할을 수행
            -   ES6에서는 이 둘을 구분하기 위해 함수 스코프, 블록 스코프라는 용어를 사용
    -   스코프 체인(scope chain): 식별자의 유효범위를 안에서부터 바깥으로 차례로 검색해나가는 것
        -   이를 가능하게하는 것이 outerEnvionmentReference이다.

-   **스코프 체인**
    outerEnvionmentReference는 현재 호출된 함수가 선언될 당시의 LexicalEnvironment를 참조한다. outerEnvionmentReference는 연결리스트(linked list)형태를 띈다.

‘선언 시점의 LexicalEnvironment’를 계속 찾아 올라가면 마지막엔 전역 컨텍스트의 LexicalEnvironment가 있을 것이다.

여러 스코프에서 동일한 식별자를 선언한 경우에는 무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능하게 된다.

스코프 체인 상에 있는 변수라고 해서 무조건 접근 가능한 것은 아니다. inner 함수 내부에 a를 선언했기 때문에 inner LexicalEnvironment 상의 a를 반환하게 된다. 즉, inner 함수 내부에서 a 변수를 선언했기 때문에 전역 공간에서 선언한 a 변수에는 접근할 수 없다. 이를 변수 은닉화(variable shadowing)라고 한다.
