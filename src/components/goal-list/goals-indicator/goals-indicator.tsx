import "./goals-indicator.css";
import { Doughnut } from "react-chartjs-2";
import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { useDispatch } from "react-redux";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { checkmarkCircleOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../redux/hooks";
import { completeDaily } from "../../../redux/reducers/points-slice";
import { selectTodayGoals } from "../../../redux/selectors/goals-selectors";
import { selectDailyPoints } from "../../../redux/selectors/points-selectors";
import backgroundUnderPlugin from "../../../utils/chart-plugins/background-under-plugin";
import createChipText from "../../../utils/functions/create-chip-text";
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from "../../../utils/functions/get-ionic-color";
import { selectDarkMode } from "../../../redux/selectors/settings-selectors";

ChartJS.register(ArcElement, backgroundUnderPlugin);

const GoalsIndicator = () => {
  const dispatch = useDispatch();
  const dailyTasks = useAppSelector(selectTodayGoals);
  const dailyPoints = useAppSelector(selectDailyPoints);
  const completedTodayTasks = dailyTasks.filter((task) => task.completed).length;
  const darkMode = useAppSelector(selectDarkMode);
  const { t } = useTranslation();

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completedTodayTasks, dailyTasks.length - completedTodayTasks],
        backgroundColor: [PRIMARY_COLOR, "transparent"],
        borderWidth: 0,
        borderRadius: [dailyTasks.length - completedTodayTasks ? 80 : 0, 0],
        cutout: "80%",
      },
    ],
  };

  const options = {
    plugins: {
      backgroundUnder: {
        underChartColor: SECONDARY_COLOR,
        backgroundColor: darkMode ? BACKGROUND_COLOR : "white",
      },
    },
  };

  const handleOnCompleteDaily = () => {
    dispatch(completeDaily());
  };

  return (
    <div className="chart-container">
      <Doughnut data={data} width="100%" height="100%" options={options as any} />
      <div className="points-counter">
        {dailyTasks.length - completedTodayTasks > 0 ? (
          <h1>{`${completedTodayTasks}/${dailyTasks.length}`}</h1>
        ) : dailyPoints > 0 && dailyTasks.length > 0 ? (
          <IonButton size="large" shape="round" onClick={handleOnCompleteDaily}>
            <IonLabel>{createChipText(5)}</IonLabel>
          </IonButton>
        ) : (
          <IonIcon size="large" icon={checkmarkCircleOutline} />
        )}
      </div>
    </div>
  );
};

export default GoalsIndicator;