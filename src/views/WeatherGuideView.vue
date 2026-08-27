<script setup>
const weatherGuides = [
  {
    condition: '맑은 날',
    description: '햇빛이 강한 시간대를 피해 가벼운 야외 활동을 준비합니다.',
    activity: '공원 산책과 야외 운동',
    preparation: '선크림, 모자, 물',
  },
  {
    condition: '비 오는 날',
    description: '미끄러운 길과 갑작스러운 강수량 변화에 주의합니다.',
    activity: '전시 관람과 실내 문화생활',
    preparation: '우산, 방수 신발, 얇은 겉옷',
  },
  {
    condition: '구름 많은 날',
    description: '일교차와 바람의 변화에 대비해 체온을 조절합니다.',
    activity: '해변 산책과 카페 방문',
    preparation: '얇은 겉옷, 휴대용 가방',
  },
]
</script>

<template>
  <section class="guide-view">
    <header class="guide-header">
      <h2>날씨별 외출 준비 가이드</h2>
      <p>날씨 상태에 맞는 추천 활동과 준비물을 확인해 보세요.</p>
    </header>

    <div class="guide-grid">
      <el-card v-for="guide in weatherGuides" :key="guide.condition" class="guide-card" shadow="hover">
        <h3>{{ guide.condition }}</h3>
        <p>{{ guide.description }}</p>
        <dl>
          <div>
            <dt>추천 활동</dt>
            <dd>{{ guide.activity }}</dd>
          </div>
          <div>
            <dt>준비물</dt>
            <dd>{{ guide.preparation }}</dd>
          </div>
        </dl>
      </el-card>
    </div>

    <RouterLink :to="{ name: 'WeatherHome' }" class="guide-home-link">대시보드 홈으로 이동</RouterLink>
  </section>
</template>

<style scoped>
.guide-header {
  margin-bottom: 20px;
  text-align: center;
}

.guide-header h2 {
  margin: 0 0 8px;
  color: #35495e;
}

.guide-header p {
  margin: 0;
  color: #66727f;
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.guide-card {
  background: #f8f9fa;
  border-top: 3px solid #42b883;
}

.guide-card :deep(.el-card__body) {
  padding: 18px;
}

.guide-card h3 {
  margin: 0 0 10px;
  color: #35495e;
}

.guide-card p {
  min-height: 72px;
  margin: 0 0 14px;
  color: #66727f;
  line-height: 1.5;
}

.guide-card dl,
.guide-card dd {
  margin: 0;
}

.guide-card dl {
  display: grid;
  gap: 10px;
}

.guide-card dt {
  margin-bottom: 3px;
  color: #237451;
  font-size: 0.82rem;
  font-weight: 700;
}

.guide-card dd {
  color: #2c3e50;
  line-height: 1.45;
}

.guide-home-link {
  display: block;
  width: fit-content;
  margin: 22px auto 0;
  padding: 10px 16px;
  color: #ffffff;
  background: #35495e;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 650;
}

.guide-home-link:hover {
  background: #42b883;
}

@media (max-width: 760px) {
  .guide-grid {
    grid-template-columns: 1fr;
  }

  .guide-card p {
    min-height: auto;
  }
}
</style>
