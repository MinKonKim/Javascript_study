##2-3-2 스코프, 스코프 체인 ,outerEnvironmentReference

스코프란? 식별자에 대한 유효범위(A의 외부에서 선언한 변수는 A의 내부에서도 접근이 가능하지만, A의 내부에서 선언한 변수는 오직 A의 내부에서만 접근가능)

GPT정리 -스코프(Scope): 변수나 함수가 접근 가능한 범위.

글로벌 스코프(Global Scope): 코드 어디에서나 접근 가능한 변수. 전체 스크립트에서 공유됨. -지역 스코프(Local Scope) 또는 함수 스코프(Function Scope): 특정 함수 내부에서만 접근 가능한 변수. 함수 외부에서는 접근 불가능. -블록 스코프(Block Scope): {}로 둘러싸인 코드 블록 내에서만 유효한 변수. let, const를 사용하여 선언. 예: if, for 문 내의 let, const 변수는 그 블록을 벗어나면 접근 불가. 중요성: 스코프를 이해하면 변수의 유효 범위를 알고, 버그를 줄이며 효율적인 코드를 작성할 수 있습니다. 스코프 체인이란? '식별자의 유효범위'를 안에서부터 바깥으로 차례대로 검색해나가는 것 이를 가능하게 하는건 LexicalEnvironment의 outerEnvironmentReference이다.

outerEnvironmentReference는 현재 호출된 함수가 선언될 당시의 LexicalEnvironment를 참조한다.

outerEnvironmentReference 기본 개념: outerEnvironmentReference는 함수가 생성될 때 그 함수가 정의된 위치의 외부 환경을 참조하는 속성이다. 이는 함수가 속한 렉시컬 환경(Lexical Environment)을 가리키며, 스코프 체인의 일부로 작용한다.

작동 원리: 함수가 실행될 때, 자바스크립트 엔진은 해당 함수의 스코프에서 변수를 찾고, 없다면 outerEnvironmentReference를 따라 상위 스코프로 이동해 변수를 찾는다. 이 과정은 필요한 변수를 찾거나 글로벌 스코프에 도달할 때까지 계속된다.

클로저와의 관계: outerEnvironmentReference는 클로저를 형성하는 데 중요한 역할을 한다. 함수가 외부 스코프의 변수를 참조할 경우, 이 참조는 함수가 실행된 후에도 유지될 수 있으며, 이를 통해 클로저가 형성된다.

요약: outerEnvironmentReference는 함수가 정의된 위치를 기준으로 변수 접근 범위를 결정하고, 이는 스코프 체인에 따라 외부 환경과 연결된다. 이를 통해 자바스크립트는 함수 내외의 변수를 효율적으로 관리할 수 있다.

**이런 구조적 특성으로 여러 스코프에서 동일한 식별자를 선언한 경우 *무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능하다.
