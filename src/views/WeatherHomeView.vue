<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import BaseDashboardCard from '@/components/exercise/3_Component/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/3_Component/SearchBar.vue'
import WeatherCard from '@/components/exercise/3_Component/WeatherCard.vue'
import { fetchCurrentWeather, hasWeatherApiConfig } from '@/services/weatherApi'

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
const isLoading = ref(false)

// OpenWeatherMap에서 네 지역의 실시간 날씨를 가져온다.
const fetchRealTimeWeather = async () => {
  if (!hasWeatherApiConfig()) {
    console.error('OpenWeatherMap API Key가 설정되지 않았습니다.')
    return
  }

  isLoading.value = true

  try {
    const [seoulRes, suwonRes, busanRes, pangyoRes] = await Promise.all([
      fetchCurrentWeather({ q: 'Seoul' }),
      fetchCurrentWeather({ q: 'Suwon' }),
      fetchCurrentWeather({ q: 'Busan' }),
      fetchCurrentWeather({ lat: 37.3947, lon: 127.1112 }),
    ])

    weatherList.value = [
      {
        id: 'city_01',
        name: '서울',
        temp: seoulRes.data.main.temp,
        status: seoulRes.data.weather[0].description,
        activity: '한강 산책',
        preparation: '선크림',
      },
      {
        id: 'city_02',
        name: '수원',
        temp: suwonRes.data.main.temp,
        status: suwonRes.data.weather[0].description,
        activity: '실내 전시 관람',
        preparation: '우산',
      },
      {
        id: 'city_03',
        name: '부산',
        temp: busanRes.data.main.temp,
        status: busanRes.data.weather[0].description,
        activity: '해변 산책',
        preparation: '얇은 겉옷',
      },
      {
        id: 'city_04',
        name: '판교',
        temp: pangyoRes.data.main.temp,
        status: pangyoRes.data.weather[0].description,
        activity: '카페에서 코딩하기',
        preparation: '노트북',
      },
    ]

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
</script>

<template>
  <div class="dashboard-wrapper">
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
