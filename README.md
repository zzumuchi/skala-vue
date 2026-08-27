# SKALA Vue.js Weather Application

SKALA 4기 Vue.js 종합 실습에서 기본 문법부터 Composition API, Component, Vue Router, Pinia, Axios, Element Plus와 Vercel 배포까지 단계적으로 구현한 프로젝트입니다. 학습 단계별 코드는 보존하면서 최종적으로 실시간 날씨, 5일 예보와 대기질을 확인할 수 있는 Weather Application으로 확장했습니다.

## 요약

| 주제 | 내용 |
| --- | --- |
| 기간 | 2026. 08. 24. 월 ~ 2026. 08. 27. 목 |
| 수행 기관 | SKALA 4기 판교캠퍼스 |
| 목적 | Frontend 기본 개념과 Vue.js 생태계 학습 |
| 소스 저장소 | [GitHub Repository](https://github.com/zzumuchi/skala-vue) |
| 배포 주소 | [skala-vue-p070.vercel.app](https://skala-vue-p070.vercel.app) |

## 프로젝트 목표

- Vue의 반응성, Directive와 이벤트 처리 등 기본 문법을 실제 화면에서 활용합니다.
- Component를 역할별로 분리하고 Props, Emits와 Slot을 이용해 데이터를 전달합니다.
- Vue Router와 Pinia를 결합해 화면 이동과 전역 상태를 함께 관리합니다.
- Axios와 OpenWeather API를 연결해 Mock Data를 실시간 데이터로 확장합니다.
- Element Plus와 반응형 CSS를 활용해 일관된 사용자 인터페이스를 구성합니다.
- Vercel Function으로 API Key를 서버에서 관리하고 production 환경에 안전하게 배포합니다.

## 주요 기능

### 실시간 날씨 대시보드

- 서울, 수원, 부산과 개인화 지역인 판교의 현재 기온과 기상 상태를 동시에 조회합니다.
- 검색어를 기준으로 도시 카드를 필터링하고 Query String에 검색 상태를 보존합니다.
- 날씨 카드를 선택하면 선택된 도시 상태를 안내하고 상세 화면으로 이동할 수 있습니다.
- 데스크톱과 모바일에서 날씨 카드가 전체 너비를 활용하도록 반응형으로 구성했습니다.

### 도시별 상세 날씨

- `/weather/:cityId` 동적 경로를 이용해 선택한 도시의 상세 화면을 제공합니다.
- 실시간 기온, 기상 상태, 습도, 풍속, 추천 활동과 준비물을 표시합니다.
- OpenWeather의 3시간 단위 예보를 현지 날짜별로 묶어 5일간의 최저·최고기온과 최대 강수확률을 계산합니다.
- 현재 AQI 등급과 PM2.5, PM10, 오존 농도를 카드 형태로 제공합니다.
- 예보와 대기질 요청을 `Promise.allSettled()`로 처리해 하나의 요청이 실패해도 나머지 정보를 유지합니다.

### 전역 단위 설정

- Pinia Store에서 섭씨와 화씨 상태, 단위 기호와 변경 Action을 관리합니다.
- 대시보드 카드와 상세·예보 화면이 동일한 Store를 구독해 단위를 즉시 변경합니다.
- API 원본 데이터는 섭씨로 유지하고 표시 단계에서만 화씨로 변환합니다.

### Router와 보조 화면

- 날씨 대시보드, 외출 준비 가이드, 서비스 소개와 404 화면을 분리했습니다.
- `/guide`에서 날씨 상태별 추천 활동과 준비물을 확인할 수 있습니다.
- Catch-all Route로 정의되지 않은 주소를 처리합니다.
- `vercel.json`의 SPA Rewrite로 상세 주소에서 새로고침해도 정상적으로 앱이 열립니다.

### UI Library

- Element Plus의 Card, Input, Tag, Button과 Result Component를 적용했습니다.
- 필요한 Component와 Style만 선택 등록해 JavaScript Bundle을 약 1.07MB에서 약 247KB로 줄였습니다.
- 공통 CSS가 Element Plus 내부 input에 중복 적용되던 문제를 선택자 범위 조정으로 해결했습니다.

## 개인화 및 추가 구현

- 기본 지역 외에 판교를 추가하고 `카페에서 코딩하기`, `노트북`이라는 개인화된 활동과 준비물을 유지했습니다.
- 기온만 보여주는 기본 과제에서 5일 예보, 강수확률과 대기질 정보까지 확장했습니다.
- AQI 단계에 따라 야외 활동 가능 여부와 마스크 준비 안내를 제공합니다.
- 외출 준비 가이드를 별도 View로 만들어 날씨 정보를 실제 행동과 연결했습니다.
- 로딩, API 오류, 검색 결과 없음과 존재하지 않는 경로에 대한 상태 UI를 구현했습니다.

## Vue 학습 및 구현 근거

| 분류 | 구현 내용 |
| --- | --- |
| 기본 문법 | 보간법, `v-if`, `v-else`, `v-for`, `v-model`, Class Binding, Event Handling |
| Composition API | `ref`, `reactive`, `computed`, `watch`, `watchEffect`, Lifecycle Hook |
| Component | Props, Emits, Default Slot, Component 분리와 재사용 |
| Vue Router | `RouterLink`, `RouterView`, 동적 경로, Query String, Lazy Loading, Catch-all Route |
| Pinia | State, Getter, Action과 여러 View 사이의 전역 단위 상태 공유 |
| Axios | 현재 날씨, 5일 예보, 대기질 API 비동기 요청과 오류 처리 |
| UI Library | Element Plus Component 선택 등록과 Weather UI 적용 |
| Deployment | Vite Build, Vercel Function, Secret 환경변수, SPA Rewrite와 Production 배포 |

## 사용 기술

| 영역 | 기술 |
| --- | --- |
| Framework | Vue 3, Composition API |
| Build Tool | Vite 8 |
| Routing | Vue Router |
| State Management | Pinia |
| HTTP Client | Axios |
| UI | Element Plus, CSS Grid, Scoped CSS |
| External API | OpenWeather Current Weather, 5 Day Forecast, Air Pollution API |
| Quality | ESLint, Oxlint, Oxfmt |
| Hosting | Vercel, Vercel Functions |

## 프로젝트 구조

```text
skala-vue/
├── api/
│   └── weather.js                 # OpenWeather 요청을 대리하는 Vercel Function
├── src/
│   ├── components/
│   │   ├── practices/             # Store, Axios, Element Plus Code Practice
│   │   └── exercise/
│   │       ├── 1_Mockup/          # Weather Mockup
│   │       ├── 2_Composition/     # Composition API Weather
│   │       ├── 3_Component/       # 분리된 Weather Component
│   │       └── 4_WeatherStore/    # Pinia 단위 변경 Component
│   ├── services/
│   │   └── weatherApi.js          # 개발·배포 환경별 날씨 요청 Service
│   ├── stores/
│   │   └── configStore.js         # 섭씨·화씨 전역 상태
│   ├── router/
│   │   └── index.js               # Weather Route 정의
│   ├── views/                      # Home, Detail, Guide, About, 404 View
│   ├── App1_basic.vue              # Vue 기본 문법 Practice
│   ├── App2_composition.vue        # Composition API Practice
│   ├── App3_library.vue            # Pinia, Axios, Element Plus Practice
│   └── App_exercise.vue            # 최종 Weather Application
├── .env.example                    # 환경변수 이름 예시
├── RECORD.md                       # 일차별 상세 학습 및 작업 기록
└── vercel.json                     # Vercel SPA Rewrite 설정
```

## 설치 및 실행

### 요구 환경

- Node.js 20.19 이상 또는 22.12 이상
- npm
- OpenWeather API Key

### 로컬 실행

```bash
git clone https://github.com/zzumuchi/skala-vue.git
cd skala-vue
npm install
cp .env.example .env.local
npm run dev
```

`.env.local`에는 로컬 개발용 API Key를 설정합니다.

```env
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
```

`.env.local`은 Git에서 제외되며 실제 API Key를 저장소에 커밋하지 않습니다.

### Production 환경변수

Vercel의 Production과 Preview 환경에는 다음 Secret을 등록합니다.

```env
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

배포된 브라우저는 API Key를 직접 사용하지 않고 `/api/weather`를 호출합니다. Vercel Function이 서버 환경변수를 이용해 OpenWeather 요청을 처리하므로 production JavaScript Bundle에 API Key가 포함되지 않습니다.

## 명령어

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 로컬 개발 서버 실행 |
| `npm run lint` | Oxlint와 ESLint 검사 및 자동 수정 |
| `npm run format` | `src/` 코드 포맷팅 |
| `npm run build` | Production 정적 파일 생성 |
| `npm run preview` | Production Build 로컬 확인 |

## 배포 및 품질관리

- Production URL: [https://skala-vue-p070.vercel.app](https://skala-vue-p070.vercel.app)
- `npm run lint`: 오류와 경고 없이 통과
- `npm run build`: Vite Production Build 통과
- Root, `/weather/city_01`, `/guide`: HTTP 200 확인
- Current Weather, Forecast, Air Quality Function: HTTP 200 확인
- Production Bundle 내 OpenWeather API Key 미포함 확인
- `dist/`, `.env.local`, `.vercel/`, `node_modules/` Git 제외

Vercel CLI를 이용해 Production으로 배포했습니다. GitHub Push 기반 자동 배포는 Vercel GitHub App에 저장소 접근 권한을 부여한 후 연결할 수 있습니다. 도메인은 추후 Vercel Project의 Settings > Domains에서 변경하거나 추가할 수 있습니다.

## 개발 과정

| 일차 | 학습 및 구현 내용 |
| --- | --- |
| Day 1 | JavaScript 복습, Vue 반응성, 보간법과 Directive |
| Day 2 | Event·Form·Style Handling, Weather Mockup과 Composition API 확장 |
| Day 3 | Component, Props·Emits·Slot, Router와 외출 준비 가이드 |
| Day 4 | Pinia Store, Axios, Element Plus, 5일 예보·대기질, 품질관리와 Vercel 배포 |

상세 학습 과정, 개인화 내역과 시행착오는 [RECORD.md](./RECORD.md)에 날짜별로 기록했습니다. GitHub의 일차별 커밋은 [GitHub Activity](https://github.com/zzumuchi/skala-vue/activity)에서 확인할 수 있습니다.

## 어려웠던 점과 배운 점

Frontend의 기본 개념은 숙지하고 있었지만 새로운 Framework인 Vue.js를 단기간에 배우면서 Vue만의 반응성 문법과 Component 사이의 데이터 흐름을 익히는 데 시간이 필요했습니다. 특히 Props와 Emits의 단방향 흐름, 자식 버튼의 Event 전파, Router와 Store가 함께 동작하는 구조를 이해하는 과정이 중요했습니다.

Pinia의 단위 변경 문구만 바뀌고 실제 기온이 바뀌지 않았을 때는 Store가 정상이어도 화면 Component가 해당 상태를 구독하고 계산해야 한다는 점을 배웠습니다. Element Plus 적용 과정에서는 Library Component가 생성하는 내부 DOM과 기존 전역 CSS가 충돌할 수 있어 Style 범위를 세밀하게 제한해야 했습니다.

API 연동 후에는 Key를 `.env.local`에 두는 것만으로 브라우저 노출까지 막을 수 없다는 사실을 확인했습니다. 최종 배포에서는 Vercel Function과 서버 Secret을 사용해 Key를 Bundle에서 제거했고, Router 직접 접근을 위한 SPA Rewrite와 실제 배포 URL 검증까지 수행했습니다. 이를 통해 기능 구현뿐 아니라 환경설정, 보안, Build와 Hosting까지 전체 배포 흐름을 경험했습니다.
