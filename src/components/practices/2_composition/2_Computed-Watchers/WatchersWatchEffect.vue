<script setup>
import { ref, watchEffect } from 'vue'

const username = ref('홍길동')
const age = ref(20)
const logMessage = ref('대기 중...')

// 사용하는 반응형 값을 자동으로 감시해 메시지를 갱신한다.
watchEffect(() => {
  logMessage.value = `[자동 감지] 이름: ${username.value} / 나이: ${age.value}세`
  console.log('watchEffect가 반응형 값의 변경을 감지했습니다.')
})
</script>

<template>
  <div class="practice-section">
    <h2>자동 감시자 watchEffect()</h2>
    <p>이름: {{ username }} / 나이: {{ age }}세</p>
    <button @click="username = '이순신'">이름을 '이순신'으로 변경</button> &nbsp;
    <button @click="age++">나이 한 살 추가 (age++)</button>

    <div class="monitor">
      <h3>watchEffect 자동 감시 결과</h3>
      <p>{{ logMessage }}</p>
      <small style="color: gray">watchEffect는 화면이 처음 표시될 때 바로 실행된다.</small>
    </div>
  </div>
</template>

<style scoped>
.monitor {
  border-color: #e74c3c;
  background: #fff5f5;
  font-weight: bold;
}
</style>
