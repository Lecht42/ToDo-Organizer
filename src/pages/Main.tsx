import { IonContent, IonPage } from "@ionic/react";
import "./Main.css";
import Goals from "../components/goals/Goals";
import { useAppSelector } from "../redux/hooks";
import { getGoals } from "../redux/selectors/goals-selectors";
import PointsChart from "../components/points-chart/PointsChart";

const MainTab: React.FC = () => {
  const goals = useAppSelector(getGoals);

  return (
    <IonPage>
      <IonContent>
        <div className="container">
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
