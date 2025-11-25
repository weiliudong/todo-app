// 入口文件
import {createApp} from 'vue'
import App from './App.vue'
import './styles/main.css'
import ConfirmDialog from './components/ConfirmDialog.vue'

const app = createApp(App)
// 全局注册弹窗组件
app.component('ConfirmDialog', ConfirmDialog)
app.mount('#app')
