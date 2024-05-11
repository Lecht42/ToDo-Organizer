import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { useAppSelector } from "../../redux/hooks";
import { getGoals, getTodayGoals } from "../../redux/selectors/goals-selectors";
import PointsChart from "../../components/points-chart/PointsChart";
import { menu } from "ionicons/icons";
import { getPoints } from "../../redux/selectors/points-selectors";
import createPointsText from "../../utils/functions/create-chip-text";
import Goals from "../../components/goals/goals";
import { IGoalList } from "../../utils/interfaces/goals";

const HomeTab: React.FC = () => {
  const todayGoals: IGoalList = {
    id: 0,
    label: "Today",
    points: 10,
    items: useAppSelector(getTodayGoals),
  };
  const goals = useAppSelector(getGoals);
  const points = useAppSelector(getPoints);

  console.log(todayGoals);

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" color="dark">
            <IonIcon icon={menu} />
          </IonMenuButton>
          <IonButton slot="end" color="dark">
            <IonLabel>{createPointsText(points, "")}</IonLabel>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <PointsChart />
          {todayGoals.items.length ? (
            <Goals {...todayGoals} color="primary" id={todayGoals.id as number} />
          ) : (
            <></>
          )}
          {goals
            .filter((g) => g.id !== undefined)
            .map((e) => (
              <Goals {...e} id={e.id as number} key={e.id as number} />
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
