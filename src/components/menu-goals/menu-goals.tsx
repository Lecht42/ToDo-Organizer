import React from "react";
import {
  IonMenu,
  IonList,
  IonReorderGroup,
  IonListHeader,
  IonLabel,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { GoalsProps } from "../../components/goals/goals";
import MenuGoal from "./menu-goal/menu-goal";
import { add } from "ionicons/icons";

const MenuGoals: React.FC<GoalsProps> = ({ label, items }) => {
  return (
    <IonList>
      <IonListHeader>
        <IonLabel>{label}</IonLabel>
        <IonButton size="large">
          <IonIcon icon={add} />
        </IonButton>
      </IonListHeader>
      {items.map((e) => (
        <MenuGoal {...e} key={e.id} />
      ))}
    </IonList>
  );
};

export default MenuGoals;
