import { useAppSelector } from "../../redux/hooks";
import { getTodayPointsRemaining } from "../../redux/selectors/points-selectors";
import "./PointsChart.css";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import backgroundUnderPlugin from "../../utils/chart-plugins/background-under-plugin";
import getIonicColor from "../../utils/functions/get-ionic-color";

ChartJS.register(ArcElement, backgroundUnderPlugin);

const PointsChart = () => {
  const remainPoints = useAppSelector(getTodayPointsRemaining);

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
        cutout: "85%",
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

  return <Doughnut data={data} options={options} />;
};

export default PointsChart;
