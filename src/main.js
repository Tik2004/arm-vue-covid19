import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import { KinesisContainer, KinesisElement,KinesisDistance } from 'vue-kinesis';
import moment from 'moment'

Vue.prototype.$moment = moment;
Vue.component('kinesis-container', KinesisContainer)
Vue.component('kinesis-distance', KinesisDistance)
Vue.component('kinesis-element', KinesisElement)
Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
