<script setup>
import StoreCounter from './components/practices/3_library/StoreCounter.vue';
import AxiosWeather from './components/practices/3_library/AxiosWeather.vue';
import AxiosJson from './components/practices/3_library/AxiosJson.vue';
import ElementPlus from './components/practices/3_library/ElementPlus.vue';
</script>

<template>
    <div class="practice-container">
        <h1>1. Store</h1>
        <hr />
        <StoreCounter />

        <h1>2. Axios</h1>
        <hr />
        <AxiosWeather />
        <AxiosJson />

        <h1>3. Element Plus</h1>
        <hr />
        <ElementPlus />
    </div>
</template>

<style>
@import '@/assets/practice.css';
</style>