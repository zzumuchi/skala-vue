<script setup>
import { ref, watch } from 'vue'

const user = ref({
  name: '홍길동',
  age: 20,
})

const logDeep = ref('아직 반응 없음')
const logTarget = ref('아직 반응 없음')

// 사용자 객체의 모든 하위 속성을 감시한다.
watch(
  user,
  (newVal) => {
    logDeep.value = `[전체 감시] 이름: ${newVal.name}, 나이: ${newVal.age}`
  },
  { deep: true },
)

// 사용자 나이만 감시해 이전 값과 비교한다.
watch(
  () => user.value.age,
  (newAge, oldAge) => {
    logTarget.value = `[나이 변경] ${oldAge}세에서 ${newAge}세로 변경됨.`
  },
)
</script>

<template>
  <div class="practice-section">
    <h2>ref 객체/배열 감시</h2>
    <h3>회원 데이터 조작</h3>
    <p>이름: {{ user.name }} / 나이: {{ user.age }}세</p>
    <button @click="user.name = '이순신'">이름만 변경</button> &nbsp;
    <button @click="user.age++">나이만 변경 (age++)</button>

    <div class="monitor">
      <p>1) deep: true 전체 감시</p>
      <p>{{ logDeep }}</p>
    </div>

    <div class="monitor target">
      <p>2) 화살표 함수로 나이만 감시</p>
      <p>{{ logTarget }}</p>
    </div>
  </div>
</template>

<style scoped>
.monitor {
  border-color: #0984e3;
  background: #e3fafc;
  font-weight: bold;
}
.target {
  border-color: #6c5ce7;
  background: #efe5ff;
}
</style>
