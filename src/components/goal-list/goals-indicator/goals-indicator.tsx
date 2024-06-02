import "./goals-indicator.css";
import { Doughnut } from "react-chartjs-2";
import { IonButton, IonIcon, IonLabel, IonTitle } from "@ionic/react";
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
import { PRIMARY_COLOR, SECONDARY_COLOR, getBackgroundColor } from "../../../utils/functions/get-ionic-color";
import { selectDarkMode } from "../../../redux/selectors/settings-selectors";
import { useEffect, useState } from "react";
import Color from "color";

ChartJS.register(ArcElement, backgroundUnderPlugin);

const GoalsIndicator = () => {
  const dispatch = useDispatch();
  const dailyTasks = useAppSelector(selectTodayGoals);
  const dailyPoints = useAppSelector(selectDailyPoints);
  const completedTodayTasks = dailyTasks.filter((task) => task.completed).length;
  const [options, setOptions] = useState({});
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

  useEffect(() => {
    setOptions({
      plugins: {
        backgroundUnder: {
          underChartColor: SECONDARY_COLOR,
          backgroundColor: getBackgroundColor(),
        },
      },
    });
  }, [darkMode]);

  const handleOnCompleteDaily = () => {
    dispatch(completeDaily());
  };

  const counterColor = Color(PRIMARY_COLOR).object();

  return (
    <div className="chart-container">
      <Doughnut data={data} width="100%" height="100%" options={options as any} />
      <div className="ion-text-center goals-counter">
        {dailyTasks.length - completedTodayTasks > 0 ? (
          <IonTitle
            style={{ color: counterColor }}
          >{`${completedTodayTasks}/${dailyTasks.length}`}</IonTitle>
        ) : dailyPoints > 0 && dailyTasks.length > 0 ? (
          <IonButton
            className="element-in"
            color="success"
            size="large"
            shape="round"
            onClick={handleOnCompleteDaily}
          >
            <IonLabel>{createChipText(dailyPoints)}</IonLabel>
          </IonButton>
        ) : (
          <>
            <IonIcon color="success" className="element-in" size="large" icon={checkmarkCircleOutline} />
            <IonLabel color="success">{t("no_more_daily_tasks")}</IonLabel>
          </>
        )}
      </div>
    </div>
  );
};

export default GoalsIndicator;
