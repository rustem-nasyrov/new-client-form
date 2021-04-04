import Vue from "vue";
import Vuelidate from "vuelidate/src";
import Form from "./form";
import "./main.scss";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
  name: "new-client-form",
  render: (h) => h(Form),
}).$mount("#app");
