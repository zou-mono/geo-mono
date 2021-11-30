<template>
  <div id="mouse-position" :mapMode="shared.mapMode"></div>
</template>

<script>
import MousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";

export default {
  name: "CoordView",
  data() {
    return {
      shared: this.$store.state,
      mousePositionControl: this.mousePositionControl
    };
  },
  components: {},
  props: ["mapMode"],
  watch: {
    // mapMode: function(val) {
    //   if (val === "esri-dark") {
    //     document.getElementsByClassName("custom-mouse-position")[0].style.color = "black";
    //   } else if (val === "osm") {
    //   } else if (val === "amap-road") {
    //   } else if (val === "color-map") {
    //   } else if (val === "warm-map") {
    //   } else if (val === "gray-map") {
    //   } else if (val === "tdt-satellite-map") {
    //   } else if (val === "baidu-road") {
    //   } else if (val === "shade-map") {
    //   }
    // }
  },
  mounted() {
    this.mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4), //坐标格式
      projection: "EPSG:4326", //地图投影坐标系
      className: "custom-mouse-position", //坐标信息显示样式
      // 显示鼠标位置信息的目标容器
      target: document.getElementById("mouse-position"),
      undefinedHTML: "&nbsp" //未定义坐标的标记
    });
  },
  methods: {}
};
</script>

<style lang="scss">
#mouse-position {
  position: absolute;
  float: right;
  right: 5px;
  bottom: 5px;
  width: 200px;
  height: 20px;
  /* 将z-index设置为显示在地图上层 */
  z-index: 20000;
  background: white;
}

.custom-mouse-position {
  color: black;
  font-size: 18px;
  font-family: "微软雅黑";
}
</style>
