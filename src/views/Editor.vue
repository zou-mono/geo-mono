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
        <el-button icon="el-icon-canshushezhi" @click="changeCollapseState">
          数据
        </el-button>
      </el-aside>
      <el-main>
        <el-drawer
          :style="{left: sidebar_width + 'px'}" 
          v-drag-drawer
          title="我嵌套了表格!"
          :visible.sync="CollapseState"
          direction="ltr"
          :modal="false"
          :size="draw_width"
          :wrapperClosable="false"
          :modal-append-to-body="false"
          :append-to-body="true"
        >
          <el-table :data="gridData">
            <el-table-column
              property="date"
              label="日期"
              width="150"
            ></el-table-column>
            <el-table-column
              property="name"
              label="姓名"
              width="200"
            ></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
          </el-table>
        </el-drawer>
        <Preview
          :inEditor="true"
          class="main-container"
          ref="preview"
          :style="{
            width: mainContainerSize + 'px'
          }"
        ></Preview>
      </el-main>
      <!-- <el-main>
          <el-button
            class="btn-add-data"
            icon="el-icon-circle-plus-outline"
            type="text"
            >{{ $t("editor.addData") }}
          </el-button>
          <el-collapse>
            <el-collapse-item name="1">
              <template slot="title">
                <blockquote>起点</blockquote>
              </template>
              <el-form
                class="parameter"
                ref="form"
                :model="form"
                label-width="80px"
              >
                <el-form-item label="活动名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.date1"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker
                      placeholder="选择时间"
                      v-model="form.date2"
                      style="width: 100%"
                    ></el-time-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                  <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质">
                  <el-checkbox-group v-model="form.type">
                    <el-checkbox
                      label="美食/餐厅线上活动"
                      name="type"
                    ></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">
                    立即创建
                  </el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse> -->
      <!-- </el-main> -->
    </el-container>
    <!-- </el-tab-pane> -->
    <!-- <el-tab-pane label="代码" name="code-editor"> -->
    <!-- <el-container>
            <el-header id="full-code-control-panel"> 北部 </el-header>
          </el-container> -->
    <!-- </el-tab-pane> -->
    <!-- </el-tabs> -->
    <!-- </div> -->
    <!-- <div
      class="handler"
      id="h-handler"
      @mousedown="onSplitterDragStart"
      :style="{ left: leftContainerSize + '%' }"
      v-if="!shared.isMobile"
    ></div> -->
  </div>
</template>

<script>
// import {store} from '../common/store'
import dragDrawer from "@/directives/drag-drawer"; // use clipboard by v-directive
import Preview from "@c/Preview.vue";
import dragDrawer from "@/directives/drag-drawer"; 

export default {
  name: "editor",
  components: {
    Preview,
  },
  directives: {
    dragDrawer,
  },
  computed: {
    // CollapseState: function() {
    //   console.log(!this.isCollapse)
    //   return !this.isCollapse
    // }
  },
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
      sidebar_width: 60, // 侧边菜单栏的宽度
      draw_width: 600, // 左边抽屉组件的宽度
      table: false,
      CollapseState: false,

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

      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],

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
  mounted() {
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
    changeCollapseState() {
      this.CollapseState = !this.CollapseState;
      // this.$emit("update:table", this.CollapseState)

      if (this.CollapseState === true) {
        let wrapper = this.$el.querySelector('.el-drawer__wrapper')
        let dragDom = this.$el.querySelector('.el-drawer')
        wrapper.style.width = dragDom.style.width
        // console.log(wrapper.style.width)
      }
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
      width: 50px;
      height: 50px;
      padding: 0px;
      line-height: 20px;
      text-align: center;
      margin: 5px;
    }

    .el-button > span {
      display: block;
      margin-left: 0px;
    }

    // .el-button:hover{
    //   background-color: $clr-deep;
    // }
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

    .btn-add-data {
      // display: flex;
      // display: block;
      margin: 10px 0px;
      width: 100%;
    }

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

</style>
