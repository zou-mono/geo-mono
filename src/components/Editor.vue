<template>
  <div id="main-container">
    <div id="editor-left-container" :style="{ width: leftContainerSize + '%' }" v-if="!shared.isMobile">
      <el-tabs v-model="currentTab" type="card" @tab-click="handleClick">
        <el-tab-pane label="界面" name="ui-editor">
          <el-container>
            <el-header id="ui-control-panel">
              东部
              <!-- <div id="code-info">
                            <template v-if="shared.editorStatus.message">
                                <span class="code-info-time">{{currentTime}}</span>
                                <span :class="'code-info-type-' + shared.editorStatus.type">{{shared.editorStatus.message}}</span>
                            </template>
                        </div>
                        <div class="editor-controls">
                            <a href="javascript:;" class='btn btn-default btn-sm' @click='disposeAndRun'>{{$t('editor.run')}}</a>
                        </div> -->
            </el-header>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="代码" name="code-editor">
          <el-container>
            <el-header id="full-code-control-panel"> 北部 </el-header>
          </el-container>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="handler" id="h-handler" @mousedown="onSplitterDragStart" :style="{left: leftContainerSize + '%'}" v-if="!shared.isMobile"></div>
    <Preview :inEditor="true" class="right-container" ref="preview" :style="{
        width: (100 - leftContainerSize) + '%',
        left: leftContainerSize + '%'
    }"></Preview>
  </div>
</template>

<script>
// import {store} from '../common/store'
import Preview from './Preview.vue';

export default {
  name: "editor",
  components: {
      Preview
  },
  data() {
    return {
      mousedown: false,
      leftContainerSize: 40,
      mobileMode: false,
      shared: this.$store.state,
      initialCode: "",

      currentTab: "ui-editor",

      fullCode: "",

      fullCodeConfig: {
        mimimal: false,
        esm: true,
        node: false, // If is in node
      }
    }
  },
  mounted() {
    // loadExampleCode().then(code => {
    //     // Only set the code in editor. editor will sync to the store.
    //     this.initialCode = parseSourceCode(code);
    // });

    window.addEventListener('mousemove', (e) => {
        if (this.mousedown) {
            let percentage = e.clientX / window.innerWidth;
            percentage = Math.min(0.9, Math.max(0.1, percentage));
            this.leftContainerSize = percentage * 100;
        }
    });

    window.addEventListener('mouseup', (e) => {
        this.mousedown = false;
    });
  },
  methods: {
    onSplitterDragStart() {
        this.mousedown = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="scss">
@import "../style/color.scss";

$code-info-height: 25px;
$control-panel-height: 30px;
$pd-basic: 10px;
$handler-width: 5px;

#main-container {
    .handler {
        position: absolute;
        left: 50%;

        top: 0;
        bottom: 0;
        width: $handler-width;

        cursor: col-resize;
        z-index: 100;
        background-color: transparent;
        border-left: 1px solid #ececec;
        // border-right: 1px solid $clr-border;
    }

}

#editor-left-container {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;

  width: 50%;

  .el-tab-pane {
    height: 100%;

    .el-container {
      width: 100%;
      height: 100%;
    }

    .el-header {
      height: $control-panel-height !important;
      position: relative;
      z-index: 10;
      padding: 0;
    }
    .el-main {
      padding: 0;
      position: relative;

      ::-webkit-scrollbar {
        height: 8px;
        width: 8px;
        transition: all 0.3s ease-in-out;
        border-radius: 2px;
      }

      ::-webkit-scrollbar-button {
        display: none;
      }

      ::-webkit-scrollbar-thumb {
        width: 8px;
        min-height: 15px;
        background: rgba(50, 50, 50, 0.6) !important;
        transition: all 0.3s ease-in-out;
        border-radius: 2px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.5) !important;
      }
    }
  }

  .el-tabs {
    box-shadow: none;
  }

  .el-tabs--border-card > .el-tabs__header {
    border-bottom: none;
  }

  .el-tabs__content {
    position: absolute;
    top: 34px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0;
  }

  .el-tabs__item {
    height: 34px;
    line-height: 34px;
  }
}

.right-container {
    position: absolute;
    right: 0;

    width: 50%;
    height: 100%;
    padding: 0;
    padding-left: $handler-width;
    border: none;
    z-index: 30;

    background: $clr-bg;
}
</style>
