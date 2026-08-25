<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const dummy = ref(0)

// 일반 함수는 컴포넌트가 렌더링될 때마다 실행된다.
const getMethodResult = () => {
  console.log('일반 함수 실행')
  return count.value * 2
}

// count가 변경될 때만 두 배 값을 다시 계산한다.
const doubleCount = computed(() => {
  console.log('computed 연산 실행')
  return count.value * 2
})
</script>

<template>
  <div class="practice-section">
    <h2>computed() 캐싱 동작 비교</h2>
    <p>count: {{ count }} | dummy: {{ dummy }}</p>
    <button @click="count++">count 증가 (의존성 변경)</button>
    <p>일반 함수 결과: {{ getMethodResult() }}</p>
    <p>Computed 결과: {{ doubleCount }}</p>
  </div>
</template>
