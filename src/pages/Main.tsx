import { IonContent, IonPage } from "@ionic/react";
import "./Main.css";
import Goals from "../components/goals/Goals";
import { useAppSelector } from "../redux/hooks";

const MainTab: React.FC = () => {
  const goals = useAppSelector((state) => state.goals).goalLists;

  return (
    <IonPage>
      {goals.filter(g => g.id !== undefined).map((e) => (
        <Goals {...e} id={e.id as number} key={e.id as number} />
      ))}
    </IonPage>
  );
};

export default MainTab;
