<script setup>
/* 1. 학습환경 구성 */
// Reactiviy Example
import SampleOne from './components/practices/1_basic/1_Samples/SampleOne.vue'
// Text Interpolation Example
import SampleTwo from './components/practices/1_basic/1_Samples/SampleTwo.vue'

/* 2. Vue Directive */
// v-html / v-html XSS / v-text
import VueHtml from './components/practices/1_basic/2_VueDirective/VueHtml.vue'
import VueHtmlXss from './components/practices/1_basic/2_VueDirective/VueHtmlXss.vue'
import VueText from './components/practices/1_basic/2_VueDirective/VueText.vue'
// v-bind
import VueBind from './components/practices/1_basic/2_VueDirective/VueBind.vue'
import VueBindClass from './components/practices/1_basic/2_VueDirective/VueBindClass.vue'
import VueBindStyle from './components/practices/1_basic/2_VueDirective/VueBindStyle.vue'
import VueBindShorthand from './components/practices/1_basic/2_VueDirective/VueBindShorthand.vue'
// v-if / v-else-if / v-else / v-show
import VueIf from './components/practices/1_basic/2_VueDirective/VueIf.vue'
import VueShow from './components/practices/1_basic/2_VueDirective/VueShow.vue'
// v-for
import VueFor from './components/practices/1_basic/2_VueDirective/VueFor.vue'
// v-pre / v-cloak / v-once / v-memo
import VuePre from './components/practices/1_basic/2_VueDirective/VuePre.vue'
import VueCloak from './components/practices/1_basic/2_VueDirective/VueCloak.vue'
import VueOnce from './components/practices/1_basic/2_VueDirective/VueOnce.vue'
import VueMemo from './components/practices/1_basic/2_VueDirective/VueMemo.vue'

/* 3. Vue Event Handling */
import EventBasic from './components/practices/1_basic/3_VueEventHandling/EventBasic.vue'
import EventObject from './components/practices/1_basic/3_VueEventHandling/EventObject.vue'
import EventModifier from './components/practices/1_basic/3_VueEventHandling/EventModifier.vue'

/* 4. Vue Form Handling */
import ModelBasic from './components/practices/1_basic/4_VueFormHandling/ModelBasic.vue'
import ModelForm from './components/practices/1_basic/4_VueFormHandling/ModelForm.vue'
import ModelModifier from './components/practices/1_basic/4_VueFormHandling/ModelModifier.vue'

/* 5. Vue Style Handling */
import StyleScoped from './components/practices/1_basic/5_VueStyleHandling/StyleScoped.vue'
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
    <h1>3. Vue Event Handling</h1>
    <hr />
    <EventBasic />
    <EventObject />
    <EventModifier />
    <h1>4. Vue Form Handling</h1>
    <hr />
    <ModelBasic />
    <ModelForm />
    <ModelModifier />
    <h1>5. Vue Style Handling</h1>
    <hr />
    <StyleScoped />
  </div>
</template>

<style>
@import '@/assets/practice.css';
</style>
