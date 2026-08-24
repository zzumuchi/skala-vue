# SKALA Vue.js 학습 프로젝트

Vue.js 수업에서 배운 내용을 날짜별로 직접 구현하고 GitHub 커밋으로 기록하는 프로젝트입니다.
`../skala-vue-answer`는 최종 정답지이며, 이 프로젝트는 수업 진도에 맞춰 스스로 작성하는 과제용 코드입니다.

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

### 1일차 — 2026-08-24

#### 학습 주제

- JavaScript 핵심 문법 복습
- Vue 프로젝트 학습환경 구성
- 일반 변수와 `ref()` 반응성 변수 비교
- 텍스트 보간법에서 JavaScript 표현식 사용

#### 구현 내용

- `SampleOne.vue`: 일반 변수와 Vue 반응성 변수의 화면 갱신 차이 확인
- `SampleTwo.vue`: 문자열 변환, 문자열 결합, 난수 생성을 보간법으로 출력
- `App.vue`: 일차별 실습 컴포넌트 연결

#### Customization

- 운영체제의 라이트·다크 모드 설정과 관계없이 실습 화면 배경을 흰색으로 고정

#### 확인 결과

- [x] Vue 반응성 데이터 예제 구현
- [x] JavaScript in Text Interpolation 예제 구현
- [x] 학습 컴포넌트를 메인 화면에 연결
- [x] `npm run lint` 통과
- [x] `npm run build` 통과

## 프로젝트 구조

```text
skala-vue/
├── public/                   # 정적 파일
├── src/
│   ├── assets/              # 공통 CSS와 이미지
│   ├── components/
│   │   └── practices/       # 수업 실습 컴포넌트
│   ├── router/              # Vue Router 설정
│   ├── stores/              # Pinia Store
│   ├── views/               # 라우트 단위 화면
│   ├── App.vue              # 최상위 컴포넌트
│   └── main.js              # 애플리케이션 진입점
├── package.json
└── README.md
```

## 매일 기록하는 방법

1. 당일 수업 범위의 코드를 구현합니다.
2. 이 README의 일차별 기록에 학습 내용과 Customization을 추가합니다.
3. `npm run lint`와 `npm run build`로 코드를 검사합니다.
4. 변경 파일을 확인하고 날짜와 주제가 드러나는 메시지로 커밋합니다.

```sh
git status
git add src README.md
git commit -m "feat(day1): Vue 반응성과 보간법 실습"
```

## GitHub

- 저장소: GitHub 원격 저장소를 연결한 뒤 주소를 추가할 예정
- 배포 주소: 최종 배포 후 추가할 예정
