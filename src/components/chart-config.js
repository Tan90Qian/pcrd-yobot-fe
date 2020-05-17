import merge from "lodash.merge"

export function createOptions(options = {}) {
  const defaultOptions = {
    title: {
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      left: "center",
      top: "bottom",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: {
          show: true,
          type: ["pie", "funnel"],
        },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "伤害",
        type: "pie",
        radius: [60, 200],
        center: ["50%", "50%"],
        roseType: "area",
        emphasis: {
          label: {
            show: true,
          },
        },
      },
    ],
  }
  return merge({}, defaultOptions, options)
}