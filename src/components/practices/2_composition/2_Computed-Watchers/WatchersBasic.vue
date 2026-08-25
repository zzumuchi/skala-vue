<script setup>
import { ref, watch } from 'vue'

const currentCity = ref('서울')
const logMessage = ref('아직 감시 시스템이 작동하지 않았습니다.')

// 선택한 도시가 바뀌면 상태 메시지와 조회 로그를 갱신한다.
watch(currentCity, (newValue, oldValue) => {
  logMessage.value = `[도시 변경] ${oldValue}에서 ${newValue}로 변경됨.`
  console.log(`[날씨 조회] ${newValue}의 날씨 데이터를 요청합니다.`)
})
</script>

<template>
  <div class="practice-section">
    <h2>감시자 watch()의 원리와 실무 활용</h2>
    <h3>지역 선택</h3>
    <p>현재 선택된 도시: {{ currentCity }}</p>
    <button @click="currentCity = '서울'">서울 선택</button> &nbsp; <button @click="currentCity = '수원'">수원 선택</button> &nbsp;
    <button @click="currentCity = '부산'">부산 선택</button>

    <div class="monitor">
      <h3>watch 결과</h3>
      <p>{{ logMessage }}</p>
      <small style="color: gray">(버튼을 누른 후 브라우저 콘솔창 F12를 확인해 보세요)</small>
    </div>
  </div>
</template>

<style scoped>
.monitor {
  border-color: #0984e3;
  background: #e3fafc;
}
</style>
