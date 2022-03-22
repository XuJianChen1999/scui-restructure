<template>
  <div class="sceditor">
		<Editor v-model="contentValue" :init="init" :disabled="disabled" :placeholder="placeholder" @onClick="onClick" />
	</div>
</template>

<script setup>
import {defineProps, defineEmits, watch, ref, onMounted} from 'vue'
import Editor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import {uplaodFile} from '@/service/file'

// 引入编辑器插件
import 'tinymce/plugins/code'    //编辑源码
import 'tinymce/plugins/image'   //插入编辑图片
import 'tinymce/plugins/link'    //超链接
import 'tinymce/plugins/preview' //预览
import 'tinymce/plugins/table'   //表格

const emits = defineEmits(['update:modelValue', 'onClick'])
const props = defineProps({
  modelValue: {type: String, default: ''},
  placeholder: {type: String, default: ''},
  plugins: {type: [String, Array], default: 'code image link preview table'},
  height: {type: Number, default: 300},
  disabled: {type: Boolean, default: false},
  toolbar: {
    type: [String, Array],
    default: 'undo redo |  forecolor backcolor bold italic underline strikethrough link | formatselect fontselect fontsizeselect | \
      alignleft aligncenter alignright alignjustify outdent indent lineheight | bullist numlist | \
      image table  preview | code selectall'
  }
})

const p = props
const contentValue = ref(p.modelValue)
const init = {
  content_style: '',
  language_url: 'tinymce/langs/zh_CN.js',
  language: 'zh_CN',
  skin_url: 'tinymce/skins/ui/oxide',
  content_css: 'tinymce/skins/content/default/content.css',
  fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px',
  menubar: false,
	statusbar: true,
  plugins: p.plugins,
	toolbar: p.toolbar,
  height: p.height,
	placeholder: p.placeholder,
  images_upload_handler: async (blobInfo, success, failure) => {
    const data = new FormData()
    data.append('file', blobInfo.blob() ,blobInfo.filename())
    try {
      const res = await uplaodFile.post(data)
      success(res.data.src)
    } catch (error) {
      failure('Image upload failed')
    }
  },
  setup: function(editor) {
    editor.on('init', function() {
      this.getBody().style.fontSize = '14px'
    })

  }
}

onMounted(() => {
  tinymce.init({})
})

watch(() => props.modelValue, newVal => contentValue.value = newVal)
watch(contentValue, newVal => emits('update:modelValue', newVal))

function onClick(e){
  emits('onClick', e, tinymce)
}
</script>