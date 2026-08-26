<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import BaseDashboardCard from '@/components/exercise/3_Component/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/3_Component/SearchBar.vue'
import WeatherCard from '@/components/exercise/3_Component/WeatherCard.vue'

const router = useRouter()
const route = useRoute()

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', activity: '한강 산책', preparation: '선크림' },
  { id: 'city_02', name: '수원', temp: 24, status: '비', activity: '실내 전시 관람', preparation: '우산' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', activity: '해변 산책', preparation: '얇은 겉옷' },
  { id: 'city_04', name: '판교', temp: 27, status: '맑음', activity: '카페에서 코딩하기', preparation: '노트북' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해보세요.')

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
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
      <h3>지역별 날씨 현황</h3>
      <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" @select-card="(msg) => (selectedCityInfo = msg)" @click-detail="handleDetailJump(item.id)" />
      <p v-if="filteredWeatherList.length === 0" class="empty-message">검색 결과와 일치하는 도시가 없습니다.</p>
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
</style>
