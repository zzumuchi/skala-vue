import axios from 'axios'

const LOCAL_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const LOCAL_ENDPOINTS = {
  current: 'https://api.openweathermap.org/data/2.5/weather',
  forecast: 'https://api.openweathermap.org/data/2.5/forecast',
  air: 'https://api.openweathermap.org/data/2.5/air_pollution',
}

const requestWeather = (type, params) => {
  if (import.meta.env.DEV) {
    if (!LOCAL_API_KEY) {
      return Promise.reject(new Error('OpenWeatherMap API Key가 설정되지 않았습니다.'))
    }

    const localParams = {
      ...params,
      appid: LOCAL_API_KEY,
    }

    if (type !== 'air') {
      localParams.units = 'metric'
      localParams.lang = 'kr'
    }

    return axios.get(LOCAL_ENDPOINTS[type], { params: localParams })
  }

  return axios.get('/api/weather', {
    params: { type, ...params },
  })
}

export const hasWeatherApiConfig = () => {
  return !import.meta.env.DEV || Boolean(LOCAL_API_KEY)
}

export const fetchCurrentWeather = (params) => requestWeather('current', params)
export const fetchWeatherForecast = (params) => requestWeather('forecast', params)
export const fetchAirQuality = (params) => requestWeather('air', params)
