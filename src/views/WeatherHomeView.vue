<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import BaseDashboardCard from '@/components/exercise/3_Component/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/3_Component/SearchBar.vue'
import WeatherCard from '@/components/exercise/3_Component/WeatherCard.vue'
import WeatherMap from '@/components/exercise/3_Component/WeatherMap.vue'
import { weatherCities } from '@/data/weatherCities'
import { fetchCurrentWeather, hasWeatherApiConfig } from '@/services/weatherApi'
import { getWeatherRecommendation } from '@/utils/weatherRecommendation'

const router = useRouter()
const route = useRoute()

// 기존 Mock 날씨 데이터
// const weatherList = ref([
//   { id: 'city_01', name: '서울', temp: 28, status: '맑음', activity: '한강 산책', preparation: '선크림' },
//   { id: 'city_02', name: '수원', temp: 24, status: '비', activity: '실내 전시 관람', preparation: '우산' },
//   { id: 'city_03', name: '부산', temp: 26, status: '구름', activity: '해변 산책', preparation: '얇은 겉옷' },
//   { id: 'city_04', name: '판교', temp: 27, status: '맑음', activity: '카페에서 코딩하기', preparation: '노트북' },
// ])

const weatherList = ref([])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해보세요.')
const selectedCityId = ref('city_01')
const isLoading = ref(false)

// OpenWeatherMap에서 주요 여섯 지역의 실시간 날씨를 가져온다.
const fetchRealTimeWeather = async () => {
  if (!hasWeatherApiConfig()) {
    console.error('OpenWeatherMap API Key가 설정되지 않았습니다.')
    return
  }

  isLoading.value = true

  try {
    const responses = await Promise.allSettled(weatherCities.map((city) => fetchCurrentWeather(city.params)))

    weatherList.value = responses.flatMap((response, index) => {
      const city = weatherCities[index]

      if (response.status === 'rejected') {
        console.error(`${city.name} 날씨 API 연동 실패:`, response.reason)
        return []
      }

      const raw = response.value.data
      const recommendation = getWeatherRecommendation({
        temperature: raw.main.temp,
        weatherId: raw.weather[0].id,
        windSpeed: raw.wind.speed,
      })

      return [{
        ...city,
        temp: raw.main.temp,
        status: raw.weather[0].description,
        weatherId: raw.weather[0].id,
        humidity: raw.main.humidity,
        windSpeed: raw.wind.speed,
        activity: recommendation.activities[0],
        preparation: recommendation.outfit.join(', '),
      }]
    })

    if (!weatherList.value.some((city) => city.id === selectedCityId.value)) {
      selectedCityId.value = weatherList.value[0]?.id ?? ''
    }

    console.log('실시간 날씨 데이터 동기화 완료:', weatherList.value)
  } catch (error) {
    console.error('날씨 API 연동 실패:', error)
  } finally {
    isLoading.value = false
  }
}

// 기존 Query String 복원 로직
// onMounted(() => {
//   if (route.query.search) {
//     searchQuery.value = route.query.search
//   }
// })

// Query String을 복원한 뒤 실시간 날씨를 조회한다.
onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }

  fetchRealTimeWeather()
})

watch(searchQuery, (newQuery) => {
  router.push({
    path: route.path,
    query: { search: newQuery || undefined },
  })
})

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value
  return weatherList.value.filter((item) => item.name.includes(query))
})

const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}

const handleMapSelection = (id) => {
  const city = weatherList.value.find((item) => item.id === id)
  selectedCityId.value = id
  selectedCityInfo.value = `${city?.name ?? '지역'}의 날씨 추천을 확인하고 있습니다.`
}
</script>

<template>
  <div class="dashboard-wrapper">
    <WeatherMap :cities="weatherList" :selected-city-id="selectedCityId" :is-loading="isLoading" @select-city="handleMapSelection" @view-detail="handleDetailJump" />

    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard class="weather-list-box">
      <!-- 기존 제목: <h3>지역별 날씨 현황</h3> -->
      <h3>지역별 날씨 현황 (실시간 데이터)</h3>

      <!-- 기존 Mock 데이터 목록은 로딩 상태 없이 바로 렌더링했다. -->
      <p v-if="isLoading" class="loading-message">실시간 날씨 데이터를 불러오는 중입니다.</p>

      <template v-else>
        <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" @select-card="(msg) => (selectedCityInfo = msg)" @click-detail="handleDetailJump(item.id)" />
        <p v-if="filteredWeatherList.length === 0" class="empty-message">검색 결과와 일치하는 도시가 없습니다.</p>
      </template>
    </BaseDashboardCard>
    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.status-bar {
  background: #e8f5e9;
  padding: 10px;
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
  border-radius: 6px;
}

.loading-message {
  grid-column: 1 / -1;
  padding: 20px 0;
  color: #3498db;
  text-align: center;
  font-weight: 700;
}
</style>
