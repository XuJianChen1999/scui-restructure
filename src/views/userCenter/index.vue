<template>
  <ComWrapper>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never">
					<div class="user-info">
						<div class="user-info-top">
							<el-avatar :size="80" :src="avatar" />
							<h2>{{form.name||'-'}}</h2>
							<p>{{form.about||'无签名'}}</p>
							<el-button type="primary" round icon="el-icon-collection-tag" size="large">Administrator</el-button>
						</div>
						<div class="user-info-main">
							<ul>
								<li><label><el-icon><el-icon-user /></el-icon></label><span>81883387@qq.com</span></li>
								<li><label><el-icon><el-icon-present /></el-icon></label><span>1988-05-07</span></li>
								<li><label><el-icon><el-icon-male /></el-icon></label><span>男</span></li>
								<li><label><el-icon><el-icon-location /></el-icon></label><span>中国/上海/金山</span></li>
								<li><label><el-icon><el-icon-office-building /></el-icon></label><span>集团/上海分公司/软件研发部/摸鱼组</span></li>
								<li><label><el-icon><el-icon-coin /></el-icon></label><span>超级管理员</span></li>
							</ul>
						</div>
						<div class="user-info-bottom">
							<h2>当前账号权限</h2>
							<el-space wrap>
								<el-tag v-auth="'user.add'">user.add</el-tag>
								<el-tag v-auth="'user.edit'">user.edit</el-tag>
								<el-tag v-if="$AUTH('user.delete')">user.delete</el-tag>
								<el-tag v-if="$AUTH('list.add')">list.add</el-tag>
								<el-tag v-if="$AUTH('list.edit')">list.edit</el-tag>
								<el-tag v-if="$AUTH('list.delete')">list.delete</el-tag>
							</el-space>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :lg="16">
				<el-card shadow="never">
					<el-tabs tab-position="top">
						<el-tab-pane label="近期动态">
							<el-timeline style="margin-top:20px;padding-left:10px;">
								<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" placement="top">
									<div class="activity-item">
										<el-avatar class="avatar" :size="24" :src="avatar" />
										<label>{{activity.operate}}</label><el-tag v-if="activity.mod">{{activity.mod}}</el-tag>{{activity.describe}}
									</div>
								</el-timeline-item>
							</el-timeline>
						</el-tab-pane>
						<el-tab-pane label="个人信息">
							<el-form ref="form" :model="form" label-width="80px" style="width: 460px;margin-top:20px;">
								<el-form-item label="账号">
									<el-input v-model="form.user" disabled></el-input>
									<div class="el-form-item-msg">账号信息用于登录，系统不允许修改</div>
								</el-form-item>
								<el-form-item label="姓名">
									<el-input v-model="form.name"></el-input>
								</el-form-item>
								<el-form-item label="性别">
									<el-select v-model="form.sex" placeholder="请选择">
										<el-option label="保密" value="0"></el-option>
										<el-option label="男" value="1"></el-option>
										<el-option label="女" value="2"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="个性签名">
									<el-input v-model="form.about" type="textarea"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary">保存</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="设置">
							<el-form ref="form" :model="form" label-width="120px" style="margin-top:20px;">
								<el-form-item label="黑夜模式">
									<el-switch v-model="theme" active-value="dark" inactive-value="default" inline-prompt active-icon="el-icon-moon" inactive-icon="el-icon-sunny" />
									<div class="el-form-item-msg">适合光线较弱的环境，当前黑暗模式为beta版本</div>
								</el-form-item>
								<el-form-item label="主题颜色">
									<el-color-picker v-model="colorPrimary" :predefine="colorList"> > </el-color-picker>
								</el-form-item>
								<el-form-item label="语言(暂未开发)">
									<el-select v-model="lang">
										<el-option label="简体中文" value="zh-cn"></el-option>
										<el-option label="English" value="en"></el-option>
										<el-option label="日本語" value="ja"></el-option>
									</el-select>
									<div class="el-form-item-msg">翻译进行中，暂翻译了本视图的文本</div>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</el-col>
		</el-row>
	</ComWrapper>
</template>

<script setup>
import {ref, watch} from 'vue'
import {getItem, setItem} from '@/utils/local'
import {APP_THEME, APP_COLOR} from '@/utils/constant'
import {activities, form, colorList} from '@/plugins/mock'
import useGlobalProperties from '@/hooks/useGlobalProperties'
import useConfigStore from '@/store/config'
import avatar from '@/assets/img/avatar.jpg'

const {$CONFIG} = useGlobalProperties()
const {primaryColor} = useConfigStore()

const lang = ref('zh-cn')
const theme = ref(getItem(APP_THEME) || 'default')
const colorPrimary = ref(getItem(APP_COLOR) || $CONFIG.COLOR || primaryColor)

watch(theme, newTheme => {
  document.body.setAttribute('data-theme', newTheme)
	setItem(APP_THEME, newTheme)
}, {deep: true})
</script>

<style scoped>
.el-card {margin-bottom:15px;}
.activity-item {font-size: 13px;color: #999;display: flex;align-items: center;}
.activity-item label {color: #333;margin-right:10px;}
.activity-item .el-avatar {margin-right:10px;}
.activity-item .el-tag {margin-right:10px;}

[data-theme='dark'] .user-info-bottom {border-color: var(--el-border-color-base);}
[data-theme='dark'] .activity-item label {color: #999;}
</style>