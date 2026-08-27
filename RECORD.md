# SKALA Vue.js 학습 프로젝트

SKALA 4기 Vue.js 수업에서 배운 내용을 직접 구현하고, Practices와 Exercise를 단계별로 기록하는 프로젝트입니다.

## 저장소

- GitHub: https://github.com/zzumuchi/skala-vue

## 현재 기술 스택

- Vue 3
- Composition API
- Vite
- ESLint
- Oxlint
- Oxfmt

## 설치 및 실행

```sh
npm install
npm run dev
```

개발 서버가 실행되면 터미널에 표시되는 로컬 주소로 접속합니다.

## App 실행 화면 전환

학습 내용에 따라 `src/main.js`에서 불러오는 App 파일을 변경합니다.

```js
// Vue 기본 문법 Practices
import App from './App1_basic.vue'

// Composition API Practices
import App from './App2_composition.vue'

// Weather Exercise
import App from './App_exercise.vue'
```

한 번에 하나의 App만 import해서 실행합니다. 현재 기본 실행 대상은 `App_exercise.vue`입니다.

## 코드 검사

```sh
npm run lint
npm run build
```

커밋 전 두 명령이 모두 성공하는지 확인합니다.

## 일차별 학습 기록

### Day 1 — 2026-08-24

#### 학습 주제

- Vue 프로젝트 개발 환경 구성
- JavaScript 핵심 문법 복습
- Vue 반응형 상태와 텍스트 보간법
- Vue Directive 기본 및 활용

#### 1. 학습 환경 구성

- `SampleOne.vue`
  - 일반 변수와 `ref()` 반응형 변수의 화면 갱신 차이 확인
  - 버튼 클릭을 통한 데이터 변경 실습
- `SampleTwo.vue`
  - 텍스트 보간법 `{{ }}` 사용
  - 문자열 변환과 JavaScript 표현식 출력

#### 2. Vue Directive

- `v-html`, `v-text`
  - HTML 렌더링과 일반 문자열 출력의 차이 확인
  - 사용자 입력을 `v-html`로 출력할 때의 XSS 위험 확인
- `v-bind`
  - 링크, 이미지, `disabled` 속성 바인딩
  - 클래스 객체·배열 바인딩
  - 인라인 스타일 객체·배열 바인딩
  - 속성명 단축 문법 확인
- `v-if`, `v-else-if`, `v-else`
  - 로그인 상태와 점수에 따른 조건부 렌더링
- `v-show`
  - CSS `display` 속성을 이용한 표시와 숨김
- `v-for`
  - 배열, 객체, 객체 배열 반복 렌더링
  - 반복 항목의 `:key` 지정
- `v-pre`, `v-cloak`, `v-once`, `v-memo`
  - 템플릿 컴파일 제어와 렌더링 최적화 실습

#### Day 1 Customization

- 라이트·다크 모드 설정과 관계없이 실습 화면을 밝은 테마로 고정
- 로그인 상태, 점수, 버튼 상태, 글자 색상 등을 직접 조작할 수 있는 예제로 구성
- Practices를 `1_basic` 폴더 아래 학습 주제별로 분류
- 기본 실습 화면을 `App1_basic.vue`로 분리

#### Day 1 시행착오 및 해결 과정

- 일반 변수의 값을 변경했는데 화면에는 변경된 값이 바로 표시되지 않았다.
  - 일반 변수는 값이 바뀌어도 Vue가 변화를 추적하지 않는다는 것을 확인했다.
  - 화면과 연결되어 계속 변경되는 값은 `ref()`로 선언해 반응형 상태로 관리했다.

- `v-html`과 `v-text`의 출력 결과가 달라 처음에는 사용 기준이 헷갈렸다.
  - `v-html`은 문자열을 HTML로 해석하고, `v-text`는 문자열 그대로 출력한다는 차이를 확인했다.
  - 사용자 입력값을 `v-html`로 바로 출력하면 XSS 문제가 생길 수 있으므로 주의해야 한다는 점을 배웠다.

- 조건에 따라 요소를 숨길 때 `v-if`와 `v-show` 중 무엇을 사용해야 하는지 고민했다.
  - `v-if`는 조건에 따라 요소를 생성하거나 제거하고, `v-show`는 CSS의 `display` 속성을 변경한다.
  - 자주 전환하는 요소는 `v-show`, 조건이 거의 바뀌지 않는 요소는 `v-if`가 적합하다는 차이를 확인했다.

### Day 2 — 2026-08-25

#### 학습 주제

- Vue Event Handling
- Vue Form Handling
- Vue Style Handling
- Composition API Reactive State
- Computed
- Watchers
- Exercise 1: Weather Mockup
- Exercise 2: Weather Composition

#### 3. Vue Event Handling

- `EventBasic.vue`
  - `@click` 인라인 연산과 메서드 핸들러 연결
- `EventObject.vue`
  - 이벤트 객체와 `$event` 활용
  - 클릭 좌표와 이벤트 대상 태그 확인
- `EventModifier.vue`
  - `.prevent`를 이용한 기본 동작 방지
  - 이벤트 버블링 확인
  - `.stop`을 이용한 이벤트 전파 차단

#### 4. Vue Form Handling

- `ModelBasic.vue`
  - `v-model` 양방향 데이터 바인딩
  - `:value`와 `@input`을 이용한 내부 동작 확인
- `ModelForm.vue`
  - textarea, checkbox, radio, select 입력 처리
- `ModelModifier.vue`
  - `.lazy`, `.number`, `.trim` 수식어 활용
  - 여러 수식어를 연결하는 방식 확인

#### 5. Vue Style Handling

- `StyleScoped.vue`
  - `<style scoped>`를 이용한 스타일 범위 제한
  - 공통 외부 CSS와 컴포넌트 전용 CSS의 차이 확인

#### Composition API: Reactive State

- `ReactiveRef.vue`
  - 숫자, 문자열, Boolean, 배열, 객체를 `ref()`로 관리
  - 스크립트에서 `.value`를 사용해 값 변경
  - 템플릿에서 ref 값이 자동으로 해제되는 동작 확인
- `ReactiveReactive.vue`
  - 객체와 배열을 `reactive()`로 관리
  - 객체 속성 변경과 배열의 `push()`, `splice()` 실습

#### Composition API: Computed & Watchers

- `ComputedBasic.vue`
  - 일반 함수와 `computed()`의 실행 방식 비교
  - 반응형 의존성이 바뀔 때만 다시 계산되는 캐싱 확인
- `WatchersBasic.vue`
  - 하나의 ref 상태 변화 감시
  - 변경 전 값과 변경 후 값 비교
- `WatchersMulti.vue`
  - 여러 ref를 배열로 묶어 동시에 감시
- `WatchersDeep.vue`
  - ref 객체의 하위 속성을 `deep: true`로 감시
  - getter 함수로 특정 속성만 감시
- `WatchersReactive.vue`
  - reactive 객체 전체 감시와 특정 속성 감시 비교
- `WatchersRefArray.vue`
  - ref 배열의 특정 인덱스와 객체 요소 감시
- `WatchersReactiveArray.vue`
  - reactive 배열 전체 감시
  - 복사본을 이용한 변경 전 배열 보존
- `WatchersWatchEffect.vue`
  - 콜백에서 사용하는 반응형 값을 자동 추적
  - 화면이 처음 표시될 때 즉시 실행되는 특징 확인

#### Exercise 1: Weather Mockup

- `ref()`로 날씨 목록, 검색어, 선택 상태 관리
- `v-for`와 `:key`로 지역별 날씨 카드 렌더링
- `v-if`와 `v-else`로 온도에 따른 배지 표시
- `:value`와 `@input`으로 한글 검색어 입력 처리
- 카드 클릭 시 선택한 도시를 상태 바에 표시
- `@click.stop`으로 상세보기 버튼의 이벤트 버블링 차단
- 상세보기 클릭 시 `window.alert()`로 날씨 정보 표시

##### Weather Mockup Customization

- 서울·수원·부산에 판교 날씨 데이터 추가
- 각 도시에 `activity` 속성 추가
- 카드에 도시별 추천 활동 표시
- 판교 추천 활동을 ‘카페에서 코딩하기’로 구성

#### Exercise 2: Weather Composition

- `computed()`로 검색어가 포함된 도시만 필터링
- 검색어가 비어 있으면 전체 도시 목록 출력
- 검색 결과가 없으면 안내 문구 표시
- `watch()`로 선택한 도시 상태 변화 기록
- `watchEffect()`로 검색어 변화 자동 추적
- 기존 Mockup의 카드 선택과 상세보기 기능 유지

##### Weather Composition Customization

- 도시별 추천 활동과 준비물 데이터 추가
- 판교 날씨와 ‘카페에서 코딩하기’, ‘노트북’ 데이터 추가
- 사용자가 직접 선호 기온을 입력할 수 있는 상태 추가
- 검색 결과의 평균 기온을 계산하는 `averageTemp` Computed 추가
- 선호 기온과 도시 기온의 차이가 2도 이내인지 확인하는 함수 추가
- 선호 기온 변경을 기록하는 Watcher 추가

#### Day 2 UI 및 코드 정리

- `practice.css`와 `exercise.css`를 Vue 녹색·청록색 팔레트로 통일
- 전역 스타일 충돌을 줄이기 위해 컨테이너 범위 선택자 적용
- 데스크톱과 모바일에서 사용할 수 있는 반응형 레이아웃 구성
- 함수, Computed, Watcher의 역할만 짧게 설명하도록 주석 정리
- Practices와 Weather Exercise에서 이모지 및 장식성 문구 제거
- Composition 실습 화면을 `App2_composition.vue`로 분리
- Weather 과제 화면을 `App_exercise.vue`로 분리

#### Day 2 시행착오 및 해결 과정

- 코드를 작성했지만 원하는 실습 화면이 나타나지 않았다.
  - 폴더와 App 파일을 재구성한 뒤에도 `main.js`에서 다른 App을 불러오고 있었다.
  - 실행 화면을 `App1_basic.vue`, `App2_composition.vue`, `App_exercise.vue`로 나누었다.
  - 이후에는 실습할 때 `main.js`의 App import만 변경하도록 정리했다.

- Weather 카드의 상세보기 버튼을 누르면 카드 선택 이벤트도 같이 실행되었다.
  - 버튼의 클릭 이벤트가 부모 카드까지 전달되는 이벤트 버블링 때문이었다.
  - 상세보기 버튼에 `@click.stop`을 적용해 부모 이벤트로 전파되지 않도록 수정했다.

- 검색, 평균 기온 계산, 상태 기록을 어떤 방식으로 나눠야 하는지 헷갈렸다.
  - 검색 결과와 평균 기온처럼 기존 상태에서 계산되는 값은 `computed()`를 사용했다.
  - 선택 도시와 선호 기온의 변경 기록은 `watch()`로 처리했다.
  - 검색어처럼 사용하는 반응형 값을 자동으로 추적할 때는 `watchEffect()`를 사용했다.

- 공통 CSS를 수정하자 다른 실습 화면의 스타일도 같이 달라졌다.
  - 적용 범위가 넓은 전역 선택자를 여러 컴포넌트가 함께 사용한 것이 원인이었다.
  - App 컨테이너를 기준으로 선택자 범위를 제한하고 Practices와 Exercise의 CSS를 분리했다.

- 폴더명을 변경한 뒤 Git에서 기존 파일은 삭제되고 새 파일은 추가된 것처럼 표시되었다.
  - Git은 파일 이동 명령보다 변경 전후의 파일 내용을 기준으로 이동 여부를 판단한다.
  - `git status`로 변경 범위를 먼저 확인하고 과제와 관련된 파일만 선택해 스테이징했다.
  - 폴더를 재구성할 때는 import 경로와 Git 상태를 함께 확인해야 한다는 점을 배웠다.

### Day 3 — 2026-08-26

#### 학습 주제

- Vue Component 분리
- Props와 Emits를 이용한 컴포넌트 통신
- Default Slot을 이용한 콘텐츠 주입
- Vue Router와 지연 로딩
- 동적 경로, Query String, Catch-all Route
- Exercise 3: Weather Component
- Exercise 4: Weather Router

#### Exercise 3: Weather Component

- 기존 날씨 기능을 `WeatherParent`, `BaseDashboardCard`, `SearchBar`, `WeatherCard` 컴포넌트로 분리
- `BaseDashboardCard`의 Default Slot으로 검색 영역과 날씨 목록 주입
- Props로 검색어와 도시 객체를 자식 컴포넌트에 전달
- Emits로 검색어 변경, 카드 선택, 상세보기 이벤트를 부모 컴포넌트에 전달
- 각 컴포넌트의 디자인을 `<style scoped>`로 분리

#### Weather Component Customization

- Mockup에서 추가한 도시별 추천 활동과 준비물 정보를 컴포넌트 과제에 유지
- 판교 날씨와 ‘카페에서 코딩하기’, ‘노트북’ 데이터 유지
- 추천 정보를 담당하는 `WeatherActivity.vue`를 추가하고 `WeatherCard`의 자식 컴포넌트로 구성
- `activity`와 `preparation` Props로 추천 정보를 전달
- 날씨 카드 목록을 데스크톱 2열, 모바일 1열의 반응형 Grid로 구성

#### Exercise 4: Weather Router

- `RouterLink`와 `RouterView`를 이용해 날씨 앱의 화면 전환 구조 구성
- 홈, 서비스 소개, 도시 상세 View를 지연 로딩 방식으로 라우터에 등록
- `/weather/:cityId` 동적 경로의 도시 ID로 상세 Mock Data 조회
- 검색어를 Query String과 동기화해 URL에 검색 상태 유지
- 정의되지 않은 주소는 Catch-all Route를 통해 `NotFoundView.vue`로 이동
- 상세보기 버튼의 알림을 제거하고 `router.push()`를 이용한 상세 페이지 이동으로 변경

#### Weather Router Customization

- `WeatherGuideView.vue`를 추가하고 `/guide` 경로로 Routing
- 맑음, 비, 구름 상태별 추천 활동과 준비물 안내
- Navigation Bar에 외출 준비 가이드 메뉴 추가
- 기존 개인화 도시인 판교를 홈과 상세 Mock Data에 유지
- 가이드 카드는 데스크톱 3열, 모바일 1열의 반응형 Grid로 구성

#### 실행 및 검사 결과

- `src/main.js`에서 `App_exercise.vue`를 실행 대상으로 설정
- 홈, 외출 준비 가이드, 도시 상세, Catch-all 경로 응답 확인
- `npm run lint` 통과
- `npm run build` 통과
