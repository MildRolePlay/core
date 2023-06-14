import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import './utils/events';

createApp(App).mount('#app')

declare global {
    interface Window {
        GetParentResourceName: () => string
    }
}

if(!window.GetParentResourceName) {
    window.GetParentResourceName = () => 'localhost';
}