import process from 'node:process'

const ENDPOINTS = {
  current: 'weather',
  forecast: 'forecast',
  air: 'air_pollution',
}

const getQueryValue = (value) => {
  return Array.isArray(value) ? value[0] : value
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ message: 'GET 요청만 허용됩니다.' })
  }

  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    return response.status(500).json({ message: '날씨 API 환경변수가 설정되지 않았습니다.' })
  }

  const type = getQueryValue(request.query.type) || 'current'
  const endpoint = ENDPOINTS[type]

  if (!endpoint) {
    return response.status(400).json({ message: '지원하지 않는 날씨 정보 유형입니다.' })
  }

  const city = getQueryValue(request.query.q)?.trim()
  const latitude = Number(getQueryValue(request.query.lat))
  const longitude = Number(getQueryValue(request.query.lon))
  const hasCoordinates = Number.isFinite(latitude) && latitude >= -90 && latitude <= 90 && Number.isFinite(longitude) && longitude >= -180 && longitude <= 180
  const hasCity = type === 'current' && city && city.length <= 80

  if (!hasCoordinates && !hasCity) {
    return response.status(400).json({ message: '올바른 도시명 또는 위도와 경도가 필요합니다.' })
  }

  const params = new URLSearchParams({ appid: apiKey })

  if (hasCity) {
    params.set('q', city)
  } else {
    params.set('lat', String(latitude))
    params.set('lon', String(longitude))
  }

  if (type !== 'air') {
    params.set('units', 'metric')
    params.set('lang', 'kr')
  }

  try {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/${endpoint}?${params}`)
    const data = await weatherResponse.json()

    if (!weatherResponse.ok) {
      return response.status(weatherResponse.status).json({ message: data.message || '날씨 정보를 불러오지 못했습니다.' })
    }

    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
    return response.status(200).json(data)
  } catch (error) {
    console.error('OpenWeather API 요청 실패:', error)
    return response.status(502).json({ message: '외부 날씨 서비스에 연결하지 못했습니다.' })
  }
}
