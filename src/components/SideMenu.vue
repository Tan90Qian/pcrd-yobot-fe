<template>
  <el-menu :default-active="defaultActive" @select="handleSelect">
    <el-menu-item index="total">伤害统计</el-menu-item>
    <el-menu-item index="cycle">按周目</el-menu-item>
    <el-menu-item index="boss">按BOSS</el-menu-item>
    <el-menu-item index="player">按玩家</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: ['defaultActive'],
  methods: {
    handleSelect(key) {
      this.$emit("change", key);
    },
  },
};
</script>
