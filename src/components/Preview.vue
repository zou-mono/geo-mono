<template>
<div :class="[(inEditor) ? '' : 'full']">
    <div id="editor-right-container" v-if="!shared.isMobile">
      <!-- <img src="../assets/logo.png" style="width:100%;min-height:100%"/> -->
      <map-view></map-view>
        <!-- <div class="chart-container"></div> -->
      <!-- <el-tabs v-model="currentTab" type="card" @tab-click="handleClick">
        <el-tab-pane label="界面" name="ui-editor">
          <el-container>
            <el-header id="ui-control-panel">
              东部
            </el-header>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="代码" name="code-editor">
          <el-container>
            <el-header id="full-code-control-panel"> 北部 </el-header>
          </el-container>
        </el-tab-pane>
      </el-tabs> -->
    </div>
</div>
</template>

<script>
import mapView from '@c/mapView'

export default {
    props: ['inEditor'],

    components: {mapView},

    data() {
        return {
            shared: this.$store.state,
            debouncedTime: undefined,
            backgroundColor: '',
            autoRun: true,
            loading: false,
        }
    }
}
</script>

<style lang="scss">
#editor-right-container {
    position: absolute;
    // top: $control-panel-height;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
    border-radius: 5px;
    background: #fff;
    overflow: visible;

    padding: 10px;

    transition: width 2s;

    // .chart-container {
    //     position: relative;
    //     height: 100%;
    // }
}

.full {
    #chart-panel {
        top: 40px;
        right: 5px;
        bottom: 5px;
        left: 5px;
        box-shadow: rgba(10, 9, 9, 0.1) 0px 0px 5px;
    }
}
</style>