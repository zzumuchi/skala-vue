<template>
  <div class="weather-app">
    <header class="weather-header">
      <h1>날씨 관측 대시보드</h1>
      <nav class="navigation-bar" aria-label="날씨 서비스 메뉴">
        <RouterLink :to="{ name: 'WeatherHome' }" class="nav-item">홈</RouterLink>
        <span class="divider">|</span>
        <RouterLink :to="{ name: 'WeatherGuide' }" class="nav-item">외출 준비 가이드</RouterLink>
        <span class="divider">|</span>
        <RouterLink :to="{ name: 'WeatherAbout' }" class="nav-item">서비스 소개</RouterLink>
      </nav>
    </header>

    <main class="router-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
@import '@/assets/exercise.css';

.weather-app {
  width: 100%;
}

.weather-header {
  margin-bottom: 20px;
}

.weather-header h1 {
  margin: 0 0 16px;
  color: var(--vue-navy);
  text-align: center;
}

.router-content {
  padding: 24px;
  background: #ffffff;
  border: 1px solid var(--vue-border);
  border-radius: 10px;
}
</style>
