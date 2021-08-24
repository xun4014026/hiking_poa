import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import axios from 'axios'

// 載入 vue2-leaflet，依照自己需要載入組件
import { LMap, LTileLayer, LMarker, LPopup, LIcon, LTooltip } from "vue2-leaflet";
// 載入 css
import "leaflet/dist/leaflet.css";

// 載入 css
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// 載入 markercluster 並啟用
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import VGeosearch from 'vue2-leaflet-geosearch';
Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster);

// 啟用載入的各組件
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-popup", LPopup);
Vue.component("l-icon", LIcon);
Vue.component("l-tooltip", LTooltip);

// 設定預設 icon
import { Icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.config.productionTip = false
window.axios = require('axios');

new Vue({
  router,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
