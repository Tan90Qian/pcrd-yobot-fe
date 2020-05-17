<template>
  <div id="app">
    <el-input v-model="apiurl" placeholder="请输入api地址"></el-input>
    <el-button type="primary" @click="reload">开始分析</el-button>
    <Header />
    <section class="container">
      <aside class="side-menu">
        <SideMenu :defaultActive="activeMenu" @change="handleChangeActiveTab" />
      </aside>
      <article class="content">
        <Statistics
          v-if="activeMenu === 'total'"
          :originData="originData"
          :originUserData="originUserData"
        />
        <ByCycle
          v-else-if="activeMenu === 'cycle'"
          :originData="originData"
          :originUserData="originUserData"
        />
        <template v-else>
          <h2>建设中</h2>
        </template>
      </article>
    </section>
  </div>
</template>

<script>
import axios from "axios";

import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Statistics from "./components/Statistics";
import ByCycle from "./components/ByCycle";

export default {
  name: "App",
  components: {
    Header,
    SideMenu,
    Statistics,
    ByCycle,
  },
  data() {
    return {
      activeMenu: "total",
      apiurl: null,
      originData: [],
      originUserData: [],
    };
  },
  mounted() {
    var anchor = window.location.hash;
    if(!anchor){
      return;
    }
    this.apiurl = decodeURIComponent(anchor.substr(1));
    this.reload();
  },
  methods: {
    reload(){
    axios.get(this.apiurl)
      .then(
        resData => {
          if (resData.data.code != 0) {
            this.$alert(resData.data.message, "获取记录失败");
            return;
          }
          this.originData = resData.data.challenges;
          this.originUserData = resData.data.members;
        }
      );
    },
    handleChangeActiveTab(key) {
      this.activeMenu = key;
    },
  },
};
</script>

<style>
.container {
  display: flex;
}
.side-menu {
  width: 200px;
}
.content {
  padding-left: 20px;
  flex: 1;
}
</style>
