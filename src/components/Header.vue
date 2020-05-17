<template>
  <div>
    <el-page-header @back="goBack" content="公会战数据分析"></el-page-header>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      window.history.go(-1);
    }
  }
};
</script>