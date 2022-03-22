import {ref} from 'vue'
import {defineStore} from 'pinia'
import {getToken, getItem} from '@/utils/local'
import {USER_INFO, MENU, PERMISSIONS} from '@/utils/constant'

const userStore = defineStore(USER_INFO, () => {
  const token = ref(getToken() || '')
  const userInfo = ref(getItem(USER_INFO) || {})
  const menus = ref(getItem(MENU) || [])
  const permissions = ref(getItem(PERMISSIONS) || [])

  return {token, userInfo, menus, permissions}
})

export default userStore