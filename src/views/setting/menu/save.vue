<template>
  <el-row :gutter="40">
		<el-col v-if="!form.id">
			<el-empty description="请选择左侧菜单后操作" :image-size="100" />
		</el-col>
		<template v-else>
			<el-col :lg="12">
				<h2>{{form.meta.title || "新增菜单"}}</h2>
				<el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px" label-position="left">
					<el-form-item label="显示名称" prop="meta.title">
						<el-input v-model="form.meta.title" clearable placeholder="菜单显示名字" />
					</el-form-item>
					<el-form-item label="上级菜单" prop="parentId">
						<el-cascader v-model="form.parentId" :options="menuOptions" :props="menuProps" :show-all-levels="false" placeholder="顶级菜单" clearable disabled />
					</el-form-item>
					<el-form-item label="类型" prop="meta.type">
						<el-radio-group v-model="form.meta.type">
							<el-radio-button label="menu">菜单</el-radio-button>
							<el-radio-button label="iframe">Iframe</el-radio-button>
							<el-radio-button label="link">外链</el-radio-button>
							<el-radio-button label="button">按钮</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="别名" prop="name">
						<el-input v-model="form.name" clearable placeholder="菜单别名" />
						<div class="el-form-item-msg">系统唯一且与内置组件名一致，否则导致缓存失效。如类型为Iframe的菜单，别名将代替源地址显示在地址栏</div>
					</el-form-item>
					<el-form-item label="菜单图标" prop="meta.icon">
						<IconSelect v-model="form.meta.icon" clearable />
					</el-form-item>
					<el-form-item label="路由地址" prop="path">
						<el-input v-model="form.path" clearable placeholder="" />
					</el-form-item>
					<el-form-item label="重定向" prop="redirect">
						<el-input v-model="form.redirect" clearable placeholder="" />
					</el-form-item>
					<el-form-item label="菜单高亮" prop="active">
						<el-input v-model="form.active" clearable placeholder="" />
						<div class="el-form-item-msg">子节点或详情页需要高亮的上级菜单路由地址</div>
					</el-form-item>
					<el-form-item label="视图" prop="component">
						<el-input v-model="form.component" clearable placeholder="">
							<template #prepend>views/</template>
						</el-input>
						<div class="el-form-item-msg">如父节点、链接或Iframe等没有视图的菜单不需要填写</div>
					</el-form-item>
					<el-form-item label="颜色" prop="color">
						<el-color-picker v-model="form.meta.color" :predefine="predefineColors" />
					</el-form-item>
					<el-form-item label="是否隐藏" prop="meta.hidden">
						<el-checkbox v-model="form.meta.hidden">隐藏菜单</el-checkbox>
						<el-checkbox v-model="form.meta.hiddenBreadcrumb">隐藏面包屑</el-checkbox>
						<div class="el-form-item-msg">菜单不显示在导航中，但用户依然可以访问，例如详情页</div>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="save" :loading="loading">保 存</el-button>
					</el-form-item>
				</el-form>

			</el-col>
			<el-col :lg="12" class="apilist">
				<h2>接口权限</h2>
				<FormTable v-model="form.apiList" :addTemplate="apiListAddTemplate" placeholder="暂无匹配接口权限">
					<el-table-column prop="code" label="标识" width="150">
						<template #default="scope">
							<el-input v-model="scope.row.code" placeholder="请输入内容"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="url" label="Api url">
						<template #default="scope">
							<el-input v-model="scope.row.url" placeholder="请输入内容"></el-input>
						</template>
					</el-table-column>
				</FormTable>
			</el-col>
		</template>
	</el-row>
</template>

<script setup>
import {defineProps, defineExpose, ref, watch, defineAsyncComponent} from 'vue'
import {ElMessage} from 'element-plus'
import {page} from '@/service/demo'

const IconSelect = defineAsyncComponent(() => import('@/components/SvgIcon/IconSelect'))
const FormTable = defineAsyncComponent(() => import('@/components/FormTable'))

const props = defineProps({
  menu: { 
    type: Object, 
    default: () => {} 
  }
})

const loading = ref(false)
const form = ref({
  id: '',
  parentId: '',
  name: '',
  path: '',
  component: '',
  redirect: '',
  meta: {
    title: '',
    icon: '',
    active: '',
    color: '',
    type: 'menu'
  },
  apiList: []
})
const menuProps = ref({
  value: 'id',
  label: 'title',
  checkStrictly: true
})
const apiListAddTemplate = ref({
  code: '',
  url: ''
})
const rules = ref([])
const menuOptions = ref([])
const predefineColors = ['#ff4500', '#ff8c00', '#ffd700', '#67C23A', '#00ced1', '#409EFF', '#c71585']

watch(() => props.menu, () => menuOptions.value = treeToMap(props.menu), {deep: true})

// 简单化菜单
function treeToMap(tree) {
  const map = []
  tree.forEach(item => {
    const obj = {
      id: item.id,
      parentId: item.parentId,
      title: item.meta.title,
      children: item.children && item.children.length > 0 ? treeToMap(item.children) : null
    }
    map.push(obj)
  })
  return map
}
// 保存
async function save() {
  loading.value = true
  const res = await page.post(form.value)
  console.log(res)
  loading.value = false
  if (res.code === 200) {
    ElMessage.success('保存成功')
  } else {
    ElMessage.warning(res.desc)
  }
}
// 表单注入数据
function setData(data, pid) {
  form.value = data
  form.value.apiList = data.apiList || []
  form.value.parentId = pid
}

defineExpose({setData})
</script>

<style scoped>
h2 {font-size: 17px;color: #3c4a54;padding:0 0 30px 0;}
.apilist {border-left: 1px solid #eee;}

[data-theme="dark"] h2 {color: #fff;}
[data-theme="dark"] .apilist {border-color: #434343;}
</style>