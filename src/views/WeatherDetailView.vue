<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { fetchAirQuality, fetchCurrentWeather, fetchWeatherForecast, hasWeatherApiConfig } from '@/services/weatherApi'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

// 기존 상세 Mock 데이터
// const mockDetails = {
//   city_01: { name: '대한민국 서울특별시', temp: 28, status: '맑음', humidity: '55%', wind: '2.5m/s', activity: '한강 산책', preparation: '선크림' },
//   city_02: { name: '경기도 수원시 영통구', temp: 24, status: '비', humidity: '85%', wind: '4.1m/s', activity: '실내 전시 관람', preparation: '우산' },
//   city_03: { name: '부산광역시 해운대구', temp: 26, status: '구름', humidity: '65%', wind: '5.0m/s', activity: '해변 산책', preparation: '얇은 겉옷' },
//   city_04: { name: '경기도 성남시 판교', temp: 27, status: '맑음', humidity: '52%', wind: '2.1m/s', activity: '카페에서 코딩하기', preparation: '노트북' },
// }

const cityData = ref(null)
const forecastList = ref([])
const forecastTimezone = ref(0)
const airQuality = ref(null)
const isLoading = ref(false)
const isAdditionalLoading = ref(false)
const forecastError = ref('')
const airQualityError = ref('')

const cityMapping = {
  city_01: { params: { q: 'Seoul' }, korean: '대한민국 서울특별시', activity: '한강 산책', preparation: '선크림' },
  city_02: { params: { q: 'Suwon' }, korean: '경기도 수원시 영통구', activity: '실내 전시 관람', preparation: '우산' },
  city_03: { params: { q: 'Busan' }, korean: '부산광역시 해운대구', activity: '해변 산책', preparation: '얇은 겉옷' },
  city_04: { params: { lat: 37.3947, lon: 127.1112 }, korean: '경기도 성남시 판교', activity: '카페에서 코딩하기', preparation: '노트북' },
}

const aqiDetails = {
  1: { label: '좋음', message: '야외 활동하기 좋은 대기 상태입니다.' },
  2: { label: '보통', message: '일상적인 야외 활동이 가능합니다.' },
  3: { label: '주의', message: '민감한 사람은 장시간 야외 활동에 주의하세요.' },
  4: { label: '나쁨', message: '야외 활동을 줄이고 마스크를 준비하세요.' },
  5: { label: '매우 나쁨', message: '가급적 실내 활동을 권장합니다.' },
}

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  month: 'short',
  day: 'numeric',
  weekday: 'short',
  timeZone: 'UTC',
})

// 도시 현지 시간을 기준으로 예보 데이터를 날짜별로 묶는다.
const forecastDays = computed(() => {
  const groupedForecasts = new Map()

  forecastList.value.forEach((forecast) => {
    const localDate = new Date((forecast.dt + forecastTimezone.value) * 1000)
    const dateKey = localDate.toISOString().slice(0, 10)
    const localHour = localDate.getUTCHours()

    if (!groupedForecasts.has(dateKey)) {
      groupedForecasts.set(dateKey, [])
    }

    groupedForecasts.get(dateKey).push({ ...forecast, localHour })
  })

  return Array.from(groupedForecasts.entries())
    .slice(0, 5)
    .map(([dateKey, forecasts]) => {
      const representative = forecasts.reduce((closest, forecast) => {
        return Math.abs(forecast.localHour - 12) < Math.abs(closest.localHour - 12) ? forecast : closest
      })

      return {
        date: dateFormatter.format(new Date(`${dateKey}T00:00:00Z`)),
        minTemp: Math.min(...forecasts.map((forecast) => forecast.main.temp_min)),
        maxTemp: Math.max(...forecasts.map((forecast) => forecast.main.temp_max)),
        rainProbability: Math.round(Math.max(...forecasts.map((forecast) => forecast.pop ?? 0)) * 100),
        status: representative.weather[0]?.description ?? '정보 없음',
      }
    })
})

const currentAqi = computed(() => {
  const index = airQuality.value?.main.aqi
  return index ? aqiDetails[index] : null
})

const aqiTagType = computed(() => {
  const index = airQuality.value?.main.aqi

  if (index <= 2) return 'success'
  if (index === 3) return 'warning'
  return 'danger'
})

const convertTemperature = (temperature) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((temperature * 9) / 5 + 32)
  }

  return Math.round(temperature)
}

// 현재 날씨의 좌표로 5일 예보와 대기질을 각각 조회한다.
const fetchAdditionalWeather = async ({ lat, lon }) => {
  isAdditionalLoading.value = true
  forecastError.value = ''
  airQualityError.value = ''

  const commonParams = { lat, lon }
  const [forecastResult, airQualityResult] = await Promise.allSettled([
    fetchWeatherForecast(commonParams),
    fetchAirQuality(commonParams),
  ])

  if (forecastResult.status === 'fulfilled') {
    forecastList.value = forecastResult.value.data.list
    forecastTimezone.value = forecastResult.value.data.city.timezone
  } else {
    forecastError.value = '5일 예보를 불러오지 못했습니다.'
    console.error('5일 예보 API 연동 실패:', forecastResult.reason)
  }

  if (airQualityResult.status === 'fulfilled') {
    airQuality.value = airQualityResult.value.data.list[0]
  } else {
    airQualityError.value = '대기질 정보를 불러오지 못했습니다.'
    console.error('대기질 API 연동 실패:', airQualityResult.reason)
  }

  isAdditionalLoading.value = false
}

// 기존 Mock 데이터 조회 로직
// onMounted(() => {
//   const id = route.params.cityId
//   if (mockDetails[id]) {
//     cityData.value = mockDetails[id]
//   }
// })

// 동적 경로에 해당하는 지역의 실시간 상세 날씨를 조회한다.
onMounted(async () => {
  const targetCity = cityMapping[route.params.cityId]

  if (!targetCity || !hasWeatherApiConfig()) {
    if (!hasWeatherApiConfig()) {
      console.error('OpenWeatherMap API Key가 설정되지 않았습니다.')
    }
    return
  }

  isLoading.value = true

  try {
    const response = await fetchCurrentWeather(targetCity.params)

    const raw = response.data
    cityData.value = {
      name: targetCity.korean,
      temp: raw.main.temp,
      status: raw.weather[0].description,
      humidity: `${raw.main.humidity}%`,
      wind: `${raw.wind.speed}m/s`,
      activity: targetCity.activity,
      preparation: targetCity.preparation,
    }

    isLoading.value = false
    await fetchAdditionalWeather(raw.coord)
  } catch (error) {
    console.error('상세 날씨 API 연동 실패:', error)
  } finally {
    isLoading.value = false
  }
})

// 선택한 단위에 맞춰 상세 화면의 기온을 계산한다.
const displayTemp = computed(() => {
  if (!cityData.value) return 0

  const rawTemp = cityData.value.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
})
</script>

<template>
  <div class="detail-container">
    <h3>지역별 상세 기상 관측 정보</h3>
    <hr />

    <!-- 기존 Mock 상세 정보는 로딩 상태 없이 바로 렌더링했다. -->
    <p v-if="isLoading" class="loading-message">상세 날씨 데이터를 불러오는 중입니다.</p>

    <template v-else>
      <el-card v-if="cityData" class="info-card" shadow="never">
        <h4>지정 지역: {{ cityData.name }}</h4>
        <p>
          실시간 기온: <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
        </p>
        <p>기상 현황: {{ cityData.status }}</p>
        <p>대기 습도: {{ cityData.humidity }}</p>
        <p>현재 풍속: {{ cityData.wind }}</p>
        <p>추천 활동: {{ cityData.activity }}</p>
        <p>준비물: {{ cityData.preparation }}</p>
      </el-card>
      <div v-else>
        <p>해당 지역의 상세 데이터가 존재하지 않거나 API 호출에 실패했습니다.</p>
      </div>
    </template>

    <section v-if="cityData" class="additional-weather">
      <div class="forecast-panel">
        <h4>5일 예보</h4>
        <p v-if="isAdditionalLoading" class="additional-message">예보 데이터를 불러오는 중입니다.</p>
        <p v-else-if="forecastError" class="error-message">{{ forecastError }}</p>
        <div v-else class="forecast-grid">
          <el-card v-for="forecast in forecastDays" :key="forecast.date" class="forecast-card" shadow="hover">
            <strong>{{ forecast.date }}</strong>
            <p>{{ forecast.status }}</p>
            <p>
              {{ convertTemperature(forecast.minTemp) }}{{ configStore.unitSymbol }} /
              {{ convertTemperature(forecast.maxTemp) }}{{ configStore.unitSymbol }}
            </p>
            <p>강수확률 {{ forecast.rainProbability }}%</p>
          </el-card>
        </div>
      </div>

      <div class="air-quality-panel">
        <h4>현재 대기질</h4>
        <p v-if="isAdditionalLoading" class="additional-message">대기질 정보를 불러오는 중입니다.</p>
        <p v-else-if="airQualityError" class="error-message">{{ airQualityError }}</p>
        <el-card v-else-if="airQuality && currentAqi" :class="['air-quality-card', `aqi-${airQuality.main.aqi}`]" shadow="never">
          <div class="aqi-summary">
            <span>AQI {{ airQuality.main.aqi }}</span>
            <el-tag :type="aqiTagType" effect="dark">{{ currentAqi.label }}</el-tag>
          </div>
          <p>{{ currentAqi.message }}</p>
          <dl class="pollutant-list">
            <div>
              <dt>초미세먼지 PM2.5</dt>
              <dd>{{ Math.round(airQuality.components.pm2_5) }} μg/m³</dd>
            </div>
            <div>
              <dt>미세먼지 PM10</dt>
              <dd>{{ Math.round(airQuality.components.pm10) }} μg/m³</dd>
            </div>
            <div>
              <dt>오존 O3</dt>
              <dd>{{ Math.round(airQuality.components.o3) }} μg/m³</dd>
            </div>
          </dl>
        </el-card>
      </div>
    </section>

    <el-button class="back-btn" type="primary" @click="router.push('/')">메인 대시보드로 돌아가기</el-button>
  </div>
</template>

<style scoped>
.detail-container {
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.info-card {
  background: #f1f2f6;
  margin: 15px 0;
}
.info-card :deep(.el-card__body) {
  padding: 15px;
}
.additional-weather {
  display: grid;
  gap: 16px;
  margin: 16px 0;
}
.forecast-panel,
.air-quality-panel {
  padding: 18px;
  background: #f8f9fa;
  border: 1px solid #dfe5e8;
  border-radius: 8px;
}
.forecast-panel h4,
.air-quality-panel h4 {
  margin: 0 0 14px;
  color: #35495e;
}
.forecast-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}
.forecast-card {
  color: #2c3e50;
  background: #ffffff;
  text-align: center;
}
.forecast-card :deep(.el-card__body) {
  padding: 14px 10px;
}
.forecast-card strong {
  color: #35495e;
}
.forecast-card p {
  margin: 8px 0 0;
  color: #66727f;
  font-size: 0.88rem;
}
.air-quality-card {
  color: #2c3e50;
  background: #ffffff;
  border-left: 5px solid #42b883;
}
.air-quality-card :deep(.el-card__body) {
  padding: 16px;
}
.air-quality-card.aqi-2 {
  border-left-color: #8bc34a;
}
.air-quality-card.aqi-3 {
  border-left-color: #f0ad4e;
}
.air-quality-card.aqi-4 {
  border-left-color: #e76f51;
}
.air-quality-card.aqi-5 {
  border-left-color: #9b59b6;
}
.aqi-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.aqi-summary span {
  color: #66727f;
}
.pollutant-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 14px 0 0;
}
.pollutant-list div {
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;
}
.pollutant-list dt {
  color: #66727f;
  font-size: 0.8rem;
}
.pollutant-list dd {
  margin: 5px 0 0;
  color: #35495e;
  font-weight: 700;
}
.additional-message,
.error-message {
  margin: 0;
  padding: 14px 0;
  text-align: center;
}
.additional-message {
  color: #3498db;
}
.error-message {
  color: #e74c3c;
}
.loading-message {
  padding: 20px 0;
  color: #3498db;
  text-align: center;
  font-weight: 700;
}
.back-btn {
  margin-top: 4px;
}
@media (max-width: 720px) {
  .forecast-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .pollutant-list {
    grid-template-columns: 1fr;
  }
}
</style>
