<template>
  <div>
    <el-page-header @back="location = '..'" content="统计"></el-page-header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleTitleSelect"
    >
      <el-menu-item index="1">面板</el-menu-item>
      <el-menu-item index="2">预约</el-menu-item>
      <el-menu-item index="3">查刀</el-menu-item>
      <el-menu-item index="4">统计</el-menu-item>
      <el-menu-item index="5">我的</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "4",
    };
  },
  methods: {
    handleTitleSelect(key) {
      switch (key) {
        case "1":
          window.location = "../";
          break;
        case "2":
          window.location = "../subscribers/";
          break;
        case "3":
          window.location = "../progress/";
          break;
        case "4":
          window.location = "../statistics/";
          break;
        case "5":
          window.location = `../my/`;
          break;
        default:
          break;
      }
    },
  },
};
</script>
