<template>
  <div id="PanelMap">
      <div class="item item-amap">
        <img src=/img/data/thumb/area-basic.png height=100% @click="amap_Clicked">
      </div>
      <div class="item item-baidu">
        <img src=/img/data/thumb/area-basic.png height=100%>
      </div>
      <div class="item item-esri">
        <img src=/img/data/thumb/area-basic.png height=100%>
      </div>
      <div class="item item-osm">
        <img src=/img/data/thumb/area-basic.png height=100%>
      </div>
  </div>
</template>

<script>
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
  components: {},
  watch: {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    amap_Clicked() {
      console.log("amap clicked!")
    }
  },
};
</script>

<style lang="scss">
@import "../style/color.scss";

#PanelMap {
  display: grid;
  grid-template-columns: 170px 170px 170px;
  grid-template-rows: 170px 170px 170px;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  margin: auto;
  align-content: center;
  justify-content: center;
  
  .item {
    overflow: hidden;
    cursor: pointer;
  }
}
</style>
 

