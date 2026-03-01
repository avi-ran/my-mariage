import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueCountdown from '@chenfengyuan/vue-countdown';
const app = createApp(App)
    
if (!VueCountdown.name) throw new Error('VueCountdown component is not properly imported. Please check the import statement and ensure that the package is installed correctly.');
app.component(VueCountdown.name, VueCountdown);
app.use(createPinia())
app.use(router)

app.mount('#app')
