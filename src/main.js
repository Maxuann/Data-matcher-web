import Vue from 'vue'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.config.productionTip = false;
Vue.prototype.GAME_DATA = GAME_DATA;

new Vue({
  render: h => h(App)
}).$mount('#app')
