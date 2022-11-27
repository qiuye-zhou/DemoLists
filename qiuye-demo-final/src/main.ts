import { createApp } from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'
import QIU from '../packages';
import router from './router'
// @ts-ignore
import Preview from './components/Preview.vue';
import './assets/markdown.css';

const app = createApp(App)
app.component('Preview', Preview)
app.use(QIU)
app.use(router)
app.mount('#app')
