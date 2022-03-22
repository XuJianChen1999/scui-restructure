<template>
  <el-color-picker v-model="colorPrimary" :predefine="colorList">></el-color-picker>
</template>

<script setup>
import {ref, defineProps, watch} from 'vue'
import {setItem, getItem} from '@/utils/local'
import {APP_COLOR} from '@/utils/constant'
import {lighten, darken} from '@/utils/color'
import {colorList} from '@/plugins/mock'
import useConfigStore from '@/store/config'

defineProps({
  colorList: {
    type: Array,
    default: () => colorList
  }
})

const colorPrimary = ref(getItem(APP_COLOR) || useConfigStore().primaryColor)

watch(colorPrimary, newColor => {
  document.documentElement.style.setProperty('--el-color-primary', newColor)
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, lighten(newColor, i / 10))
  }
  document.documentElement.style.setProperty(`--el-color-primary-darken-1`, darken(newColor, 0.1))
  setItem(APP_COLOR, newColor)
})
</script>