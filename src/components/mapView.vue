<template>
  <div id="map" class="map"></div>
</template>
<script>
import Vue from "vue";
import { Map, View } from "ol";
import 'ol/ol.css';
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import overlayChart from "./overlayChart";
import ncovData from "../data/ncovData.js";

const OverlayChart = Vue.extend(overlayChart);

export default {
  data() {
    return {
      map: undefined,
      overlayChartObj: undefined,
      data: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * 地图初始化
     */
    init() {
      let baseLayer = new TileLayer({
        source: new XYZ({
          url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        }),
      });
      this.map = new Map({
        target: "map",
        layers: [baseLayer],
        view: new View({
          projection: "EPSG:4326",
          zoom: 11,
          center: [114.08, 22.6],
        }),
      });

      this.map.on("click", (evt) => {
        let data = ncovData.add;
        this.showOverlayChart(evt.coordinate, data);
      });
    },

    /**
     * 显示图表
     */
    showOverlayChart(position, data) {
      if (this.overlayChartObj) {
        this.overlayChartObj.close();
        this.overlayChartObj = null;
      }

      this.overlayChartObj = this.createOverlay({
        position,
        data,
      });
      this.overlayChartObj.show();
    },

    /**
     * 创建一个overlay组件实例
     */
    createOverlay(params) {
      let obj = new OverlayChart({
        data: {
          map: this.map,
          position: params.position,
          chartData: params.data,
        },
      });

      return obj;
    },
  },
};
</script>

<style lang="scss">
html, body {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
.map {
  width: 100%;
  margin: 0px;
  height: 100%;
}
</style>