<template>
  <div class="cycle-container">
    <el-radio-group v-model="activeCycle">
      <el-radio-button
        :label="cycle"
        v-for="cycle in cycles"
        :key="cycle"
      ></el-radio-button>
    </el-radio-group>
    <div ref="chart" style="width: 100%;height:700px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { createOptions } from "./chart-config";

export default {
  props: ["originData", "originUserData"],
  data() {
    return {
      activeCycle: undefined,
    };
  },
  computed: {
    cycleData() {
      if (!this.originData || !this.originUserData) return {};
      const data = {};
      this.originData.forEach((item) => {
        const { cycle } = item;
        if (!data[cycle] || !Array.isArray(data[cycle])) data[cycle] = [];
        data[cycle].push(item);
      });
      return data;
    },
    cycles() {
      return Object.keys(this.cycleData);
    },
  },
  methods: {
    formatDataPerCycle(dataPerCycle) {
      if (!Array.isArray(dataPerCycle)) return [];
      const data = {};
      dataPerCycle.forEach((item) => {
        const { qqid, damage } = item;
        const nickname = this.originUserData.find((user) => user.qqid === qqid)
          .nickname;
        if (!data[nickname]) data[nickname] = 0;
        data[nickname] += damage;
      });
      return Object.entries(data).map(([nickname, damage]) => ({
        value: damage,
        name: nickname,
      }));
    },
    renderChartWithData(data) {
      if (!data) return;
      const myChart = echarts.init(this.$refs.chart);
      const option = createOptions({
        title: {
          text: `${this.activeCycle}周目伤害分布`,
        },
        legend: {
          data: this.originUserData.map((item) => item.nickname),
        },
        series: [
          {
            data: this.formatDataPerCycle(data),
          },
        ],
      });
      myChart.setOption(option);
    },
  },
  watch: {
    activeCycle(value) {
      if (!value) return;
      this.renderChartWithData(this.cycleData[value]);
    },
  },
};
</script>

<style scoped>
.cycle-container {
  padding-top: 30px;
}
</style>
