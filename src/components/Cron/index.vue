<template>
  <el-input v-model="defaultValue" v-bind="$attrs">
		<template #append>
			<el-dropdown size="medium" @command="handleShortcuts">
				<el-button icon="el-icon-arrow-down"></el-button>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="0 * * * * ?">每分钟</el-dropdown-item>
						<el-dropdown-item command="0 0 * * * ?">每小时</el-dropdown-item>
						<el-dropdown-item command="0 0 0 * * ?">每天零点</el-dropdown-item>
						<el-dropdown-item command="0 0 0 1 * ?">每月一号零点</el-dropdown-item>
						<el-dropdown-item command="0 0 0 L * ?">每月最后一天零点</el-dropdown-item>
						<el-dropdown-item command="0 0 0 ? * 1">每周星期日零点</el-dropdown-item>
						<el-dropdown-item v-for="(item, index) in shortcuts" :key="item.value" :divided="index==0" :command="item.value">{{item.text}}</el-dropdown-item>
						<el-dropdown-item icon="el-icon-plus" divided command="custom">自定义</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</template>
	</el-input>

	<el-dialog title="cron规则生成器" v-model="dialogVisible" :width="580" destroy-on-close append-to-body>
		<div class="sc-cron">
			<el-tabs>
				<el-tab-pane>
					<template #label>
						<div class="sc-cron-num">
							<h2>秒</h2>
							<h4>{{value_second}}</h4>
						</div>
					</template>
					<el-form>
						<el-form-item label="类型">
							<el-radio-group v-model="value.second.type">
								<el-radio-button label="0">任意值</el-radio-button>
								<el-radio-button label="1">范围</el-radio-button>
								<el-radio-button label="2">间隔</el-radio-button>
								<el-radio-button label="3">指定</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="范围" v-if="value.second.type === 1">
							<el-input-number v-model="value.second.range.start" :min="0" :max="59" controls-position="right" />
							<span style="padding:0 15px;">-</span>
							<el-input-number v-model="value.second.range.end" :min="0" :max="59" controls-position="right" />
						</el-form-item>
						<el-form-item label="间隔" v-if="value.second.type === 2">
							<el-input-number v-model="value.second.loop.start" :min="0" :max="59" controls-position="right" />
							秒开始，每
							<el-input-number v-model="value.second.loop.end" :min="0" :max="59" controls-position="right" />
							秒执行一次
						</el-form-item>
						<el-form-item label="指定" v-if="value.second.type === 3">
							<el-select v-model="value.second.appoint" multiple style="width: 100%;">
								<el-option v-for="(item, index) in data.second" :key="index" :label="item" :value="item" />
							</el-select>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane>
					<template #label>
						<div class="sc-cron-num">
							<h2>分钟</h2>
							<h4>{{value_minute}}</h4>
						</div>
					</template>
					<el-form>
						<el-form-item label="类型">
							<el-radio-group v-model="value.minute.type">
								<el-radio-button label="0">任意值</el-radio-button>
								<el-radio-button label="1">范围</el-radio-button>
								<el-radio-button label="2">间隔</el-radio-button>
								<el-radio-button label="3">指定</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="范围" v-show="value.minute.type === 1">
							<el-input-number v-model="value.minute.range.start" :min="0" :max="59" controls-position="right" />
							<span style="padding:0 15px;">-</span>
							<el-input-number v-model="value.minute.range.end" :min="0" :max="59" controls-position="right" />
						</el-form-item>
						<el-form-item label="间隔" v-show="value.minute.type === 2">
							<el-input-number v-model="value.minute.loop.start" :min="0" :max="59" controls-position="right" />
							分钟开始，每
							<el-input-number v-model="value.minute.loop.end" :min="0" :max="59" controls-position="right" />
							分钟执行一次
						</el-form-item>
						<el-form-item label="指定" v-show="value.minute.type === 3">
							<el-select v-model="value.minute.appoint" multiple style="width: 100%;">
								<el-option v-for="(item, index) in data.minute" :key="index" :label="item" :value="item" />
							</el-select>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane>
					<template #label>
						<div class="sc-cron-num">
							<h2>小时</h2>
							<h4>{{value_hour}}</h4>
						</div>
					</template>
					<el-form>
						<el-form-item label="类型">
							<el-radio-group v-model="value.hour.type">
								<el-radio-button label="0">任意值</el-radio-button>
								<el-radio-button label="1">范围</el-radio-button>
								<el-radio-button label="2">间隔</el-radio-button>
								<el-radio-button label="3">指定</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="范围" v-show="value.hour.type === 1">
							<el-input-number v-model="value.hour.range.start" :min="0" :max="23" controls-position="right" />
							<span style="padding:0 15px;">-</span>
							<el-input-number v-model="value.hour.range.end" :min="0" :max="23" controls-position="right" />
						</el-form-item>
						<el-form-item label="间隔" v-show="value.hour.type === 2">
							<el-input-number v-model="value.hour.loop.start" :min="0" :max="23" controls-position="right" />
							小时开始，每
							<el-input-number v-model="value.hour.loop.end" :min="0" :max="23" controls-position="right" />
							小时执行一次
						</el-form-item>
						<el-form-item label="指定" v-show="value.hour.type === 3">
							<el-select v-model="value.hour.appoint" multiple style="width: 100%;">
								<el-option v-for="(item, index) in data.hour" :key="index" :label="item" :value="item" />
							</el-select>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane>
					<template #label>
						<div class="sc-cron-num">
							<h2>日</h2>
							<h4>{{value_day}}</h4>
						</div>
					</template>
					<el-form>
						<el-form-item label="类型">
							<el-radio-group v-model="value.day.type">
								<el-radio-button label="0">任意值</el-radio-button>
								<el-radio-button label="1">范围</el-radio-button>
								<el-radio-button label="2">间隔</el-radio-button>
								<el-radio-button label="3">指定</el-radio-button>
								<el-radio-button label="4">本月最后一天</el-radio-button>
								<el-radio-button label="5">不指定</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="范围" v-show="value.day.type === 1">
							<el-input-number v-model="value.day.range.start" :min="1" :max="31" controls-position="right" />
							<span style="padding:0 15px;">-</span>
							<el-input-number v-model="value.day.range.end" :min="1" :max="31" controls-position="right" />
						</el-form-item>
						<el-form-item label="间隔" v-show="value.day.type === 2">
							<el-input-number v-model="value.day.loop.start" :min="1" :max="31" controls-position="right" />
							号开始，每
							<el-input-number v-model="value.day.loop.end" :min="1" :max="31" controls-position="right" />
							天执行一次
						</el-form-item>
						<el-form-item label="指定" v-show="value.day.type === 3">
							<el-select v-model="value.day.appoint" multiple style="width: 100%;">
								<el-option v-for="(item, index) in data.day" :key="index" :label="item" :value="item" />
							</el-select>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane>
					<template #label>
						<div class="sc-cron-num">
							<h2>月</h2>
							<h4>{{value_month}}</h4>
						</div>
					</template>
					<el-form>
						<el-form-item label="类型">
							<el-radio-group v-model="value.month.type">
								<el-radio-button label="0">任意值</el-radio-button>
								<el-radio-button label="1">范围</el-radio-button>
								<el-radio-button label="2">间隔</el-radio-button>
								<el-radio-button label="3">指定</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="范围" v-show="value.month.type === 1">
							<el-input-number v-model="value.month.range.start" :min="1" :max="12" controls-position="right" />
							<span style="padding:0 15px;">-</span>
							<el-input-number v-model="value.month.range.end" :min="1" :max="12" controls-position="right" />
						</el-form-item>
						<el-form-item label="间隔" v-show="value.month.type === 2">
							<el-input-number v-model="value.month.loop.start" :min="1" :max="12" controls-position="right" />
							月开始，每
							<el-input-number v-model="value.month.loop.end" :min="1" :max="12" controls-position="right" />
							月执行一次
						</el-form-item>
						<el-form-item label="指定" v-show="value.month.type === 3">
							<el-select v-model="value.month.appoint" multiple style="width: 100%;">
								<el-option v-for="(item, index) in data.month" :key="index" :label="item" :value="item" />
							</el-select>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane>
					<template #label>
						<div class="sc-cron-num">
							<h2>周</h2>
							<h4>{{value_week}}</h4>
						</div>
					</template>
					<el-form>
						<el-form>
							<el-form-item label="类型">
								<el-radio-group v-model="value.week.type">
									<el-radio-button label="0">任意值</el-radio-button>
									<el-radio-button label="1">范围</el-radio-button>
									<el-radio-button label="2">间隔</el-radio-button>
									<el-radio-button label="3">指定</el-radio-button>
									<el-radio-button label="4">本月最后一周</el-radio-button>
									<el-radio-button label="5">不指定</el-radio-button>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="范围" v-show="value.week.type === 1">
								<el-select v-model="value.week.range.start">
									<el-option v-for="(item, index) in data.week" :key="index" :label="item.label" :value="item.value" />
								</el-select>
								<span style="padding:0 15px;">-</span>
								<el-select v-model="value.week.range.end">
									<el-option v-for="(item, index) in data.week" :key="index" :label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
							<el-form-item label="间隔" v-show="value.week.type === 2">
								第
								<el-input-number v-model="value.week.loop.start" :min="1" :max="4" controls-position="right" />
								周的星期
								<el-select v-model="value.week.loop.end">
									<el-option v-for="(item, index) in data.week" :key="index" :label="item.label" :value="item.value" />
								</el-select>
								执行一次
							</el-form-item>
							<el-form-item label="指定" v-show="value.week.type === 3">
								<el-select v-model="value.week.appoint" multiple style="width: 100%;">
									<el-option v-for="(item, index) in data.week" :key="index" :label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
							<el-form-item label="最后一周" v-show="value.week.tyshow === 4">
								<el-select v-model="value.week.last">
									<el-option v-for="(item, index) in data.week" :key="index" :label="item.label" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-form>
					</el-form>
				</el-tab-pane>
				<el-tab-pane>
					<template #label>
						<div class="sc-cron-num">
							<h2>年</h2>
							<h4>{{value_year}}</h4>
						</div>
					</template>
					<el-form>
						<el-form-item label="类型">
							<el-radio-group v-model="value.year.type">
								<el-radio-button label="-1">忽略</el-radio-button>
								<el-radio-button label="0">任意值</el-radio-button>
								<el-radio-button label="1">范围</el-radio-button>
								<el-radio-button label="2">间隔</el-radio-button>
								<el-radio-button label="3">指定</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="范围" v-show="value.year.type === 1">
							<el-input-number v-model="value.year.range.start" controls-position="right" />
							<span style="padding:0 15px;">-</span>
							<el-input-number v-model="value.year.range.end" controls-position="right" />
						</el-form-item>
						<el-form-item label="间隔" v-show="value.year.type === 2">
							<el-input-number v-model="value.year.loop.start" controls-position="right" />
							年开始，每
							<el-input-number v-model="value.year.loop.end" :min="1" controls-position="right" />
							年执行一次
						</el-form-item>
						<el-form-item label="指定" v-show="value.year.type === 3">
							<el-select v-model="value.year.appoint" multiple style="width: 100%;">
								<el-option v-for="(item, index) in data.year" :key="index" :label="item" :value="item" />
							</el-select>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</div>

		<template #footer>
			<el-button @click="dialogVisible = false" >取 消</el-button>
			<el-button type="primary" @click="submit()">确 认</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'
import useCron from './useCron'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {type: String, default: '* * * * * ?'},
  shortcuts: {type: Array, default: () => []}
})

const {
  defaultValue, dialogVisible, value, data, 
  value_second, value_minute, value_hour, value_day, value_month, value_week, value_year,
  handleShortcuts, submit
} = useCron(props, handleEmits)

function handleEmits(value) {
  emits(value)
}
</script>

<style scoped>
.sc-cron:deep(.el-tabs__item) {height: auto;line-height: 1;padding:0 7px;vertical-align: bottom;}
.sc-cron-num {text-align: center;margin-bottom: 15px;width: 100%;}
.sc-cron-num h2 {font-size: 12px;margin-bottom: 15px;font-weight: normal;}
.sc-cron-num h4 {display: block;height: 32px;line-height: 30px;width: 100%;font-size: 12px;padding:0 15px;background: var(--el-color-primary-light-9);border-radius:4px;}
.sc-cron:deep(.el-tabs__item.is-active) .sc-cron-num h4 {background: var(--el-color-primary);color: #fff;}

[data-theme='dark'] .sc-cron-num h4 {background: var(--el-color-white);}
</style>