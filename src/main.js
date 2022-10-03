import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue3, BToastPlugin } from "bootstrap-vue-3";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
// project global css
import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(store);

// Make BootstrapVue available throughout your project
app.use(BootstrapVue3);
// Optionally install the BootstrapVue icon components plugin
app.use(BToastPlugin);

app.mount("#app");
