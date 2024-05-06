import {
  IonContent,
  IonPage,
} from "@ionic/react";
import "./Main.css";
import Goals from "../components/goals/Goals";
import { useAppSelector } from "../redux/hooks";

const MainTab: React.FC = () => {
  const goals = useAppSelector((state) => state.goals).goalLists;

  return (
    <IonPage>
      <IonContent color={"light"} fullscreen>
        {goals.map((e) => (
          <Goals {...e} key={e.id} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default MainTab;
