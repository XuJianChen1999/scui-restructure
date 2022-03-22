<template>
  <transition name="el-zoom-in-top">
		<div v-if="visible" ref="contextmenuRef" class="sc-contextmenu" :style="{left:left+'px', top:top+'px'}" @contextmenu.prevent="fun">
			<ul class="sc-contextmenu__menu">
				<slot />
			</ul>
		</div>
	</transition>
</template>

<script setup>
import {provide, ref, watch, defineEmits, defineExpose, nextTick} from 'vue'
import {emitsUtil} from '@/utils/utils'

provide('menuClick', menuClick)
defineEmits(['command', 'visibleChange'])

const contextmenuRef = ref(null)
const visible = ref(false)
const top = ref(0)
const left = ref(0)

watch(visible, newVal => {
  const cm = function(e){
    let menuRef = contextmenuRef.value
    if (menuRef && !menuRef.contains(e.target)) {
      closeMenu()
    }
  }
  if (newVal) {
    document.body.addEventListener('click', e => cm(e))
  } else {
    document.body.removeEventListener('click', e => cm(e))
  }
})

// eslint-disable-next-line no-unused-vars
async function openMenu(e) {
  e.preventDefault()
  const menuRefVal = contextmenuRef.value
  const {clientX, clientY} = e
  const {innerWidth, innerHeight} = window
  console.log(menuRefVal);
  visible.value = true
  left.value = clientX + 1
  top.value = clientY + 1
  await nextTick()
  const ex = clientX + 1
  const ey = clientY + 1
  const width = innerWidth
  const height = innerHeight
  const menuHeight = menuRefVal.offsetHeight
  const menuWidth = menuRefVal.offsetWidth
  // 位置修正公示
  // left = (当前点击X + 菜单宽度 > 可视区域宽度 ? 可视区域宽度 - 菜单宽度 : 当前点击X)
  // top = (当前点击Y + 菜单高度 > 可视区域高度 ? 当前点击Y - 菜单高度 : 当前点击Y)
  this.left = ex + menuWidth > width ? width - menuWidth : ex
  this.top = ey + menuHeight > height ? ey - height : ey
  emitsUtil('visibleChange', true)
}
function menuClick(command) {
  closeMenu()
  emitsUtil('command', command)
}
function closeMenu() {
  visible.value = false
  emitsUtil('visibleChange', false)
}
function fun() {
  return false
}

defineExpose({openMenu, contextmenuRef})
</script>

<style scoped>
@import './index.css';
</style>