import configStore from './config'
import userStore from './userInfo'
import keepAliveStore from './keepalive'
import iframeStore from './iframe'
const appStore = {}

export const registerStore = () => {
  appStore.configStore = configStore()
  appStore.userStore = userStore()
  appStore.keepAliveStore = keepAliveStore()
  appStore.iframeStore = iframeStore()
}

export default appStore