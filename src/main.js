import { createApp } from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import VueCookies from "vue3-cookies";
import VueNativeSock from "vue-native-websocket-vue3";

createApp(App)
  .use(router)
  .use(Vuex)
  .use(VueNativeSock, `ws://localhost:7681/`, {
    reconnection: true,
    reconnectionAttempts: 100,
    reconnectionDelay: 300,
    connectManually: true,
    protocol: "lws-minimal",
  })
  .use(VueCookies)
  .mount("#app");
