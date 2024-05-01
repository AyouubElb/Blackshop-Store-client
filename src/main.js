import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "toastr/build/toastr.css";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCfUx1RXxbf1x0ZFxMZFxbR35PMyBoS35RckVgW3xeeXBVRWhUVER1"
);
const app = createApp(App);
app.use(createPinia());

app.use(router).use(AOS.init()).mount("#app");
