 <template>
  <div>
    <el-button @click="drawer = true" type="primary" style="margin-right: 16px">
      点我打开
    </el-button>
    <el-drawer
      v-dragDrawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :append-to-body="true"
    >
      <!-- <span>我来啦!</span> -->
    </el-drawer>
  </div>
</template>  

<script>
import dragDrawer from "@/directives/drag-drawer"; // use clipboard by v-directive

export default {
  name: "test",
  data() {
    return {
      drawer: false,
      direction: "ltr",
    };
  },
  directives: {
    dragDrawer,
  },
  //   directives: {
  //     /** 向左拉伸 */
  //     resizeLeft: {
  //       //
  //       inserted: (el) => {
  //         let docW = document.body.clientWidth - 300,
  //           l = 0,
  //           parent = el.parentNode;
  //         let findParent = (el) => {
  //           let p = el.parentNode;
  //           if (p) {
  //             if (p.className.match("el-drawer__wrapper") !== null) {
  //               parent = p;
  //             } else {
  //               findParent(p);
  //             }
  //           }
  //         };
  //         findParent(el);
  //         docW = parent.clientWidth;

  //         let setpos = (e) => {
  //           if (e.clientX > 0) {
  //             let dw = Math.max(100, docW + (l - e.clientX));
  //             parent.style.width = dw + "px";
  //           }
  //         };
  //         el.ondragstart = function (e) {
  //           l = e.clientX;
  //         };
  //         el.ondrag = setpos;
  //         el.ondragend = function () {
  //           docW = parent.clientWidth;
  //         };
  //       },
  //     },
  //     /** 向上拉伸 */
  //     resizeTop: {
  //       //
  //       inserted: (el) => {
  //         let docW = document.body.clientWidth - 300,
  //           l = 0,
  //           parent = el.parentNode;
  //         let findParent = (el) => {
  //           let p = el.parentNode;
  //           if (p) {
  //             if (p.className.match("el-drawer ") !== null) {
  //               parent = p;
  //             } else {
  //               findParent(p);
  //             }
  //           }
  //         };
  //         findParent(el);
  //         docW = parent.clientHeight;

  //         let setpos = (e) => {
  //           if (e.clientY > 0) {
  //             let dw = Math.max(100, docW + (l - e.clientY));

  //             parent.style.height = dw + "px";
  //           }
  //         };
  //         el.ondragstart = function (e) {
  //           l = e.clientY;
  //         };
  //         el.ondrag = setpos;
  //         el.ondragend = function (e) {
  //           docW = parent.clientHeight;
  //         };
  //       },
  //     },
  //   },
};
</script>


<style lang="scss">

</style>
