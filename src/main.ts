import { createApp } from "vue";
import App from "./App.vue";

import "./registerServiceWorker";

import router from "./router";
import store from "./store";

import BalmUI from "balm-ui";
import BalmUIPlus from "balm-ui/dist/balm-ui-plus";
import BalmUINext from "balm-ui/dist/balm-ui-next";

createApp(App)
  .use(BalmUI)
  .use(BalmUIPlus)
  .use(BalmUINext)
  .use(store)
  .use(router)
  .mount("#app");
