<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import WeatherActivity from './WeatherActivity.vue'

// 1. 상위로부터 단방향 주입받을 객체 데이터 규격 검수 (매크로)
const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

// 2. 상위로 송신할 두 가지 경로의 커스텀 이벤트 식별자 등록 (매크로)
const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

// 선택한 단위에 맞춰 화면에 표시할 기온을 계산한다.
const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
})
</script>

<template>
  <el-card class="weather-card" shadow="hover" @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)">
    <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <WeatherActivity :activity="cityItem.activity" :preparation="cityItem.preparation" />

    <el-tag v-if="cityItem.temp >= 25" type="danger" effect="dark" size="small">더움</el-tag>
    <el-tag v-else type="primary" effect="dark" size="small">선선함</el-tag>

    <el-button class="weather-detail-button" type="primary" plain size="small" @click.stop="emit('click-detail', cityItem.name, cityItem.status)">상세보기</el-button>
  </el-card>
</template>

<style scoped>
.weather-card {
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
}
.weather-card :deep(.el-card__body) {
  padding: 12px;
}
.weather-detail-button {
  position: absolute;
  right: 12px;
  top: 15px;
}
</style>
