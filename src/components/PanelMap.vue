<template>
  <section class="PanelMap">
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
        <el-form class="parameter" ref="form" :model="form" label-width="80px">
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
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
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
            <el-button type="primary" @click="onSubmit"> 立即创建 </el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </section>
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
  },
};
</script>

<style scoped lang="scss">
@import "../style/color.scss";

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

.btn-add-data {
  // display: flex;
  // display: block;
  // margin: 10px 0px;
  width: 100%;
}
</style>
 

