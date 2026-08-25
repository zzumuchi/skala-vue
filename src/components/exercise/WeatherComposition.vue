<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', activity: '한강 산책', item: '선크림' },
  { id: 'city_02', name: '수원', temp: 24, status: '비', activity: '실내 전시 관람', item: '우산' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', activity: '해변 산책', item: '얇은 겉옷' },
  { id: 'city_04', name: '판교', temp: 27, status: '맑음', activity: '카페에서 코딩하기', item: '노트북' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해보세요.')
const preferredTemp = ref(25)

// 검색어가 포함된 도시 목록을 반환한다.
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (!query) {
    return weatherList.value
  }

  return weatherList.value.filter((item) => item.name.includes(query))
})

// 검색 결과에 포함된 도시의 평균 기온을 계산한다.
const averageTemp = computed(() => {
  if (filteredWeatherList.value.length === 0) {
    return null
  }

  const totalTemp = filteredWeatherList.value.reduce((sum, item) => sum + item.temp, 0)
  return Math.round(totalTemp / filteredWeatherList.value.length)
})

// 도시 기온이 선호 범위 안에 있는지 확인한다.
const isPreferredWeather = (temp) => {
  return Math.abs(temp - preferredTemp.value) <= 2
}

// 선택한 도시가 바뀌면 상태 변경을 기록한다.
watch(selectedCityInfo, (newInfo) => {
  console.log(`[도시 선택] ${newInfo}`)
})

// 선호 기온이 바뀌면 이전 값과 현재 값을 기록한다.
watch(preferredTemp, (newTemp, oldTemp) => {
  console.log(`[선호 기온 변경] ${oldTemp}°C에서 ${newTemp}°C로 변경됨.`)
})

// 검색어가 바뀔 때마다 검색 상태를 기록한다.
watchEffect(() => {
  console.log(`[도시 검색] 현재 검색어: ${searchQuery.value}`)
})

// 선택한 도시의 날씨를 알림으로 표시한다.
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="search-box">
      <h3>도시 검색</h3>
      <input type="text" :value="searchQuery" @input="(e) => (searchQuery = e.target.value)" placeholder="검색할 도시 이름 입력" />
      <p>검색 중인 도시: <strong>{{ searchQuery }}</strong></p>

      <div class="preference-box">
        <label for="preferred-temp">선호 기온</label>
        <input id="preferred-temp" v-model.number="preferredTemp" class="temperature-input" type="number" min="-20" max="45" />
        <span>°C</span>
      </div>

      <p v-if="averageTemp !== null" class="average-temp">검색 결과 평균 기온: {{ averageTemp }}°C</p>
    </section>

    <section class="list-box">
      <h3>지역별 날씨 현황</h3>
      <div v-for="item in filteredWeatherList" :key="item.id" class="weather-card" @click="selectedCityInfo = `${item.name}이 선택되었습니다.`">
        <h4>{{ item.name }} ({{ item.status }})</h4>
        <p>현재 기온: {{ item.temp }}°C</p>
        <p>추천 활동: {{ item.activity }}</p>
        <p>추천 준비물: {{ item.item }}</p>

        <p v-if="isPreferredWeather(item.temp)" class="preferred-message">선호 기온과 비슷한 날씨입니다.</p>

        <span v-if="item.temp >= 25" class="badge hot">더움 (25도 이상)</span>
        <span v-else class="badge cool">선선함 (25도 미만)</span>

        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">상세보기</button>
      </div>

      <p v-if="filteredWeatherList.length === 0" style="text-align: center; color: #e74c3c; padding: 10px 0">검색 결과와 일치하는 도시가 없습니다</p>
    </section>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>
