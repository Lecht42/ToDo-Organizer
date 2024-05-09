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
import "./main.css";
import { useAppSelector } from "../../redux/hooks";
import { getGoals } from "../../redux/selectors/goals-selectors";
import PointsChart from "../../components/points-chart/PointsChart";
import { menu } from "ionicons/icons";
import { getPoints } from "../../redux/selectors/points-selectors";
import createPointsText from "../../utils/functions/create-chip-text";
import Goals from "../../components/goals/goals";

const MainTab: React.FC = () => {
  const goals = useAppSelector(getGoals);
  const points = useAppSelector(getPoints);

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

export default MainTab;
