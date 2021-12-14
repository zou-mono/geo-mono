<template>
  <div id="container">
    <!-- <div
      id="editor-left-container"
      :style="{ width: leftContainerSize + '%' }"
      v-if="!shared.isMobile"> -->
    <!-- <el-tabs v-model="currentTab" type="card" @tab-click="handleClick"> -->
    <!-- <el-tab-pane label="界面" name="ui-editor"> :append-to-body=true :visible="CollapseState" -->

    <!-- :style="{left: sidebar_width + 'px'}" -->
    <!-- :style="{ transform: 'translate3d(' + sidebar_width + 'px,0,0)' }"   -->
    <el-container>
      <el-aside :style="{ width: sidebar_width + 'px' }">
        <el-button
          :class="index === 1 ? 'is-active' : ''"
          icon="el-icon-canshushezhi"
          @click="changeCollapseState(1)"
        >
          设置
        </el-button>
        <el-button
          :class="index === 2 ? 'is-active' : ''"
          icon="el-icon-ditu"
          @click="changeCollapseState(2)"
        >
          地图
        </el-button>
        <el-button
          :class="index === 3 ? 'is-active' : ''"
          icon="el-icon-jiaoben"
          @click="changeCollapseState(3)"
        >
          代码
        </el-button>
        <el-button
          :class="index === 4 ? 'is-active' : ''"
          icon="el-icon-baocun"
          @click="changeCollapseState(4)"
        >
          保存
        </el-button>
      </el-aside>
      <el-main>
        <el-drawer
          :style="{ left: sidebar_width + 'px' }"
          v-drag-drawer
          title=""
          :visible.sync="CollapseState"
          direction="ltr"
          :modal="false"
          :size="draw_width"
          :wrapperClosable="false"
          :modal-append-to-body="false"
          :append-to-body="true"
        >
          <keep-alive>
            <component :is="show_comp" v-show="CollapseState"></component>
          </keep-alive>
          <!-- <panel-od v-if="show_canshushezhi">
          </panel-od>
          <panel-ditu v-else-if="show_ditu">
          </panel-ditu> -->
        </el-drawer>
        <Preview
          :inEditor="true"
          class="main-container"
          ref="preview"
          :style="{
            width: mainContainerSize + 'px',
          }"
        ></Preview>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import {store} from '../common/store'
import dragDrawer from "@/directives/drag-drawer"; // use clipboard by v-directive
import Preview from "@c/Preview.vue";
import panelOd from "@c/PanelOD.vue";
import panelDitu from "@c/PanelMap.vue";

export default {
  name: "editor",
  components: {
    Preview,
    panelOd,
    panelDitu,
  },
  directives: {
    dragDrawer,
  },
  computed: {},
  watch: {
    // CollapseState:  function() {
    //   if (this.CollapseState === true)
    //     setTimeout(() => {
    //         this.mainContainerSize =
    //           window.innerWidth - this.draw_width - this.sidebar_width;
    //     }, 300)
    //   else
    //     this.mainContainerSize = window.innerWidth - this.sidebar_width;
    // }
    // CollapseState:  function () {
    //     console.log(window.innerWidth - this.draw_width)
    //     if (this.CollapseState === true)
    //       this.mainContainerSize =
    //         window.innerWidth - this.draw_width - this.sidebar_width;
    //     else
    //       this.mainContainerSize = window.innerWidth - this.sidebar_width;
    // }
  },
  // beforeMount(){

  // },
  data() {
    return {
      sidebar_width: 70, // 侧边菜单栏的宽度
      draw_width: 600, // 左边抽屉组件的宽度
      table: false,
      index: 0, // 点击的按钮顺序
      CollapseState: false, //抽屉组件是否展开
      show_comp: "", // 展开的组件名称
      // show_canshushezhi: false, // 参数组件是否展开
      // show_ditu: false, // 地图组件是否展开
      m_last_click_button: "", // 上一次点击的按钮名称

      mousedown: false,
      mainContainerSize: window.innerWidth, // 整个el-main的宽度
      mobileMode: false,
      shared: this.$store.state,
      initialCode: "",

      currentTab: "ui-editor",

      fullCode: "",

      fullCodeConfig: {
        mimimal: false,
        esm: true,
        node: false, // If is in node
      },
    };
  },
  updated() {},
  mounted() {
    let wrapper = this.$el.querySelector(".el-drawer__wrapper");
    let dragDom = this.$el.querySelector(".el-drawer");
    if (dragDom != null && wrapper != null)
      wrapper.style.width = dragDom.style.width;
    // loadExampleCode().then(code => {
    //     // Only set the code in editor. editor will sync to the store.
    //     this.initialCode = parseSourceCode(code);
    // });
    window.addEventListener("mousemove", (e) => {
      if (this.mousedown) {
        let percentage = e.clientX / window.innerWidth;
        percentage = Math.min(0.9, Math.max(0.1, percentage));
        this.leftContainerSize = percentage * 100;
      }
    });

    window.addEventListener("mouseup", (e) => {
      this.mousedown = false;
    });
  },
  methods: {
    changeCollapseState(value) {
      if (this.index === value) {
        this.index = 0;
        this.CollapseState = !this.CollapseState;
      } else {
        this.index = value;
        this.CollapseState = true;
      }
      if (value === 1) {
        this.show_comp = "panelOd";
      }
      if (value === 2) {
        this.show_comp = "panelDitu";
      }
      if (value === 3) this.show_comp = "panelDitu";
      if (value === 4) this.show_comp = "panelDitu";
    },

    onSplitterDragStart() {
      this.mousedown = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss">
@import "../style/color.scss";

$code-info-height: 25px;
$control-panel-height: 30px;
$pd-basic: 10px;
$handler-width: 0px;

// .demo-drawer {
//   overflow: visible;
// }

// #main-container {
//   .handler {
//     position: absolute;
//     left: 50%;

//     top: 0;
//     bottom: 0;
//     width: $handler-width;

//     cursor: col-resize;
//     z-index: 100;
//     background-color: transparent;
//     border-left: 1px solid #ececec;
//     // border-right: 1px solid $clr-border;
//   }
// }

#ui-control-panel {
  .parameter {
    padding: 15px;
  }
}

// #editor-left-container {
//   position: absolute;
//   left: 0;
//   bottom: 0;
//   top: 0;

// width: 50%;

// .el-tab-pane {
//   height: 100%;

.el-container {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;

  .el-aside {
    background: $clr-bg;
    padding-top: 68px;
    margin: 0px;
    height: 100%;
    // color: #333;

    .el-button {
      width: 55px;
      height: 55px;
      padding: 0px;
      line-height: 20px;
      text-align: center;
      margin: 12px 0px 0px 0px;
      font-size: 14px;
    }

    .el-button > span {
      display: block;
      margin-left: 0px;
    }

    .el-button.is-active {
      border-color: #c6e2ff;
      background-color: #ecf5ff
    }
  }
  // }

  .el-header {
    height: $control-panel-height !important;
    position: relative;
    z-index: 10;
    padding: 0;
  }

  .el-main {
    padding: 0;
    position: relative;

    // .btn-add-data {
    //   // display: flex;
    //   // display: block;
    //   // margin: 10px 0px;
    //   width: 100%;
    // }

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
  // }

  blockquote {
    // margin-bottom: 10px;
    margin: 0px;
    padding: 5px 5px;
    height: 30px;
    line-height: 25px;
    border-left: 5px solid $clr-deep;
    border-radius: 0 2px 2px 0;
    font-size: 14px;
    font-weight: bold;
  }

  .el-collapse-item__header {
    height: 30px;
    border: none;
    // background-color: #f2f2f2;
    background-color: $clr-bg;
  }

  .el-tabs {
    // box-shadow: none;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 20px;
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

.main-container {
  position: absolute;
  right: 0;

  width: 50%;
  height: 100%;
  padding: 0;
  // padding-left: $handler-width;
  border: none;
  background: $clr-bg;
}

.el-icon-canshushezhi,
.el-icon-ditu,
.el-icon-jiaoben,
.el-icon-baocun {
  font-size: 24px;
}
</style>
