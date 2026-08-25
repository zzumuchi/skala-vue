<script setup>
import { reactive, ref, watch } from 'vue'

const cityList = reactive(['서울', '수원'])

const logAuto = ref('대기 중...')
const logCopy = ref('대기 중...')

// reactive 배열 전체의 변경을 감시한다.
watch(cityList, (newArr, oldArr) => {
  logAuto.value = `[전체 감시] 이전 길이: ${oldArr.length}, 현재 길이: ${newArr.length}`
})

// 배열 복사본을 감시해 변경 전 목록을 보존한다.
watch(
  () => [...cityList],
  (newArr, oldArr) => {
    logCopy.value = `[복사본 감시] 이전 목록: ${oldArr}, 현재 목록: ${newArr}`
  },
)
</script>

<template>
  <div class="practice-section">
    <h2>reactive() 배열의 특정 인덱스/요소 감시하기</h2>
    <h3>즐겨찾기 도시 목록 (reactive 배열)</h3>
    <p>
      현재 등록된 도시: <strong>{{ cityList }}</strong>
    </p>
    <button @click="cityList.push('부산')">부산 추가 (push)</button> &nbsp;
    <button @click="cityList.pop()">최근 도시 삭제 (pop)</button>

    <div class="monitor auto">
      <h3>1) cityList 전체 감시</h3>
      <p>{{ logAuto }}</p>
      <small>이전 배열과 현재 배열이 같은 값을 참조한다.</small>
    </div>

    <div class="monitor target">
      <h3>2) cityList 복사본 감시</h3>
      <p>{{ logCopy }}</p>
      <small>복사본을 감시하면 변경 전 배열과 비교할 수 있다.</small>
    </div>
  </div>
</template>

<style scoped>
.monitor {
  font-weight: bold;
}
.auto {
  border-color: #ff7675;
  background: #fff5f5;
  color: #c0392b;
}
.target {
  border-color: #00b894;
  background: #e8f5e9;
  color: #27ae60;
}
</style>
