<template>
  <div id="app">
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
      originData: [],
      originUserData: [],
    };
  },
  mounted() {
    axios
      .all([
        axios.get("./api/"),
        axios.post("../api/", {
          action: "get_member_list",
          csrf_token: window.csrf_token,
        }),
      ])
      .then(
        axios.spread((resData, resUser) => {
          if (resData.data.code != 0) {
            this.$alert(resData.data.message, "获取记录失败");
            return;
          }
          if (resUser.data.code != 0) {
            this.$alert(resUser.data.message, "获取成员失败");
            return;
          }
          this.originData = resData.data.challenges;
          this.originUserData = resUser.data.members;
        })
      );
  },
  methods: {
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
