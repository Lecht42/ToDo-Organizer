import React from "react";
import {
  IonMenu,
  IonLabel,
  IonButton,
  IonIcon,
  IonContent,
} from "@ionic/react";
import { useAppSelector } from "../../redux/hooks";
import { getGoals } from "../../redux/selectors/goals-selectors";
import { add } from "ionicons/icons";
import MenuGoals from "./goals/goals";

const Menu: React.FC = () => {
  const goals = useAppSelector(getGoals);

  return (
    <IonMenu contentId="main-content">
      <IonContent>
        <IonButton className="ion-margin">
          <IonIcon icon={add} />
          <IonLabel>Add new task group</IonLabel>
        </IonButton>
        {goals
          .filter((e) => e.id !== undefined)
          .map((e) => (
            <MenuGoals {...e} id={e.id as number} key={e.id as number} />
          ))}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
