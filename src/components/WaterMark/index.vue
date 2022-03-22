<!--
 * @Author: xjc
 * @Date: 2022-03-17 10:13:07
 * @LastEditTime: 2022-03-17 10:35:46
 * @LastEditors: xjc
 * @Description: 水印组件
-->
<template>
  <div class="sc-water-mark" ref="waterMarkRef">
		<slot />
	</div>
</template>

<script setup>
import {ref, defineProps, defineExpose, onMounted} from 'vue'

const props = defineProps({
  text: {type: String, required: true, default: ''},
  subtext: {type: String, default: ''},
  color: {type: String, default: 'rgba(128,128,128,0.2)'}
})

const isCreate = ref(false)
const waterMarkRef = ref(null)

onMounted(() => {
  create()
})

function create() {
  clear()
  const p = props
  //创建画板
  const canvas = document.createElement('canvas')
  canvas.width = 150
  canvas.height = 150
  canvas.style.display = 'none'
  //绘制文字
  const text = canvas.getContext('2d')
  text.rotate(-45 * Math.PI / 180)
  text.translate(-75, 25)
  text.fillStyle = p.color
  text.font = 'bold 20px SimHei'
  text.textAlign = 'center'
  text.fillText(p.text, canvas.width / 2, canvas.height / 2)
  text.font = '14px Microsoft YaHei'
  text.fillText(p.subtext, canvas.width / 2, canvas.height / 2 + 20)
  //创建水印容器
  const watermark = document.createElement('div')
  watermark.setAttribute('class', 'watermark')
  const styleStr = `position:absolute;top:0;left:0;right:0;bottom:0;z-index:99;pointer-events:none;background-repeat:repeat;background-image:url('${canvas.toDataURL("image/png")}');`
  watermark.setAttribute('style', styleStr)
  waterMarkRef.value.appendChild(watermark)
  isCreate.value = true
}
function clear() {
  const wmDom = waterMarkRef.value.querySelector('.watermark')
  wmDom && wmDom.remove()
  isCreate.value = false
}

defineExpose({create, clear, isCreate})
</script>

<style scoped>
.sc-water-mark {position: relative;display: inherit;width: 100%;height: 100%;}
</style>