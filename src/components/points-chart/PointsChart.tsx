import "./PointsChart.css";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import backgroundUnderPlugin from "../../utils/chart-plugins/background-under-plugin";
import getIonicColor, {
  LIGHT_COLOR,
  PRIMARY_COLOR,
} from "../../utils/functions/get-ionic-color";
import { useAppSelector } from "../../redux/hooks";
import { getTodayGoals } from "../../redux/selectors/goals-selectors";

ChartJS.register(ArcElement, backgroundUnderPlugin);

const PointsChart = () => {
  const todayTasks = useAppSelector(getTodayGoals);
  const completedTodayTasks = todayTasks.filter((e) => e.completed).length || 0;

  const data = {
    labels: [],
    datasets: [
      {
        data: [completedTodayTasks, todayTasks.length - completedTodayTasks],
        backgroundColor: [PRIMARY_COLOR, "#00000000"],
        borderWidth: [0, 0],
        borderRadius: [80, 0],
        cutout: "80%",
      },
    ],
  };

  const options = {
    plugins: {
      backgroundUnder: {
        backgroundColor: !(todayTasks.length - completedTodayTasks)
          ? PRIMARY_COLOR
          : LIGHT_COLOR,
      },
    },
  };

  return (
    <div className="chart-container">
      <Doughnut data={data} width="100%" height="100%" options={options} />
      <div className="points-counter">
        <h1>{`${completedTodayTasks}/${todayTasks.length}`}</h1>
        <h2>{"Objectives"}</h2>
      </div>
    </div>
  );
};

export default PointsChart;
