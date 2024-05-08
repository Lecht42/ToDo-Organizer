import { Chart, ChartArea, Plugin } from 'chart.js';

const backgroundUnderPlugin: Plugin<'doughnut'> = {
  id: "backgroundUnder",
  beforeDraw(chart: Chart<'doughnut'>) {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea as ChartArea;
    const { left, top, width, height } = chartArea;

    const dataset = chart.data.datasets[0];
    const radius = Math.min(width, height) / 2;
    const cutoutPercentage = dataset.cutout ? parseInt(dataset.cutout.toString().replace("%", ""), 10) : 0;
    const cutout = radius * (cutoutPercentage / 100);

    ctx.save();
    ctx.clearRect(left, top, width, height);

    ctx.fillStyle = chart.options.plugins?.backgroundUnder?.backgroundColor || "rgba(200, 200, 200, 0.5)"; 
    ctx.beginPath();
    ctx.arc(left + width / 2, top + height / 2, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(left + width / 2, top + height / 2, cutout, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  },
};

export default backgroundUnderPlugin;
