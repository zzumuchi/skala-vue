const temperatureOutfit = (temperature) => {
  if (temperature >= 28) return ['민소매 또는 반소매', '반바지', '통풍이 좋은 신발']
  if (temperature >= 23) return ['반소매', '얇은 셔츠', '가벼운 하의']
  if (temperature >= 20) return ['긴소매 티셔츠', '얇은 가디건', '면바지']
  if (temperature >= 17) return ['맨투맨 또는 니트', '얇은 재킷', '긴바지']
  if (temperature >= 12) return ['재킷 또는 트렌치코트', '니트', '긴바지']
  if (temperature >= 6) return ['코트', '기모 상의', '보온성 있는 신발']
  return ['패딩 또는 두꺼운 코트', '목도리와 장갑', '보온 내의']
}

// 기상 코드와 체감 요소를 조합해 외출 추천을 만든다.
export const getWeatherRecommendation = ({ temperature, weatherId, windSpeed = 0 }) => {
  const outfit = temperatureOutfit(temperature)

  if (weatherId >= 200 && weatherId < 300) {
    return {
      label: '실내 중심 일정',
      activities: ['전시·공연 관람', '실내 스포츠', '가까운 카페 방문'],
      outfit: [...outfit, '방수 겉옷'],
      tip: '천둥이 들리면 탁 트인 장소를 피하고 이동 시간을 짧게 잡으세요.',
    }
  }

  if (weatherId >= 300 && weatherId < 600) {
    return {
      label: '비를 피하는 일정',
      activities: ['미술관 관람', '서점 나들이', '실내 맛집 탐방'],
      outfit: [...outfit, '방수 신발'],
      tip: '우산을 챙기고 미끄럽지 않은 신발을 선택하세요.',
    }
  }

  if (weatherId >= 600 && weatherId < 700) {
    return {
      label: '따뜻한 겨울 일정',
      activities: ['눈 풍경 감상', '온천·스파', '실내 문화생활'],
      outfit: [...outfit, '방수 기능이 있는 신발'],
      tip: '노면 결빙과 체온 저하에 대비해 이동 시간을 여유 있게 잡으세요.',
    }
  }

  if (weatherId >= 700 && weatherId < 800) {
    return {
      label: '시야를 고려한 일정',
      activities: ['가까운 실내 산책', '카페 작업', '전시 관람'],
      outfit,
      tip: '안개나 미세먼지로 시야가 흐릴 수 있으니 장거리 야외 활동은 줄이세요.',
    }
  }

  if (temperature >= 28) {
    return {
      label: '더위를 피하는 일정',
      activities: ['해 질 무렵 산책', '수변 휴식', '실내 전시 관람'],
      outfit,
      tip: '한낮 활동은 줄이고 물과 자외선 차단제를 준비하세요.',
    }
  }

  if (temperature <= 5) {
    return {
      label: '보온 중심 일정',
      activities: ['짧은 햇빛 산책', '온실·박물관 관람', '따뜻한 카페 방문'],
      outfit,
      tip: '바람을 막을 수 있는 겉옷을 입고 장시간 야외 체류는 피하세요.',
    }
  }

  return {
    label: windSpeed >= 8 ? '바람을 고려한 일정' : '야외 활동하기 좋은 날',
    activities: windSpeed >= 8 ? ['도심 산책', '실내 클라이밍', '전시 관람'] : ['공원 산책', '자전거 타기', '야외 카페 방문'],
    outfit: windSpeed >= 8 ? [...outfit, '바람막이'] : outfit,
    tip: windSpeed >= 8 ? '강한 바람에 대비해 모자보다 바람막이를 준비하세요.' : '일교차에 대비할 수 있는 가벼운 겉옷을 챙기세요.',
  }
}
