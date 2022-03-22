<template>
  <div class="sc-video" ref="videoRef"></div>
</template>

<script setup>
import {defineProps, defineEmits, ref, onMounted} from 'vue'
import Player from 'xgplayer'
import HlsPlayer from 'xgplayer-hls'

// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['resourceReady'])
const props = defineProps({
  //视频路径
  src: {type: String, required: true, default: ''},
  //封面
  poster: {type: String, default: ''},
   //弹幕
  danmu: { type: [Array, String], default: '' },
  //音量
  volume: {type: Number, default: 0.8},
  //记忆播放
  lastPlayTime: {type: Number, default: 0},
  //是否显示控制
  controls: {type: Boolean, default: true},
  //是否直播场景
  isLive: {type: Boolean, default: false},
  //自动播放
  autoplay: {type: Boolean, default: false},
  //循环播放
  loop: {type: Boolean, default: false},
  //初始化显示首帧
  videoInit: {type: Boolean, default: false},
  //画中画
  pip: {type: Boolean, default: false},
  //倍速播放
  playbackRate: {type: [Array, String], default: () => [0.5, 0.75, 1, 1.5, 2]},
  //源切换
  resource: {type: Array, default: () => []},
  //进度条特殊点标记
  progressDot:  {type: Array, default: () => []},
})

const videoRef = ref(null)
const player = ref(null)

onMounted(() => {
  if (props.isLive) {
    initHls()
  } else {
    init()
  }
})

function init() {
  player.value = new Player({
    el: videoRef.value,
    url: props.src,
    fluid: true,
    poster: props.poster,
    lang: 'zh-cn',
    volume: props.volume,
    autoplay: props.autoplay,
    loop: props.loop,
    videoInit: props.videoInit,
    playbackRate: props.playbackRate,
    lastPlayTime: props.lastPlayTime,
    pip: props.pip,
    controls: props.controls,
    danmu: formatDanmu(props.danmu),
    progressDot: props.progressDot
  })
  player.value.emit('resourceReady', props.resource)
}
function initHls() {
  player.value = new HlsPlayer({
    el: videoRef.value,
    url: props.src,
    fluid: true,
    poster: props.poster,
    isLive: true,
    ignores: ['time','progress'],
    lang: 'zh-cn',
    volume: props.volume,
    pip: props.pip,
    controls: props.controls,
  })
}
function formatDanmu(danmu) {
  if (!danmu)return false
  let newDanmu = []
  danmu.forEach(item => {
    newDanmu.push({
      id: item.id || '',
      start: item.start || 0,
      txt: item.txt || '',
      duration: 10000,
      mode: item.mode || 'scroll',
      style: item.style || {}
    })
  })
  return {comments: newDanmu}
}
</script>

<style scoped>
.sc-video:deep(.danmu) > * {color: #fff;font-size:20px;font-weight:bold;text-shadow:1px 1px 0 #000,-1px -1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000;}
.sc-video:deep(.xgplayer-controls) {background-image: linear-gradient(180deg, transparent, rgba(0,0,0,0.3));}
.sc-video:deep(.xgplayer-progress-tip) {border:0;color: #fff;background: rgba(0,0,0,.5);line-height: 25px;padding: 0 10px;border-radius: 25px;}
</style>