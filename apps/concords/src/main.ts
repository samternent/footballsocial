import { createApp } from "vue";
import Toast from "vue-toastification";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "vue-toastification/dist/index.css";
import registerSW from "./utils/registerSW";

const app = createApp(App);
app.use(router);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 1,
  newestOnTop: true,
});

registerSW();

app.mount("#app");
