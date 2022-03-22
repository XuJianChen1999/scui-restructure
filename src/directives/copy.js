/*
 * @Author: 徐建辰
 * @Date: 2022-03-21 08:52:55
 * @LastEditTime: 2022-03-21 08:57:51
 * @LastEditors: 徐建辰
 * @Description: 全局copy指令
 */
import {ElMessage} from 'element-plus'

export default {
  mounted(el, binding) {
    el.$value = binding.value
    el.handler = () => {
			const textarea = document.createElement('textarea')
			textarea.readOnly = 'readonly'
			textarea.style.position = 'absolute'
			textarea.style.left = '-9999px'
			textarea.value = el.$value
			document.body.appendChild(textarea)
			textarea.select()
			textarea.setSelectionRange(0, textarea.value.length)
			const result = document.execCommand('Copy')
			result && ElMessage.success('复制成功')
			document.body.removeChild(textarea)
		}
		el.addEventListener('click', el.handler)
  },
  updated(el, binding){
		el.$value = binding.value
	},
	unmounted(el){
		el.removeEventListener('click', el.handler)
	}  
}