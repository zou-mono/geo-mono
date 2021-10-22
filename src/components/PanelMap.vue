<template>
  <div id="PanelMap">
      <div class="item item-amap-road">
        <img src=/img/data/thumb/area-basic.png @click="amap_road_Clicked">
        <p class='map_name'>高德地图</p>
      </div>
      <div class="item item-baidu">
        <img src=/img/data/thumb/area-basic.png @click="baidu_road_Clicked">
        <p class='map_name'>百度地图</p>
      </div>
      <div class="item item-osm">
        <img src=/img/data/thumb/area-basic.png @click="osm_Clicked">
        <p class='map_name'>OSM街道地图</p>
      </div>
      <!-- <div class="item item-bing">
        <img src=/img/data/thumb/area-basic.png @click="bing_Clicked">
        <p class='map_name'>bing街道地图</p>
      </div> -->
      <div class="item item-esri-dark">
        <img src=/img/data/thumb/area-basic.png @click="esri_dark_Clicked">
        <p class='map_name'>蓝黑地图</p>
      </div>
      <div class="item item-color-map">
        <img src=/img/data/thumb/area-basic.png @click="color_map_Clicked">
        <p class='map_name'>彩色地图</p>
      </div>
      <div class="item item-warm-map">
        <img src=/img/data/thumb/area-basic.png @click="warm_map_Clicked">
        <p class='map_name'>暖色地图</p>
      </div>
      <div class="item item-gray-map">
        <img src=/img/data/thumb/area-basic.png @click="gray_map_Clicked">
        <p class='map_name'>灰色地图</p>
      </div>
      <div class="item item-tdt-satellite">
        <img src=/img/data/thumb/area-basic.png @click="tdt_satellite_Clicked">
        <p class='map_name'>天地图卫星图</p>
      </div>
  </div>
</template>

<script>
import mapView from "@c/mapView"

export default {
  name: "PanelMap",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  components: {mapView},
  watch: {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    amap_road_Clicked() {
      this.$store.state.mapMode = 'amap-road'
    },
    osm_Clicked(){
      this.$store.state.mapMode = 'osm'
    },
    baidu_road_Clicked(){
      this.$store.state.mapMode = 'baidu-road'
    },
    esri_dark_Clicked() {
      this.$store.state.mapMode = 'esri-dark'
    },
    // bing_Clicked() {
    //   this.$store.state.mapMode = 'bing'
    // },
    color_map_Clicked() {
      this.$store.state.mapMode = 'color-map'
    },
    warm_map_Clicked() {
      this.$store.state.mapMode = 'warm-map'
    },
    gray_map_Clicked() {
      this.$store.state.mapMode = 'gray-map'
    },
    tdt_satellite_Clicked() {
      this.$store.state.mapMode = 'tdt-satellite-map'
    }
  },
};
</script>

<style lang="scss">
@import "../style/color.scss";

#PanelMap {
  display: grid;
  grid-template-columns: 170px 170px 200px;
  grid-template-rows: 200px 200px 200px;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  margin: 0px 10px 0px 10px;
  align-content: center;
  justify-content: center;

  .item {
    overflow: hidden;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
  }

  .item > img {
    height: 180px;
    width: 180px;
  }
}
</style>
 

