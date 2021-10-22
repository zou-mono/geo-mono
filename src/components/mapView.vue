<template>
  <div id="map" class="map"></div>
</template>
<script>
import Vue from "vue";
import { Map, View } from "ol";
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import overlayChart from "./overlayChart";
import ncovData from "../data/ncovData.js";
import OSM from "ol/source/OSM";
import BingMaps from "ol/source/BingMaps";
import { fromLonLat } from "ol/proj";
import projzh from "../utils/projzh";
import Projection from "ol/proj/Projection";
import { addProjection, addCoordinateTransforms, get as getProjection} from "ol/proj";
import WMTS from 'ol/source/WMTS';
import { getWidth, getTopLeft } from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

const OverlayChart = Vue.extend(overlayChart);

export default {
  data() {
    return {
      map_id: "map",
      map: undefined,
      overlayChartObj: undefined,
      esriDarkLayer: undefined,
      osmLayer: undefined,
      bingLayer: undefined,
      amapRoadLayer: undefined,
      colorLayer: undefined,
      warmLayer: undefined,
      grayLayer: undefined,
      tdtSatelliteLayer: undefined,
      tdtSatelliteAnnoLayer: undefined,
      map_baseOption: {
        target: "map",
        layers: [],
        view: new View({
          projection: "EPSG:3857",
          center: fromLonLat([114.08, 22.6]),
          // center: [0, 0],
          constrainResolution: true, // 增加这个参数可以避免缩放时候字体过小或者模糊
          zoom: 10,
          maxZoom: 16
        }),
      },
    };
  },
  props: ["mapMode"],
  mounted() {
    this.init();
  },
  watch: {
    mapMode: function (val) {
      this.osmLayer.setVisible(false);
      this.esriDarkLayer.setVisible(false);
      this.bingLayer.setVisible(false);
      this.amapRoadLayer.setVisible(false);
      this.colorLayer.setVisible(false);
      this.warmLayer.setVisible(false);
      this.grayLayer.setVisible(false);
      this.tdtSatelliteLayer.setVisible(false);
      this.tdtSatelliteAnnoLayer.setVisible(false);
      
      if (val === "esri-dark") {
        this.esriDarkLayer.setVisible(true);
        this.map.getView().setMaxZoom(16)
      } else if (val === "osm") {
        this.osmLayer.setVisible(true);
        this.map.getView().setMaxZoom(18)
      } else if (val === "amap-road") {
        this.amapRoadLayer.setVisible(true);
        this.map.getView().setMaxZoom(18)
      } else if (val === "color-map") {
        this.colorLayer.setVisible(true);
        this.map.getView().setMaxZoom(16)
      } else if (val === "warm-map") {
        this.warmLayer.setVisible(true);
        this.map.getView().setMaxZoom(16)
      } else if (val === "gray-map") {
        this.grayLayer.setVisible(true);
        this.map.getView().setMaxZoom(16)
      } else if (val === "tdt-satellite-map") {
        this.tdtSatelliteLayer.setVisible(true);
        this.tdtSatelliteAnnoLayer.setVisible(true);
        this.map.getView().setMaxZoom(18)
      } 
    },
  },
  methods: {
    createTdtWMTSLayer() {
        let projection = getProjection('EPSG:4326');
        let projectionExtent = projection.getExtent();
        let size = getWidth(projectionExtent) / 256;
        const level = 19;
        let resolutions = new Array(level);
        let matrixIds = new Array(level);
        for (var z = 1; z < level; ++z) {
            // generate resolutions and matrixIds arrays for this WMTS
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }
 
        let layer = new TileLayer({
            // opacity: opacity,
            source: new WMTS({
              attributions: 'Tiles © <a href="http://www.tianditu.com/service/info.html?sid=5292&type=info">天地图</a>',
              // url: 'http://t'+Math.round(Math.random()*7)+'.tianditu.com/'+type+'/wmts',
              url: 'http://t0.tianditu.gov.cn/img_c/wmts?tk=b04ac957fe91b9c0e78877230acefe24',
              layer: 'img',
              matrixSet: 'c',
              format: 'tiles',
              projection: projection,
              tileGrid: new WMTSTileGrid({
                origin: getTopLeft(projectionExtent),
                resolutions: resolutions,
                matrixIds: matrixIds
              }),
              style: 'default',
              wrapX: true
            }),
            visible: false
          });
        // layer.id = type;
        return layer;
    },

    /**
     * 地图初始化
     */
    init() {
      const gcj02Extent = [
        -20037508.342789244, -20037508.342789244, 20037508.342789244,
        20037508.342789244,
      ];
      const gcjMecator = new Projection({
        code: "GCJ-02",
        extent: gcj02Extent,
        units: "m",
      });
      addProjection(gcjMecator);
      addCoordinateTransforms(
        "EPSG:4326",
        gcjMecator,
        projzh.ll2gmerc,
        projzh.gmerc2ll
      );
      addCoordinateTransforms(
        "EPSG:3857",
        gcjMecator,
        projzh.smerc2gmerc,
        projzh.gmerc2smerc
      );

      this.esriDarkLayer = new TileLayer({
        source: new XYZ({
          url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
          projection: gcjMecator,
        }),
        visible: true,
      });

      this.osmLayer = new TileLayer({
        source: new OSM(),
        visible: false,
      });

      this.bingLayer = new TileLayer({
        source: new BingMaps({
          hidpi: false,
          culture: "zh-cn",
          imagerySet: "RoadOnDemand",
          key: "Ah6weJHMS4N0HbiJcJhxdL1hSi7QUXhD8Z5maizF-kVia3oP0Xa6wkTlLsDfRr4P",
          projection: gcjMecator
        }),
        preload: Infinity,
        visible: false,
      });

      // //天地图路网
      // this.tdtRoadLayer = new TileLayer({
      //     title: "天地图路网",
      //     source: new XYZ({
      //         url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=b04ac957fe91b9c0e78877230acefe24"
      //     })
      // });
      //天地图注记
      this.tdtSatelliteAnnoLayer = new TileLayer({
          title: "天地图文字标注",
          source: new XYZ({
              url: 'http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=b04ac957fe91b9c0e78877230acefe24'
          }),
          visible: false
      });
      //天地图卫星影像
      this.tdtSatelliteLayer = new TileLayer({
          title: "天地图卫星影像",
          source: new XYZ({
              url: 'http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=b04ac957fe91b9c0e78877230acefe24'
          }),
          visible: false
      });
      // this.tdtSatelliteLayer = this.createTdtWMTSLayer();

      // var map = new ol.Map({
      //   target: "g2map", //地图标签id
      //   layers: [],
      //   view: new ol.View({
      //     center: [12519281, 4118382], //地图中心点位置
      //     zoom: 12,
      //   }),
      // });
      // map.addLayer(tian_di_tu_road_layer); //天地图路网
      // map.addLayer(tian_di_tu_annotation); //天地图注记
      //map.addLayer(tian_di_tu_satellite_layer);//天地图卫星影像

      this.amapRoadLayer = new TileLayer({
        title: "高德地图",
        source: new XYZ({
          url: "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scl=1&style=8&x={x}&y={y}&z={z}",
          projection: gcjMecator,
        }),
        visible: false,
      });

      this.colorLayer = new TileLayer({
        title: "彩色地图",
        source: new XYZ({
          url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
          projection: gcjMecator,
          maxZoom: 18,
        }),
        visible: false,
      });

      this.warmLayer = new TileLayer({
        title: "暖色地图",
        source: new XYZ({
          url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
          projection: gcjMecator,
        }),
        visible: false,
      });

      this.grayLayer = new TileLayer({
        title: "灰色地图",
        source: new XYZ({
          url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
          maxZoom: 16,
          projection: gcjMecator,
        }),
        visible: false,
      });

      this.map_baseOption.layers = [
        this.esriDarkLayer,
        this.osmLayer,
        this.amapRoadLayer,
        this.warmLayer,
        this.colorLayer, 
        this.grayLayer,
        this.tdtSatelliteLayer,
        this.tdtSatelliteAnnoLayer
      ]
      this.map = new Map(this.map_baseOption)

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
html,
body {
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