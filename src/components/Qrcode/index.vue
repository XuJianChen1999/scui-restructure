<template>
  <img ref="imgRef" />
</template>

<script setup>
import {ref, defineProps, onMounted, watch} from 'vue'
import QRcode from 'qrcodejs2'

const props = defineProps({
  text: { 
    type: String, 
    required: true, 
    default: ''
  },
  logo: { 
    type: String, 
    default: ''
  },
  colorDark: { 
    type: String, 
    default: '#000000' 
  },
  colorLight: { 
    type: String, 
    default: '#ffffff' 
  },
  size: { 
    type: Number, 
    default: 100 
  },
  logoSize: { 
    type: Number, 
    default: 30 
  },
  logoPadding: { 
    type: Number, 
    default: 5 
  },
  correctLevel: { 
    type: Number, 
    default: 2 
  }
})

const imgRef = ref(null)
const qrcode = ref(null)

// 创建原始二维码DOM
async function create() {
  return new Promise(resolve => {
    const element = document.createElement('div')
    new QRcode(element, {
      text: props.text,
      width: props.size,
      height: props.size,
      colorDark: props.colorDark,
      colorLight: props.colorLight,
      correctLevel: props.correctLevel
    })
    if (element.getElementsByTagName('canvas')[0]) {
      qrcode.value = element
      resolve()
    }
  })
}
// 绘制LOGO
async function drawLogo() {
  return new Promise(resolve => {
    const logo = new Image()
    const logoSizeVal = props.logoSize
    const sizeVal = props.size
    logo.src = props.logo
    const logoPos = (sizeVal - logoSizeVal) / 2
    const rectSize = logoSizeVal + props.logoPadding
    const rectPos = (sizeVal - rectSize) / 2
    var ctx = qrcode.value.getElementsByTagName('canvas')[0].getContext('2d')
    logo.onload = () => {
      ctx.fillRect(rectPos, rectPos, rectSize, rectSize)
      ctx.drawImage(logo, logoPos, logoPos, logoSizeVal, logoSizeVal)
      resolve()
    }
  })
}
async function draw(){
  await create()
  if (props.logo) {
    await drawLogo()
  }
  imgRef.value.src = qrcode.value.getElementsByTagName('canvas')[0].toDataURL('image/png')
}

onMounted(() => {
  draw()
})

watch(() => props.text, () => draw())
</script>