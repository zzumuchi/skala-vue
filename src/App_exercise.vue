<script setup>
import UnitToggler from './components/exercise/4_WeatherStore/UnitToggler.vue'
</script>

<template>
  <div class="app-container">
    <h1>날씨 관측 대시보드</h1>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/" class="nav-item">날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/guide" class="nav-item">외출 준비 가이드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="nav-item">서비스 소개</RouterLink>
        <UnitToggler />
      </nav>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
@import '@/assets/exercise.css';
</style>
