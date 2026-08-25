<script setup>
// 1. Reactive State
import ReactiveRef from './components/practices/2_composition/1_ReactiveState/ReactiveRef.vue'
import ReactiveReactive from './components/practices/2_composition/1_ReactiveState/ReactiveReactive.vue'

// 2. Computed & Watchers
import ComputedBasic from './components/practices/2_composition/2_Computed-Watchers/ComputedBasic.vue';
import WatchersBasic from './components/practices/2_composition/2_Computed-Watchers/WatchersBasic.vue';
import WatchersMulti from './components/practices/2_composition/2_Computed-Watchers/WatchersMulti.vue';
import WatchersDeep from './components/practices/2_composition/2_Computed-Watchers/WatchersDeep.vue';
import WatchersReactive from './components/practices/2_composition/2_Computed-Watchers/WatchersReactive.vue';
import WatchersRefArray from './components/practices/2_composition/2_Computed-Watchers/WatchersRefArray.vue';
import WatchersReactiveArray from './components/practices/2_composition/2_Computed-Watchers/WatchersReactiveArray.vue';
import WatchersWatchEffect from './components/practices/2_composition/2_Computed-Watchers/WatchersWatchEffect.vue';

</script>

<template>
  <div class="practice-container">
    <h1>1. Reactive State</h1>
    <hr />
    <ReactiveRef />
    <ReactiveReactive />

    <h1>2. Computed & Watchers</h1>
    <hr />
    <ComputedBasic />
    <WatchersBasic />
    <WatchersMulti />
    <WatchersDeep />
    <WatchersReactive />
    <WatchersRefArray />
    <WatchersReactiveArray />
    <WatchersWatchEffect />
  </div>
</template>

<style>
@import '@/assets/practice.css';
</style>
