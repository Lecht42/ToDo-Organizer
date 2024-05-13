import {
  IonContent,
  IonLabel,
  IonPage,
} from "@ionic/react";
import { useAppSelector } from "../../redux/hooks";
import { selectTodayGoals } from "../../redux/selectors/goals-selectors";
import { IGoalList } from "../../utils/interfaces/goals";
import Menu from "../../components/menu/menu";
import Header from "../../components/header/header";

export const SETTINGS_HREF = "/settings";

const SettingsTab: React.FC = () => {
  const todayGoals: IGoalList = {
    id: 0,
    label: "Today",
    points: 10,
    items: useAppSelector(selectTodayGoals),
  };

console.log("settings")

  return (
    <>
      <IonPage id="main-content">
        <Header />
        <IonContent>
          <IonLabel>Test</IonLabel> 
        </IonContent>
      </IonPage>
      <Menu />
    </>
  );
};

export default SettingsTab;
