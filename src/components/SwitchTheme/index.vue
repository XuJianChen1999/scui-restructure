<template>
  <el-switch v-model="theme" active-value="dark" inactive-value="default" />
</template>

<script setup>
import useTheme from '@/hooks/useTheme'
const theme = useTheme()

useTheme()
</script>