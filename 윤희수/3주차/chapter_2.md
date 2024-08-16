## 변수 은닉화
스코프 체인 상에 있는 변수라고 해서 무조건 접근 가능한 것은 아니다.
전역 공간에서 선언한 동일한 이름의 변수에는 접근할 수 없다 이를 변수 은닉화라고 한다

##전역변수와 지역변수
전역변수 : 전역 공간에서 선언한 변수
지역변수 : 함수 내부에서 선언한 변수

총 정리
- 실행 컨텍스트는 실행할 코드에 저공할 환경 정보들을 모아놓은 객체
- 전역 공간에서 자동으로 생성되는 전역 컨텍스트와 eval 및 함수 실행에 의한 컨텍스트 등이 있다.
- 실행 컨텍스트 객체는 활성화되는 시점에 VariableEnvironment,LexicalEnvironment,ThisBinding 세가지를 수집한다.
- VariableEnvironment와 LexicalEnvironment는 처음엔 동일한 내용으로 생성되지만 VariableEnvironment는 초기값이 유지되지만 LexicalEnvironment는 변경되는 사항을 즉시 반영한다.
- outerEnvironmentReference는 해당 함수가 선언된 위치의 LexicalEnvironment를 참조한다.
