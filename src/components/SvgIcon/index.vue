<template>
  <div 
    v-if="isExternalIcon" 
    :style="styleExternalIcon" 
    class="svg-external-icon svg-icon"
    :class="className"
  />
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>  
</template>

<script setup>
import {computed, defineProps} from 'vue'
import {isExternal} from '@/utils/utils'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})
// 是否是外部图标
const isExternalIcon = computed(() => isExternal(props.icon))
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
const iconName = computed(() => `#icon-${props.icon}`)

</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover;
  display: inline-block;
}
</style>