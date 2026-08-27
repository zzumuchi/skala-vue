<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push({ name: 'WeatherHome' })
}
</script>

<template>
  <div class="not-found-container">
    <el-result icon="warning" title="404" sub-title="요청하신 주소가 존재하지 않거나 아직 개발되지 않았습니다.">
      <template #extra>
        <el-button type="primary" @click="goHome">날씨 메인으로 이동</el-button>
      </template>
    </el-result>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f8f9fa;
  font-family: 'Noto Sans KR', sans-serif;
}

.not-found-container :deep(.el-result) {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
