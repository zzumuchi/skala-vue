<template>
  <el-card class="base-dashboard-card" shadow="never">
    <slot></slot>
  </el-card>
</template>

<style scoped>
.base-dashboard-card {
  margin-bottom: 15px;
  background: #f8f9fa;
  border-color: #e9ecef;
}

.base-dashboard-card :deep(.el-card__body) {
  padding: 15px;
}
</style>
