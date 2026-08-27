<script setup>
import { useConfigStore } from '@/stores/configStore';
const configStore = useConfigStore()
</script>

<template>
    <div style="text-align: center; margin-left: auto; display: inline-flex; align-items: center; gap: 8px;">
        <span>
            날씨 단위: <strong>{{ configStore.unit === 'celsius' ? '섭씨(℃)' : '화씨(℉)'  }}</strong>
        </span>
        <el-button type="primary" plain size="small" @click="configStore.toggleUnit">단위 변경</el-button>
    </div>
</template>
