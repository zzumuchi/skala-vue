<script setup>
import WeatherMockup from './components/exercise/1_Mockup/WeatherMockup.vue';
import WeatherComposition from './components/exercise/2_Composition/WeatherComposition.vue';
import WeatherParent from './components/exercise/3_Component/WeatherParent.vue';
</script>

<template>
    <div class="app-container">
        <h1>과제 1: 날씨 (Mockup)</h1>
        <hr />
        <WeatherMockup />
    </div>
    <div class="app-container">
        <h1>과제 2: 날씨 (Composition)</h1>
        <hr />
        <WeatherComposition />
    </div>
    <div class="app-container">
        <h1>과제 3: 날씨 (Component)</h1>
        <hr />
        <WeatherParent />
    </div>
</template>

<style>
@import '@/assets/exercise.css';
</style>