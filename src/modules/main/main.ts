import { createApp } from "vue";
import naive from "naive-ui";
import App from "./App.vue";
import "./assets/style/global.less";
import "virtual:svg-icons-register";

import router from "./router/index";
import { createPinia } from "pinia";

debugger;
const app = createApp(App);

app.use(router);

app.use(naive);

app.use(createPinia());

app.mount("#app");
