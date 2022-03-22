<template>
  <el-empty :image-size="200" :description="title" />
</template>

<script setup>
import {ref} from 'vue'

const title = ref('BLANK PAGE :)')
</script>
