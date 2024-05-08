import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import "./Main.css";
import Goals from "../components/goals/Goals";
import { useAppSelector } from "../redux/hooks";
import { getGoals } from "../redux/selectors/goals-selectors";
import PointsChart from "../components/points-chart/PointsChart";
import { menu } from "ionicons/icons";
import { getPoints } from "../redux/selectors/points-selectors";
import createPointsText from "../utils/functions/create-chip-text";

const MainTab: React.FC = () => {
  const goals = useAppSelector(getGoals);
  const points = useAppSelector(getPoints);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton size="large" color="dark">
            <IonIcon icon={menu} />
          </IonButton>
          <IonButton size="large" color="dark" slot="end">
            <IonLabel>{createPointsText(points, "")}</IonLabel>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="content-container">
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
