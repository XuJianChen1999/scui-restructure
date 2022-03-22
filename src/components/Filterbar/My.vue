<template>
	<div class="sc-filter-my">
		<div v-if="loading" class="sc-filter-my-loading">
			<el-skeleton :rows="2" animated />
		</div>
		<template v-else>
			<el-empty v-if="myFilter.length<=0" :image-size="100">
				<template #description>
					<h2>没有常用的过滤</h2>
					<p style="margin-top: 10px;max-width: 300px;">常用过滤可以将多个过滤条件保存为一个集合，方便下次进行相同条件的过滤</p>
				</template>
			</el-empty>
			<ul v-else class="sc-filter-my-list">
				<h2>我的常用过滤</h2>
				<li v-for="(item, index) in myFilter" :key="index" @click="selectMyfilter(item)">
					<label>{{item.title}}</label>
					<el-popconfirm title="确认删除此常用过滤吗？" @confirm="closeMyfilter(item, index)">
						<template #reference>
							<el-icon class="del" @click.stop="()=>{}"><el-icon-delete /></el-icon>
						</template>
					</el-popconfirm>
				</li>
			</ul>
		</template>
	</div>

</template>

<script setup>
import {defineProps, defineEmits, ref, watch, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import config from '@/config/filterbar'

const emits = defineEmits(['selectMyfilter'])
const props = defineProps({
  filterName: {type: String, default: ''},
	data: {type: Object, default: () => {}}
})

const loading = ref(false)
const myFilter = ref([])

watch(() => props.data, () => myFilter.value = props.data, {deep: true})

onMounted(() => {
  myFilter.value = props.data
	getMyfilter()
})

//选择常用过滤
function selectMyfilter(item){
  emits('selectMyfilter', item)
}
//删除常用过滤
async function closeMyfilter(item, index){
  try {
    var del = await config.delMy(props.filterName)
  } catch (error) {
    return false
  }
  if (!del) {
    return false
  }
  myFilter.value.splice(index, 1)
  ElMessage.success('删除常用成功')
}
// 远程获取我的常用
async function getMyfilter(){
  loading.value = true
  try {
    myFilter.value = await config.getMy(props.filterName)
  } catch (error) {
    return false
  }
  loading.value = false
}
</script>

<style scoped>
.sc-filter-my-loading {padding:15px;}
.sc-filter-my-list {list-style-type: none;background: #fff;border-bottom: 1px solid #e6e6e6;}
.sc-filter-my-list h2 {font-size: 12px;color: #999;font-weight: normal;padding:20px;}
.sc-filter-my-list li {padding:12px 20px;cursor: pointer;position: relative;color: #3c4a54;padding-right:80px;}
.sc-filter-my-list li:hover {background: #ecf5ff;color: #409EFF;}
.sc-filter-my-list li label {cursor: pointer;font-size: 14px;line-height: 1.8;}
.sc-filter-my-list li label span {color: #999;margin-right: 10px;}
.sc-filter-my-list li .del {position: absolute;right:20px;top:8px;border-radius:50%;width: 32px;height: 32px;display: flex;align-items: center;justify-content: center;color: #999;}
.sc-filter-my-list li .del:hover {background: #F56C6C;color: #fff;}

[data-theme='dark'] .sc-filter-my .el-empty h2 {color: #fff;}
[data-theme='dark'] .sc-filter-my-list {background: none;border-color:var(--el-border-color-base);}
[data-theme='dark'] .sc-filter-my-list li {color: #d0d0d0;}
[data-theme='dark'] .sc-filter-my-list li:hover {background: var(--el-color-white);}
</style>
