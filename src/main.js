import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ElButton, ElCard, ElInput, ElInputNumber, ElProgress, ElRate, ElResult, ElSwitch, ElTag } from 'element-plus'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/card/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/input-number/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/progress/style/css'
import 'element-plus/es/components/rate/style/css'
import 'element-plus/es/components/result/style/css'
import 'element-plus/es/components/switch/style/css'
import 'element-plus/es/components/tag/style/css'

import App from './App_exercise.vue'
import router from './router'

const app = createApp(App)
const elementComponents = [ElButton, ElCard, ElInput, ElInputNumber, ElProgress, ElRate, ElResult, ElSwitch, ElTag]

app.use(createPinia())
app.use(router)
elementComponents.forEach((component) => app.component(component.name, component))

app.mount('#app')
