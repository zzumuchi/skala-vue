<script setup>
/* 1. 학습환경 구성 */
// Reactiviy Example
import SampleOne from './components/practices/day1/1st/SampleOne.vue'
// Text Interpolation Example
import SampleTwo from './components/practices/day1/1st/SampleTwo.vue'

/* 2. Vue Directive */
// v-html / v-html XSS / v-text
import VueHtml from './components/practices/day1/2nd/VueHtml.vue'
import VueHtmlXss from './components/practices/day1/2nd/VueHtmlXss.vue'
import VueText from './components/practices/day1/2nd/VueText.vue'
// v-bind
import VueBind from './components/practices/day1/2nd/VueBind.vue'
import VueBindClass from './components/practices/day1/2nd/VueBindClass.vue'
import VueBindStyle from './components/practices/day1/2nd/VueBindStyle.vue'
import VueBindShorthand from './components/practices/day1/2nd/VueBindShorthand.vue'
// v-if / v-else-if / v-else / v-show
import VueIf from './components/practices/day1/2nd/VueIf.vue'
import VueShow from './components/practices/day1/2nd/VueShow.vue'
// v-for
import VueFor from './components/practices/day1/2nd/VueFor.vue'
// v-pre / v-cloak / v-once / v-memo
import VuePre from './components/practices/day1/2nd/VuePre.vue'
import VueCloak from './components/practices/day1/2nd/VueCloak.vue'
import VueOnce from './components/practices/day1/2nd/VueOnce.vue'
import VueMemo from './components/practices/day1/2nd/VueMemo.vue'

</script>

<template>
  <div class="practice-container">
    <h1>1. 학습환경 구성</h1>
    <hr />
    <SampleOne />
    <SampleTwo />
    <h1>2. Vue Directive</h1>
    <hr />
    <VueHtml />
    <VueHtmlXss />
    <VueText />
    <VueBind />
    <VueBindClass />
    <VueBindStyle />
    <VueBindShorthand />
    <VueIf />
    <VueShow />
    <VueFor />
    <VuePre />
    <VueCloak />
    <VueOnce />
    <VueMemo />
  </div>
</template>

<style>
/* ⚠️ 외부 스타일 파일(예: 버튼 디자인 뭉치)을 이 방 안으로 쏙 가리켜 가져옵니다 
@import '@/assets/practice.css';
*/
@import '@/assets/practice.css';
</style>
