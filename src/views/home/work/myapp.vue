<template>
  <div>
		<ul class="myMods">
			<li v-for="mod in myMods" :key="mod.path" :style="{background:mod.meta.color || '#909399'}">
				<a v-if="mod.meta.type=='link'" :href="mod.path" target="_blank">
					<el-icon><component :is="mod.meta.icon || el-icon-menu" /></el-icon>
					<p>{{mod.meta.title}}</p>
				</a>
				<router-link v-else :to="{ path: mod.path }">
					<el-icon><component :is="mod.meta.icon||el-icon-menu" /></el-icon>
					<p>{{mod.meta.title}}</p>
				</router-link>
			</li>
			<li class="modItem-add" @click="addMods">
				<a href="javascript:void(0)">
					<el-icon><el-icon-plus /></el-icon>
				</a>
			</li>
		</ul>

		<el-drawer title="添加应用" v-model="modsDrawer" :size="570" destroy-on-close>
			<div class="setMods">
				<h4>我的常用 ( {{myMods.length}} )</h4>
				<draggable tag="ul" v-model="myMods" animation="200" item-key="path" group="people">
					<template #item="{element}">
						<li :style="{background:element.meta.color||'#909399'}">
							<el-icon><component :is="element.meta.icon||el-icon-menu" /></el-icon>
							<p>{{element.meta.title}}</p>
						</li>
					</template>
				</draggable>
			</div>
			<div class="setMods">
				<h4>全部应用 ( {{filterMods.length}} )</h4>
				<draggable tag="ul" v-model="filterMods" animation="200" item-key="path" :sort="false" group="people">
					<template #item="{element}">
						<li :style="{background:element.meta.color||'#909399'}">
							<el-icon><component :is="element.meta.icon||el-icon-menu" /></el-icon>
							<p>{{element.meta.title}}</p>
						</li>
					</template>
				</draggable>
			</div>
			<template #footer>
				<el-button @click="modsDrawer = false">取消</el-button>
				<el-button type="primary" @click="saveMods">保存</el-button>
			</template>
		</el-drawer>
	</div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import draggable from 'vuedraggable'
import {getItem, setItem} from '@/utils/local'
import {MY_MODS, MENU} from '@/utils/constant'

const modsDrawer = ref(false)
const mods = ref([])
const myMods = ref([])
const myModsName = ref([])
const filterMods = ref([])

onMounted(() => {
  getMods()
})

function getMods() {
	// 这里可用改为读取远程数据
  myModsName.value = getItem(MY_MODS) || []
  const menuTree = getItem(MENU)
  const modsVal = mods.value
  const myModsNameVal = myModsName.value
  filterMenu(menuTree)
  myMods.value = modsVal.filter(item => myModsNameVal.includes(item.name))
  filterMods.value = modsVal.filter(item => !myModsNameVal.includes(item.name))
}

function filterMenu(map) {
  map.forEach(item => {
    if (item.meta.hidden) return false
    if (item.meta.type=='iframe') {
      item.path = `/i/${item.name}`
    }
    if (item.children&&item.children.length > 0) {
      filterMenu(item.children)
    } else {
      mods.value.push(item)
    }
  })
}

function saveMods(){
  setItem(MY_MODS, myMods.value.map(v => v.name))
  ElMessage.success('设置常用成功')
  modsDrawer.value = false
}
</script>

<style scoped>
.myMods {list-style:none;margin:-10px;}
.myMods li {display: inline-block;width: 100px;height:100px;vertical-align: top;transition:all 0.3s ease;margin:10px;border-radius:5px;}
.myMods li:hover {opacity: 0.8;}
.myMods li a {width: 100%;height: 100%;padding:10px;display: flex;flex-direction: column;align-items: center;justify-content: center;text-align: center;color: #fff;}
.myMods li i {font-size: 26px;color: #fff;}
.myMods li p {font-size: 12px;color: #fff;margin-top: 10px;width: 100%;white-space:nowrap;text-overflow:ellipsis;overflow: hidden;}

.modItem-add {border: 1px dashed #ddd;cursor: pointer;}
.modItem-add i {font-size: 30px;color: #999!important;}
.modItem-add:hover,.modItem-add:hover i {border-color: #409EFF;color: #409EFF!important;}

.setMods {padding:0 20px;}
.setMods h4 {font-size: 14px;font-weight: normal;}
.setMods ul {margin:20px -5px;min-height: 90px;}
.setMods li {display: inline-block;width: 80px;height:80px;text-align: center;margin:5px;color: #fff;vertical-align: top;padding:4px;padding-top:15px;cursor: move;border-radius: 3px;}
.setMods li i {font-size: 20px;}
.setMods li p {font-size: 12px;margin-top: 10px;}
.setMods li.sortable-ghost {opacity: 0.3;}
</style>