##실행 컨텍스트 
실행 컨텍스트는 실행할 코드에 제공할 환경 정보들을 모아놓은 객체
자바스크립트는 어떤 실행 컨텍스트가 활성화되는 시점에 선언된 변수를 위로 끌어올리고 (*호이스팅),외부 환경 정보를 구성하고 this 값을 설정하는 등의 동작을 수행하는데 이로 인해 특이한 현상들이 발생한다.

*호이스팅(Hoisting) 이란?

자바스크립트에서 변수나 함수를 코드의 최상단으로 끌어올리는 동작을 의미합니다.
코드를 실행하기 전에, 자바스크립트 엔진이 변수와 함수의 선언을 먼저 처리합니다.
호이스팅의 주의점

변수나 함수를 선언하기 전에 사용하려고 하면, 그 값은 undefined 상태가 됩니다.
변수의 선언은 호이스팅되지만, 초기화(값을 할당하는 행위)는 호이스팅되지 않습니다.

#실행 컨텍스트란?
스택(stack)-출입구가 하나뿐인 깊은 우물 데이터 구조[선입후출]
큐(queue)-양쪽이 모두 열려있는 파이프 데이터 구조[선입선출]

![images](https://github.com/user-attachments/assets/8c0488f6-39fe-4756-831b-c8984aa84a3f)

실행 컨텍스트: 실행할 코드에 제공할 환경 정보들을 모아놓은 객체

전역 컨텍스트라는 개념은 일반적인 실행 컨텍스트와 특별히 다를 것이 없다.
최상단의 코드는 별도의 실행 명령이 없어도 브라우저에서 자동으로 실행하므로 자바스크립트 파일이 열리는 순간 전역 컨텍스트가 활성화된다.

콜 스택
스택 구조를 보면 실행 컨텍스트가 콜 스택의 맨 위에 쌓이는 순간 이 곧 현재 실행할 코드에 관여하게 되는 시점,
기존의 컨텍스트는 새로 쌓인 컨텍스트보다 아래에 위치할 수밖에 없기 때문에 실행 컨텍스트가 활성화될 때 자바스크립트 엔진은 해당 컨텍스트에 관련된 코드들을 실행하는데 필요한 환경 정보들을 수집해서 실행 컨텍스트 객체에 저장합니다.

VariableEnvironment(가변환경)
-이것은 코드의 실행 환경을 나타내며, 주로 함수가 시작될 때 생성됩니다.
-초기 환경에 변수와 함수 선언이 저장되며, 이곳에 기록된 내용은 실행 동안 변경되지 않습니다.
LexicalEnvironment(사전적환경)
-현재 실행 중인 컨텍스트에서 사용할 수 있는 변수와 함수 정보를 담고 있습니다.
-이 환경은 코드를 실행하는 동안 지속적으로 업데이트 될 수 있으며, 새로운 블록(예: if문이나 for문 내부)에 진입할 때마다 현재 환경에 추가 정보가 추가됩니다.

공통점과 차이점
-두 환경 모두 실행 중인 코드의 컨텍스트에 따라서 접근 가능한 변수와 함수를 관리합니다.
-VariableEnvironment는 함수 호출 시 초기 상태를, LexicalEnvironment는 실행 컨텍스트가 변화함에 따라 갱신되는 현재 상태를 나타냅니다


VariableEnvironment과 LexicalEnvironment
-실행 컨텍스트를 생성할 때 VariableEnvironment에 정보를 먼저 담은 다음 그대로 복사해서 LexicalEnvironment를 만들고 이후에는 LexicalEnvironment를 주로 활용한다.






