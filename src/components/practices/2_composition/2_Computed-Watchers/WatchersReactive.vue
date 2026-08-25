<script setup>
import { reactive, ref, watch } from 'vue'

const state = reactive({
  productName: '노트북',
  price: 1000,
})

const logAutoDeep = ref('대기 중...')
const logTarget = ref('대기 중...')

// reactive 객체 전체의 변경을 감시한다.
watch(state, (newVal, oldVal) => {
  logAutoDeep.value = `[전체 감시] 이전 값: ${oldVal.price}원, 현재 값: ${newVal.price}원`
})

// 가격 속성만 감시해 이전 값과 비교한다.
watch(
  () => state.price,
  (newPrice, oldPrice) => {
    logTarget.value = `[가격 변경] ${oldPrice}원에서 ${newPrice}원으로 변경됨.`
  },
)
</script>

<template>
  <div class="practice-section">
    <h2>reactive() 데이터 watch 감시 규칙</h2>
    <h3>상품 정보 관리 (reactive)</h3>
    <p>상품명: {{ state.productName }} / 가격: {{ state.price }}원</p>
    <button @click="state.price += 500">가격 500원 인상</button>

    <div class="monitor auto">
      <p>1) state 객체 전체 감시</p>
      <p>{{ logAutoDeep }}</p>
      <small>이전 값과 현재 값이 같은 객체를 참조한다.</small>
    </div>

    <div class="monitor target">
      <p>2) state.price 속성 감시</p>
      <p>{{ logTarget }}</p>
      <small>가격만 감시하면 이전 값을 확인할 수 있다.</small>
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
