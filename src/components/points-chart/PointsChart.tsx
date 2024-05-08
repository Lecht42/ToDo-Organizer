import "./PointsChart.css";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import backgroundUnderPlugin from "../../utils/chart-plugins/background-under-plugin";
import getIonicColor from "../../utils/functions/get-ionic-color";

ChartJS.register(ArcElement, backgroundUnderPlugin);

const PointsChart = () => {
  const mediumColor = getIonicColor("light");
  const primaryColor = getIonicColor("primary");

  const data = {
    labels: [],
    datasets: [
      {
        data: [12, 19],
        backgroundColor: [primaryColor, "#00000000"],
        borderWidth: [0, 0],
        borderRadius: [80, 0],
        cutout: "80%",
      },
    ],
  };

  const options = {
    plugins: {
      backgroundUnder: {
        backgroundColor: mediumColor,
      },
    },
  };

  return (
    <div className="chart-container">
      <Doughnut data={data} width="100%" height="100%" options={options} />
      <div className="points-counter">
        <h1>{"15/24"}</h1>
        <h2>{"Objectives"}</h2>
      </div>
    </div>
  );
};

export default PointsChart;
