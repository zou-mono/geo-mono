<template>
  <div id="map" class="map"></div>
</template>
<script>
import Vue from "vue";
import { Map, View } from "ol";
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import VectorTileLayer from 'ol/layer/VectorTile';
import XYZ from "ol/source/XYZ";
import overlayChart from "./overlayChart";
import ncovData from "../data/ncovData.js";
import OSM from "ol/source/OSM";
import BingMaps from "ol/source/BingMaps";
import { fromLonLat } from "ol/proj";
import {projzh, projParams} from "../utils/projzh";
import Projection from "ol/proj/Projection";
import {
  addProjection,
  addCoordinateTransforms,
  get as getProjection,
} from "ol/proj";
import WMTS from "ol/source/WMTS";
import { getWidth, getTopLeft } from "ol/extent";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import TileGrid from "ol/tilegrid/TileGrid";
import TileImage from 'ol/source/TileImage'
import { applyTransform } from "ol/extent";
import VectorTile from 'ol/source/VectorTile'
import MVT from 'ol/format/MVT';
import apply from 'ol-mapbox-style';
import olms from 'ol-mapbox-style';
import VectorTileSource from 'ol/source/VectorTile';
// import Tile from 'ol/source/Tile'

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
      bdRoadLayer: undefined,
      shadeLayer: undefined,
      // vectorTopoLayer: undefined,
      map_baseOption: {
        target: "map",
        layers: [],
        // pixelRatio: window.devicePixelRatio * 2, 
        view: new View({
          projection: "EPSG:3857",
          center: fromLonLat([114.08, 22.6]),
          // center: [0, 0],
          constrainResolution: true, // 设置缩放级别为整数，增加这个参数可以避免缩放时候字体过小或者模糊
          smoothResolutionConstraint: false,
          zoom: 10,
          maxZoom: 16,
        }),
      },
    };
  },
  props: ["mapMode"],
  mounted() {
    this.init();
  },
  watch: {
    // basemapURL = "https://basemaps-api.arcgis.com/arcgis/rest/services/styles/" + basemapId + "?type=style&token=" + apiKey

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
      this.bdRoadLayer.setVisible(false);
      this.shadeLayer.setVisible(false);

      const layers = this.map.getLayers().getArray();
      for (let i = layers.length - 1; i >= 0; --i) {
        if (layers[i].get('mapbox-source')) {
          this.map.removeLayer(layers[i]);
        }
      };
      // this.vectorTopoLayer.setVisible(false);

      if (val === "esri-dark") {
        this.esriDarkLayer.setVisible(true);
        this.map.getView().setMaxZoom(16);
      } else if (val === "osm") {
        this.osmLayer.setVisible(true);
        this.map.getView().setMaxZoom(19);
      } else if (val === "amap-road") {
        this.amapRoadLayer.setVisible(true);
        this.map.getView().setMaxZoom(18);
      } else if (val === "color-map") {
        this.colorLayer.setVisible(true);
        this.map.getView().setMaxZoom(16);
      } else if (val === "warm-map") {
        this.warmLayer.setVisible(true);
        this.map.getView().setMaxZoom(16);
      } else if (val === "gray-map") {
        this.grayLayer.setVisible(true);
        this.map.getView().setMaxZoom(16);
      } else if (val === "tdt-satellite-map") {
        this.tdtSatelliteLayer.setVisible(true);
        this.tdtSatelliteAnnoLayer.setVisible(true);
        this.map.getView().setMaxZoom(18);
      } else if (val === "baidu-road") {
        this.bdRoadLayer.setVisible(true);
        this.map.getView().setMaxZoom(18);
      } else if (val === "shade-map") {
        this.shadeLayer.setVisible(true);
        // this.vectorTopoLayer.setVisible(true);
        // olms(this.map, 'https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/resources/styles/root.json');
        // fetch('https://basemaps-api.arcgis.com/arcgis/rest/services/styles/fd66a29879c44a288d2b117ad5da2b87?type=style&token=AAPK99491a76728e419a80b189671988d83e3o6To5dT7hFcxSYvPIaUqMDk_B1e3wDZrYxtCOd-zS17TWIYF_vUXneKOiLJ6BIa').then((response) => {
        //     response.json().then((glStyle) => {
        //         // debugger
        //         apply(this.map, glStyle)//map为ol map实例，参考官方文档
        //     });
        // });
        olms(
          this.map,
          'https://basemaps-api.arcgis.com/arcgis/rest/services/styles/fd66a29879c44a288d2b117ad5da2b87?type=style&token=AAPK99491a76728e419a80b189671988d83e3o6To5dT7hFcxSYvPIaUqMDk_B1e3wDZrYxtCOd-zS17TWIYF_vUXneKOiLJ6BIa'
          // "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/2020_USA_Median_Age/VectorTileServer/resources/styles/root.json"
        )
        // olms(
        //   this.map,
        //   'https://basemaps-api.arcgis.com/arcgis/rest/services/styles/fd66a29879c44a288d2b117ad5da2b87?type=style&token=AAPK99491a76728e419a80b189671988d83e3o6To5dT7hFcxSYvPIaUqMDk_B1e3wDZrYxtCOd-zS17TWIYF_vUXneKOiLJ6BIa'
        // ).then(function(map){
        //     const mapboxStyle = map.get('mapbox-style');
        //     map.getLayers().forEach(function (layer) {
        //       const mapboxSource = layer.get('mapbox-source');
        //       if (mapboxSource && mapboxStyle.sources[mapboxSource].type === 'vector') {
        //         console.log(projzh.gcjMecatorProj)
        //         const source = layer.getSource();
        //         layer.setSource(
        //           new VectorTileSource({
        //             format: new MVT(),
        //             urls: source.getUrls(),
        //             // projection: projzh.gcjMecatorProj,
        //             maxZoom: 19
        //           })
        //         )
        //       }
        //     });   
        // });

        this.map.getView().setMaxZoom(19);
      }
    },
  },
  methods: {
    createTdtWMTSLayer() {
      let projection = getProjection("EPSG:4326");
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
          attributions:
            'Tiles © <a href="http://www.tianditu.com/service/info.html?sid=5292&type=info">天地图</a>',
          // url: 'http://t'+Math.round(Math.random()*7)+'.tianditu.com/'+type+'/wmts',
          url: "http://t0.tianditu.gov.cn/img_c/wmts?tk=b04ac957fe91b9c0e78877230acefe24",
          layer: "img",
          matrixSet: "c",
          format: "tiles",
          projection: projection,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds,
          }),
          style: "default",
          wrapX: true,
        }),
        visible: false,
      });
      // layer.id = type;
      return layer;
    },

    /**
     * 地图初始化
     */
    init() {
      // const gcj02Extent = [
      //   -20037508.342789244, -20037508.342789244, 20037508.342789244,
      //   20037508.342789244,
      // ];
      addProjection(projzh.gcjMecatorProj);
      addCoordinateTransforms(
        "EPSG:4326",
        projzh.gcjMecatorProj,
        projzh.ll2gmerc,
        projzh.gmerc2ll
      );
      addCoordinateTransforms(
        "EPSG:3857",
        projzh.gcjMecatorProj,
        projzh.smerc2gmerc,
        projzh.gmerc2smerc
      );

      addProjection(projzh.baiduMercatorProj);
      addCoordinateTransforms(
        "EPSG:4326",
        projzh.baiduMercatorProj,
        projzh.ll2bmerc,
        projzh.bmerc2ll
      );
      addCoordinateTransforms(
        "EPSG:3857",
        projzh.baiduMercatorProj,
        projzh.smerc2bmerc,
        projzh.bmerc2smerc
      );

      this.esriDarkLayer = new TileLayer({
        source: new XYZ({
          url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
          projection: projzh.gcjMecatorProj,
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
          projection: projzh.gcjMecatorProj,
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
          url: "http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=b04ac957fe91b9c0e78877230acefe24",
        }),
        visible: false,
      });
      //天地图卫星影像
      this.tdtSatelliteLayer = new TileLayer({
        title: "天地图卫星影像",
        source: new XYZ({
          url: "http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=b04ac957fe91b9c0e78877230acefe24",
        }),
        visible: false,
      });
      // this.tdtSatelliteLayer = this.createTdtWMTSLayer();

      this.amapRoadLayer = new TileLayer({
        title: "高德地图",
        source: new XYZ({
          url: "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scl=1&style=8&x={x}&y={y}&z={z}",
          projection: 'GCJ-02',
        }),
        visible: false,
      });

      let bmercResolutions = new Array(19);
      for (var i = 0; i <= 19; ++i) {
        bmercResolutions[i] = Math.pow(2, 18 - i);
      }

      var urls = [0, 1, 2, 3].map(function(sub) {
        return (
          "http://maponline" +
          sub +
          ".bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=2&udt=20211020"
        );
      });

      this.bdRoadLayer = new TileLayer({
        title: "百度路网地图",
        visible: false,
        source: new TileImage({
          projection: "bd-09",
          maxZoom: 18,
          tilePixelRatio: 2,
          tileUrlFunction: function (tileCoord) {
            // var x = tileCoord[1];
            // var y = -1 * tileCoord[2];
            // var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var z = tileCoord[0] - 1;
            //街道图
            var hash = (x << z) + y;
            var index = hash % urls.length;
            index = index < 0 ? index + urls.length : index;
            if (x < 0) {
              x = "M" + -x;
            }
            if (y < 0) {
              y = "M" + -y;
            }
            return urls[index].replace("{x}", x).replace("{y}", y) .replace("{z}", z);

            //影像
            // return 'http://shangetu' + parseInt(Math.random() * 10) + '.map.bdimg.com/it/u=x=' + x +
            // ';y=' + y + ';z=' + z + ';v=009;type=sate&fm=46&udt=20170606';
            // return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=udt=20170908&scaler=1&p=1"

            //影像标注
            // return 'http://online' + parseInt(Math.random() * 10) + '.map.bdimg.com/onlinelabel/?qt=tile&x=' +
            // x + '&y=' + y + '&z=' + z + '&styles=sl&udt=20170620&scaler=1&p=1';

            //黑色系列
            //    // return 'http://api1.map.bdimg.com/customimage/tile?&x=' +
            // x + '&y=' + y + '&z=' + z + '&udt=20170908&scale=1&ak=E4805d16520de693a3fe707cdc962045&customid=dark';

            //蓝色系列
            // return "http://api0.map.bdimg.com/customimage/tile?x=" + x
            //   + "&y=" + y + "&z=" + z
            //   + "&udt=20170908&scale=2&ak=ZUONbpqGBsYGXNIYHicvbAbM"
            //   + "&styles=t%3Awater%7Ce%3Aall%7Cc%3A%23044161%2Ct%3Aland%7Ce%3Aall%7Cc%3A%23004981%2Ct%3Aboundary%7Ce%3Ag%7Cc%3A%23064f85%2Ct%3Arailway%7Ce%3Aall%7Cv%3Aoff%2Ct%3Ahighway%7Ce%3Ag%7Cc%3A%23004981%2Ct%3Ahighway%7Ce%3Ag.f%7Cc%3A%23005b96%7Cl%3A1%2Ct%3Ahighway%7Ce%3Al%7Cv%3Aoff%2Ct%3Aarterial%7Ce%3Ag%7Cc%3A%23004981%2Ct%3Aarterial%7Ce%3Ag.f%7Cc%3A%2300508b%2Ct%3Apoi%7Ce%3Aall%7Cv%3Aoff%2Ct%3Agreen%7Ce%3Aall%7Cv%3Aoff%7Cc%3A%23056197%2Ct%3Asubway%7Ce%3Aall%7Cv%3Aoff%2Ct%3Amanmade%7Ce%3Aall%7Cv%3Aoff%2Ct%3Alocal%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aarterial%7Ce%3Al%7Cv%3Aoff%2Ct%3Aboundary%7Ce%3Ag.f%7Cc%3A%23029fd4%2Ct%3Abuilding%7Ce%3Aall%7Cc%3A%231a5787%2Ct%3Alabel%7Ce%3Aall%7Cv%3Aoff&t = 1505487396397";
          },
          tileGrid: new TileGrid({
            resolutions: bmercResolutions,
            origin: [0, 0],
            extent: applyTransform(projParams.baiduExtent, projzh.ll2bmerc),
            tileSize: [512, 512],
          }),
        }),
      });

      this.colorLayer = new TileLayer({
        title: "彩色地图",
        source: new XYZ({
          url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
          projection: projzh.gcjMecatorProj,
          maxZoom: 18,
        }),
        visible: false,
      });

      this.warmLayer = new TileLayer({
        title: "暖色地图",
        source: new XYZ({
          url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
          projection: projzh.gcjMecatorProj,
        }),
        visible: false,
      });

      this.grayLayer = new TileLayer({
        title: "灰色地图",
        source: new XYZ({
          url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
          maxZoom: 16,
          projection: projzh.gcjMecatorProj,
        }),
        visible: false,
      });

      // 山影地图
      this.shadeLayer = new TileLayer({
        source: new XYZ({
          url: "https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}",
          // projection: projzh.gcjMecatorProj,
          maxZoom: 13,
        }),
        visible: false,
      });
      // this.vectorTopoLayer = new VectorTileLayer({
      //   source: new VectorTile({
      //     format: new MVT(),
      //     url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf",
      //     // projection: gcjMecator,
      //     maxZoom: 19,
      //   }),
      //   visible: false,
      // });

      this.map_baseOption.layers = [
        this.esriDarkLayer,
        this.osmLayer,
        this.amapRoadLayer,
        this.warmLayer,
        this.colorLayer,
        this.grayLayer,
        this.tdtSatelliteLayer,
        this.tdtSatelliteAnnoLayer,
        this.bdRoadLayer,
        this.shadeLayer,
        // this.vectorTopoLayer
      ];
      this.map = new Map(this.map_baseOption);

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