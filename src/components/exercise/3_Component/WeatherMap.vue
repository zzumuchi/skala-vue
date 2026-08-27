<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { getWeatherRecommendation } from '@/utils/weatherRecommendation'

const props = defineProps({
  cities: {
    type: Array,
    required: true,
  },
  selectedCityId: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select-city', 'view-detail'])
const configStore = useConfigStore()

const selectedCity = computed(() => props.cities.find((city) => city.id === props.selectedCityId) ?? props.cities[0])

const recommendation = computed(() => {
  if (!selectedCity.value) return null

  return getWeatherRecommendation({
    temperature: selectedCity.value.temp,
    weatherId: selectedCity.value.weatherId,
    windSpeed: selectedCity.value.windSpeed,
  })
})

const displayTemperature = (temperature) => {
  if (configStore.unit === 'fahrenheit') return Math.round((temperature * 9) / 5 + 32)
  return Math.round(temperature)
}
</script>

<template>
  <section class="map-explorer" aria-labelledby="map-title">
    <header class="map-heading">
      <div>
        <h2 id="map-title">지도에서 오늘의 목적지를 골라보세요</h2>
      </div>
      <p>지역 지점을 선택하면 현재 날씨에 맞는 활동과 옷차림을 바로 추천합니다.</p>
    </header>

    <div v-if="isLoading" class="map-loading">지역별 날씨와 추천 정보를 준비하고 있습니다.</div>

    <div v-else-if="cities.length" class="map-layout">
      <div class="korea-map" aria-label="대한민국 주요 지역 날씨 지도">
        <div class="korea-shape" aria-hidden="true"></div>
        <div class="jeju-shape" aria-hidden="true"></div>

        <button
          v-for="city in cities"
          :key="city.id"
          class="map-pin"
          :class="{ active: city.id === selectedCity?.id }"
          :style="city.mapPosition"
          type="button"
          :aria-pressed="city.id === selectedCity?.id"
          :aria-label="`${city.name}, ${Math.round(city.temp)}도, ${city.status}`"
          @click="emit('select-city', city.id)"
        >
          <span class="pin-dot"></span>
          <span class="pin-card">
            <strong>{{ city.name }}</strong>
            <span>{{ displayTemperature(city.temp) }}{{ configStore.unitSymbol }}</span>
          </span>
        </button>
      </div>

      <article v-if="selectedCity && recommendation" class="recommendation-panel">
        <div class="current-summary">
          <div>
            <span class="location-label">선택한 지역</span>
            <h3>{{ selectedCity.name }}</h3>
            <p>{{ selectedCity.status }}</p>
          </div>
          <strong class="current-temp">{{ displayTemperature(selectedCity.temp) }}{{ configStore.unitSymbol }}</strong>
        </div>

        <div class="weather-metrics">
          <span>습도 <strong>{{ selectedCity.humidity }}%</strong></span>
          <span>바람 <strong>{{ selectedCity.windSpeed }}m/s</strong></span>
        </div>

        <div class="recommendation-block activity-block">
          <span class="recommendation-label">추천 활동</span>
          <h4>{{ recommendation.label }}</h4>
          <ul>
            <li v-for="activity in recommendation.activities" :key="activity">{{ activity }}</li>
          </ul>
        </div>

        <div class="recommendation-block">
          <span class="recommendation-label">오늘의 옷차림</span>
          <div class="outfit-list">
            <span v-for="item in recommendation.outfit" :key="item">{{ item }}</span>
          </div>
        </div>

        <p class="weather-tip">{{ recommendation.tip }}</p>
        <el-button type="primary" class="map-detail-button" @click="emit('view-detail', selectedCity.id)">상세 예보와 대기질 보기</el-button>
      </article>
    </div>

    <p v-else class="map-empty">표시할 지역 날씨가 없습니다.</p>
  </section>
</template>

<style scoped>
.map-explorer {
  margin-bottom: 18px;
  padding: 24px;
  overflow: hidden;
  color: #243b53;
  background: linear-gradient(145deg, #f4fbf8 0%, #eef6fb 100%);
  border: 1px solid #d6e7e1;
  border-radius: 14px;
}

.map-heading {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(220px, 0.75fr);
  gap: 22px;
  align-items: end;
  margin-bottom: 22px;
}

.location-label,
.recommendation-label {
  color: #21855d;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.map-heading h2 {
  margin: 0;
  color: #263e52;
  font-size: 1.35rem;
  line-height: 1.35;
}

.map-heading p {
  margin: 0;
  color: #607586;
  font-size: 0.9rem;
  line-height: 1.6;
}

.map-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(290px, 1.1fr);
  gap: 20px;
}

.korea-map {
  position: relative;
  min-height: 470px;
  overflow: hidden;
  background: radial-gradient(circle at 50% 45%, rgba(66, 184, 131, 0.1), transparent 55%);
  border: 1px solid rgba(66, 184, 131, 0.18);
  border-radius: 12px;
}

.korea-shape {
  position: absolute;
  inset: 6% 16% 12%;
  background: linear-gradient(155deg, rgba(101, 193, 151, 0.3), rgba(66, 145, 184, 0.2));
  border: 1px solid rgba(35, 116, 81, 0.22);
  clip-path: polygon(49% 0%, 67% 8%, 79% 22%, 71% 37%, 85% 52%, 74% 69%, 60% 77%, 53% 94%, 37% 100%, 28% 83%, 14% 74%, 20% 57%, 7% 44%, 17% 29%, 26% 13%);
}

.jeju-shape {
  position: absolute;
  left: 15%;
  bottom: 5%;
  width: 22%;
  height: 5%;
  background: rgba(101, 193, 151, 0.3);
  border: 1px solid rgba(35, 116, 81, 0.22);
  border-radius: 50%;
  transform: rotate(-8deg);
}

.map-pin {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  transform: translate(-10px, -10px);
}

.pin-dot {
  width: 18px;
  height: 18px;
  background: #ffffff;
  border: 5px solid #42b883;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(36, 59, 83, 0.2);
  transition: transform 0.2s ease;
}

.pin-card {
  display: grid;
  margin-left: 6px;
  padding: 6px 8px;
  color: #40596b;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(66, 184, 131, 0.24);
  border-radius: 7px;
  box-shadow: 0 4px 12px rgba(36, 59, 83, 0.08);
  font-size: 0.72rem;
  line-height: 1.3;
  text-align: left;
}

.pin-card strong {
  color: #263e52;
}

.map-pin:hover .pin-dot,
.map-pin:focus-visible .pin-dot,
.map-pin.active .pin-dot {
  background: #42b883;
  border-color: #ffffff;
  outline: 3px solid rgba(66, 184, 131, 0.35);
  transform: scale(1.15);
}

.map-pin.active .pin-card {
  color: #ffffff;
  background: #2f8f68;
  border-color: #2f8f68;
}

.map-pin.active .pin-card strong {
  color: #ffffff;
}

.recommendation-panel {
  display: flex;
  flex-direction: column;
  padding: 22px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid #dae5e8;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(53, 73, 94, 0.08);
}

.current-summary {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.current-summary h3 {
  margin: 4px 0 2px;
  color: #263e52;
  font-size: 1.5rem;
}

.current-summary p {
  margin: 0;
  color: #607586;
}

.current-temp {
  color: #21855d;
  font-size: 2rem;
}

.weather-metrics {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}

.weather-metrics span {
  flex: 1;
  padding: 9px 10px;
  color: #607586;
  background: #f2f7f6;
  border-radius: 7px;
  font-size: 0.82rem;
  text-align: center;
}

.weather-metrics strong {
  color: #304b5d;
}

.recommendation-block {
  padding: 14px 0;
  border-top: 1px solid #e4ecee;
}

.recommendation-block h4 {
  margin: 5px 0 9px;
  color: #304b5d;
}

.recommendation-block ul {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.recommendation-block li,
.outfit-list span {
  padding: 6px 9px;
  color: #3e5d69;
  background: #edf7f2;
  border-radius: 999px;
  font-size: 0.78rem;
}

.outfit-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 9px;
}

.outfit-list span {
  color: #586575;
  background: #eef3f8;
}

.weather-tip {
  margin: auto 0 15px;
  padding: 11px 12px;
  color: #586575;
  background: #fff8e7;
  border-left: 3px solid #e9b949;
  border-radius: 5px;
  font-size: 0.82rem;
  line-height: 1.5;
}

.map-detail-button {
  width: 100%;
}

.map-loading,
.map-empty {
  padding: 60px 20px;
  color: #607586;
  text-align: center;
}

@media (max-width: 760px) {
  .map-explorer {
    padding: 18px;
  }

  .map-heading,
  .map-layout {
    grid-template-columns: 1fr;
  }

  .korea-map {
    min-height: 420px;
  }
}

@media (max-width: 460px) {
  .pin-card {
    margin-left: 3px;
    padding: 4px 5px;
  }

  .pin-dot {
    width: 15px;
    height: 15px;
    border-width: 4px;
  }
}
</style>
