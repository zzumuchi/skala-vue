export const weatherCities = [
  {
    id: 'city_01',
    name: '서울',
    fullName: '대한민국 서울특별시',
    params: { lat: 37.5665, lon: 126.978 },
    mapPosition: { top: '25%', left: '38%' },
  },
  {
    id: 'city_04',
    name: '판교',
    fullName: '경기도 성남시 판교',
    params: { lat: 37.3947, lon: 127.1112 },
    mapPosition: { top: '34%', left: '47%' },
  },
  {
    id: 'city_02',
    name: '수원',
    fullName: '경기도 수원시',
    params: { lat: 37.2636, lon: 127.0286 },
    mapPosition: { top: '42%', left: '32%' },
  },
  {
    id: 'city_05',
    name: '강릉',
    fullName: '강원특별자치도 강릉시',
    params: { lat: 37.7519, lon: 128.8761 },
    mapPosition: { top: '27%', left: '73%' },
  },
  {
    id: 'city_03',
    name: '부산',
    fullName: '부산광역시',
    params: { lat: 35.1796, lon: 129.0756 },
    mapPosition: { top: '73%', left: '70%' },
  },
  {
    id: 'city_06',
    name: '제주',
    fullName: '제주특별자치도 제주시',
    params: { lat: 33.4996, lon: 126.5312 },
    mapPosition: { top: '90%', left: '24%' },
  },
]

export const weatherCityMap = Object.fromEntries(weatherCities.map((city) => [city.id, city]))
