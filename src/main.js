import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus';
import BalmUINext from 'balm-ui/dist/balm-ui-next';

import 'balm-ui/dist/balm-ui.css';

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(BalmUI)
    .use(BalmUINext)
    .use(BalmUIPlus)
    .mount('#app')
