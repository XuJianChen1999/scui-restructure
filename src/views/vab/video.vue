<template>
  <ComWrapper>
		<el-row :gutter="15">
			<el-col :lg="12">
				<el-card shadow="never" header="MP4点播">
					<Video
						ref="mp4"
						src="https://cdn.jsdelivr.net/gh/scuiadmin/CDN/video/scui-player-demo-1080.mp4"
						poster="https://cdn.jsdelivr.net/gh/scuiadmin/CDN/video/scui-player-demo-1080_Moment.jpg"
						:resource="resource"
						:danmu="danmu"
						:progressDot="progressDot"
						pip
					/>
					<div style="margin-top: 15px;">
						<el-form inline>
							<el-form-item>
								<el-select v-model="mode" placeholder="Select">
									<el-option label="默认" value="scroll" />
									<el-option label="顶部" value="top" />
									<el-option label="底部" value="bottom" />
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-input v-model="input" placeholder="请输入弹幕" />
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="sendComment">发送弹幕</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="HlS(m3u8)直播">
					<Video
						src="https://hsplay-360.v.btime.com/live_btime/btv_sn_20170706_s4/index.m3u8"
						isLive
					/>
				</el-card>
			</el-col>
		</el-row>
	</ComWrapper>
</template>

<script setup>
import {defineAsyncComponent, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {resource, progressDot, danmu} from '@/plugins/mock'

const Video = defineAsyncComponent(() => import('@/components/Video'))

const mp4 = ref(null)
const input = ref('')
const mode = ref('scroll')

function sendComment(){
  const inputVal = input.value
  if (!inputVal) {
    ElMessage({
      message: '你要发送什么弹幕呢？',
      type: 'warning',
    })
    return
  }
  const mp4Val = mp4.value
  if(mp4Val.player.danmu && inputVal){
    mp4Val.player.danmu.sendComment({
      id: 'newId' + new Date().getTime(),
      start: mp4Val.player.currentTime * 1000,
      txt: inputVal,
      mode: mode.value
    })
    input.value = ''
  }
}
</script>