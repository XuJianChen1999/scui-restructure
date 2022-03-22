<template>
  <div class="login_bg">
		<div class="login_adv">
			<div class="login_adv__title">
				<h2>SCUI</h2>
				<h4>高性能 / 精致 / 优雅</h4>
				<p>基于Vue3 + Element-Plus 的中后台前端解决方案。</p>
				<div>
          <el-icon><sc-icon-vue /></el-icon>
          <el-icon class="add"><el-icon-plus /></el-icon>
          <el-icon><el-icon-eleme-filled /></el-icon>
      </div>
			</div>
			<div class="login_adv__bottom">
				© {{$CONFIG.APP_NAME}} {{$CONFIG.APP_VER}}
			</div>
		</div>
		<div class="login_main">
			<div class="login_config">
				<el-button :icon="theme=='dark'?'el-icon-sunny':'el-icon-moon'" circle type="info" @click="toggleTheme"></el-button>
				<el-dropdown trigger="click" placement="bottom-end">
					<el-button circle>
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M478.33 433.6l-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4zM334.83 362L368 281.65L401.17 362z" fill="currentColor"></path><path d="M267.84 342.92a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73c39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36c-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93c.92 1.19 1.83 2.35 2.74 3.51c-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59c22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9z" fill="currentColor"></path></svg>
					</el-button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item v-for="item in lang" :key="item.value" :command="item">{{item.name}}</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
			<div class="login-form">
				<div class="login-header">
					<div class="logo">
						<img :alt="$CONFIG.APP_NAME" src="../../assets/logo.png">
						<label>{{$CONFIG.APP_NAME}}</label>
					</div>
					<h2>用户登录</h2>
				</div>
				<el-form ref="loginForm" :model="ruleForm" :rules="rules" label-width="0" size="large">
					<el-form-item prop="user">
						<el-input v-model="ruleForm.user" prefix-icon="el-icon-user" clearable placeholder="用户名 / 手机 / 邮箱">
							<template #append>
								<el-select v-model="userType" style="width: 130px;">
									<el-option label="管理员" value="admin"></el-option>
									<el-option label="用户" value="user"></el-option>
								</el-select>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="ruleForm.password" prefix-icon="el-icon-lock" clearable show-password placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item style="margin-bottom: 10px;">
						<el-row>
							<el-col :span="12">
								<el-checkbox label="记住我" v-model="ruleForm.autologin"></el-checkbox>
							</el-col>
							<el-col :span="12" style="text-align: right;">
								<el-button type="text">忘记密码？</el-button>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" style="width: 100%;" :loading="islogin" round @click="login">登录</el-button>
					</el-form-item>
				</el-form>
				<el-divider>其他登录方式</el-divider>
				<div class="login-oauth">
					<el-button size="small" type="success" icon="sc-icon-wechat" circle />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {getItem, setItem} from '@/utils/local'
import {crypto} from '@/utils/utils'
import {APP_THEME, TOKEN, USER_INFO, MENU, PERMISSIONS} from '@/utils/constant'
import {getAuthToken, getMyMenus, getOrdinaryMenus} from '@/service/user'
import Message from '@/plugins/message'

const router = useRouter()
const loginForm = ref(null)
const userType = ref('admin')
const theme = ref(getItem(APP_THEME) || 'default')
const islogin = ref(false)
const ruleForm = ref({
  user: 'admin',
  password: 'admin',
  autologin: false
})
const rules = ref({
  user: [{required: true, message: '请输入用户名', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}]
})
const lang = ref([
  {name: '简体中文', value: 'zh-cn'},
  {name: 'English', value: 'en'},
  {name: '日本語',  value: 'ja' }
])

// 登录
async function login() {
	const validate = await loginForm.value.validate().catch(() => {})
	if (!validate) return false
	islogin.value = true
	const ruleFormVal = ruleForm.value
	const data = {
		username: ruleFormVal.user,
		password: crypto.MD5(ruleFormVal.password)
	}
	// 获取token
	const user = await getAuthToken(data)
	if (user.code === 200) {
		// 不排除userInfo返回null
		const {token, userInfo = {}} = user.data
		setItem(TOKEN, token)
		setItem(USER_INFO, userInfo)
	}
	islogin.value = false
	// 获取菜单
	let menu = null
	if (ruleForm.value.user === 'admin') {
		menu = await getMyMenus()
	} else {
		menu = await getOrdinaryMenus()
	}
	if (menu.code === 200) {
		const res = menu.data
		if(!res.menu.length){
			Message({
				type: 'error',
				message: '当前用户无任何菜单权限，请联系系统管理员'
			})
			return
		}
		setItem(MENU, res.menu)
		setItem(PERMISSIONS, res.permissions)
	} else {
		Message({
			type: 'warning',
			message: menu.message
		})
		return
	}
	router.replace({path: '/'})
	Message({
		type: 'success',
		message: 'Login Success 登录成功'
	})
}
// 切换主题
function toggleTheme() {
  theme.value = theme.value === 'default' ? 'dark' : 'default'
}

/** watch操作 **/
watch(userType, newType => {
  if(newType === 'admin'){
    ruleForm.value.user = 'admin'
    ruleForm.value.password = 'admin'
  }else if(newType === 'user'){
    ruleForm.value.user = 'user'
    ruleForm.value.password = 'user'
  }
})
watch(theme, newTheme => {
  console.log(newTheme)
  document.body.setAttribute('data-theme', newTheme)
  setItem(APP_THEME, newTheme)
})
</script>

<style lang="scss" scoped>
@import './login.scss';
</style>