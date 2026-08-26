<script setup>
defineProps({
  activity: {
    type: String,
    required: true,
  },
  preparation: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="activity-info">
    <p>추천 활동: {{ activity }}</p>
    <p>준비물: {{ preparation }}</p>
  </div>
</template>

<style scoped>
.activity-info {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e9ecef;
}

.activity-info p {
  margin: 4px 0;
}
</style>
