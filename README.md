# SKALA Vue.js 학습 프로젝트

SKALA 4기 Vue.js 수업에서 배운 내용을 날짜별로 직접 구현하고 GitHub 커밋으로 기록하는 프로젝트입니다.

## 기술 스택

- Vue 3
- Composition API
- Vite
- Vue Router
- Pinia
- ESLint / Oxlint / Oxfmt

## 실행 방법

```sh
npm install
npm run dev
```

개발 서버 실행 후 터미널에 표시되는 로컬 주소로 접속합니다.

## 코드 검사

```sh
npm run lint
npm run build
```

매일 커밋하기 전에 두 명령이 모두 성공하는지 확인합니다.

## 일차별 학습 기록

### Day 1 — 2026-08-24

#### 학습 주제

- Vue 프로젝트 개발 환경 구성
- JavaScript 핵심 문법 복습
- Vue 반응형 상태와 텍스트 보간법
- Vue Directive 기본 및 활용

#### 1. 학습 환경 구성

- `SampleOne.vue`
  - 일반 변수와 `ref()`로 선언한 반응형 변수의 차이 확인
  - 데이터 변경 시 Vue 화면이 갱신되는 원리 실습
- `SampleTwo.vue`
  - 텍스트 보간법 `{{ }}` 사용
  - 문자열 결합, 문자열 변환, 난수 생성 등 JavaScript 표현식 출력

#### 2. Vue Directive

- `v-html`
  - HTML 문자열을 실제 HTML 요소로 렌더링
  - 사용자 입력을 `v-html`로 출력할 때 발생할 수 있는 XSS 위험 확인
- `v-text`
  - HTML을 해석하지 않고 문자열 그대로 출력
  - `v-html`과 `v-text`의 차이 비교
- `v-bind`
  - URL, 이미지, 버튼의 `disabled` 속성 동적 바인딩
  - 클래스 객체·배열 바인딩
  - 인라인 스타일 객체 바인딩
  - 동일한 이름의 속성과 변수를 연결하는 단축 문법 확인
- `v-if`, `v-else-if`, `v-else`
  - 로그인 여부에 따른 조건부 화면 출력
  - 점수에 따른 학점 표시
- `v-show`
  - CSS의 `display` 속성을 이용한 화면 표시·숨김 실습
- `v-for`
  - 배열, 객체, 객체 배열 반복 렌더링
  - 반복 항목에 `:key` 지정
- `v-pre`
  - 템플릿 문법을 컴파일하지 않고 그대로 표시
- `v-cloak`
  - Vue가 마운트되기 전에 보간법 문법이 노출되는 현상 방지
- `v-once`
  - 최초 렌더링 결과를 고정하고 이후 변경 방지
- `v-memo`
  - 지정한 반응형 데이터가 변경될 때만 렌더링하도록 최적화

#### Customization

- 운영체제의 라이트·다크 모드 설정과 관계없이 실습 화면 배경을 흰색으로 고정
- 로그인 상태, 점수, 버튼 잠금, 글자 색상 등 직접 조작할 수 있는 예제로 Directive 동작 확인
- `v-html` 사용자 입력 예제를 통해 XSS 보안 위험 확인

### Day 2 — 2026-08-25

#### 학습 주제

- Vue Event Handling
- Vue Form Handling
- Vue Style Handling
- Exercise 1: Weather Mockup

#### 3. Vue Event Handling

- `EventBasic.vue`
  - `@click`을 사용한 카운트 증가
  - 이벤트 핸들러 함수를 이용한 알림창 출력
- `EventObject.vue`
  - 이벤트 객체를 이용한 클릭 좌표 확인
  - 사용자 매개변수와 `$event`를 함께 전달
  - 이벤트가 발생한 HTML 태그 정보 확인
- `EventModifier.vue`
  - `.prevent`를 이용한 링크의 기본 동작 방지
  - 부모와 자식 요소의 이벤트 버블링 확인
  - `.stop`을 이용한 이벤트 전파 차단

#### 4. Vue Form Handling

- `ModelBasic.vue`
  - `v-model`을 이용한 양방향 데이터 바인딩
  - `:value`와 `@input`을 이용해 `v-model`의 내부 동작 원리 확인
- `ModelForm.vue`
  - `textarea` 입력값 처리
  - 단일 체크박스와 Boolean 값 연결
  - 다중 체크박스와 배열 연결
  - 라디오 버튼과 선택값 연결
  - `select` 요소의 선택값 처리
- `ModelModifier.vue`
  - `.lazy`를 이용한 변경 시점 제어
  - 입력값의 숫자 변환 확인
  - `.trim`을 이용한 앞뒤 공백 제거
  - `.trim.number` 수식어 조합 실습

#### 5. Vue Style Handling

- `StyleScoped.vue`
  - Vue 컴포넌트 내부에 `<style scoped>` 적용
  - 다른 컴포넌트에 영향을 주지 않는 스타일 범위 확인

#### Exercise 1: Weather Mockup

- `ref()`로 지역별 날씨 목록을 반응형 데이터로 관리
- `v-for`와 `:key`를 이용해 날씨 카드 반복 출력
- 25도를 기준으로 `v-if`/`v-else` 조건부 배지 표시
  - 25도 이상: 더움
  - 25도 미만: 선선함
- `:value`와 `@input`을 이용한 한글 검색어 입력 처리
- 입력한 검색어를 화면에 실시간 출력
- 날씨 카드 클릭 시 선택한 도시를 상태 바에 표시
- 상세보기 버튼 클릭 시 해당 도시의 날씨를 `window.alert()`로 출력
- `@click.stop`을 적용해 상세보기 버튼의 클릭 이벤트 버블링 방지
- `exercise.css`를 이용해 검색 영역, 날씨 카드, 배지, 버튼, 상태 바 디자인 적용

##### Customization

- 기본 서울·수원·부산 데이터에 판교 날씨 추가
- 각 도시 데이터에 `activity` 속성 추가
- 날씨 카드에 도시별 ‘오늘의 추천’ 정보 출력
- 판교 추천 활동으로 ‘카페에서 코딩하기’ 설정
- 날씨 Mockup 전용 CSS를 적용해 카드형 대시보드 화면 구성