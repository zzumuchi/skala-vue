<script setup>
const htmlData = '글자 연습. <span style="color: red; font-weight: bold;">빨간 굵은 글자</span>'
</script>

<template>
    <div class="practice-section">
        <h2>v-html 연습</h2>
        <h3>일반 보간법 {{  }} 사용결과:</h3>
        <p>{{ htmlData }}</p>
        <h3>v-html 디렉티브 사용 결과</h3>
        <p v-html="htmlData"></p>
    </div>
</template>