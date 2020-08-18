import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import { KinesisContainer, KinesisElement} from 'vue-kinesis';

Vue.component('kinesis-container', KinesisContainer)
Vue.component('kinesis-element', KinesisElement)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
