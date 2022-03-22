import {createApp} from 'vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import App from './App'
import router from './router'
import {registerStore} from '@/store'
import scui from './scui'
import directives from './directives'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus, {size: 'default'})
app.use(scui)
app.use(createPinia())
app.use(directives)
registerStore()

app.mount('#app')
