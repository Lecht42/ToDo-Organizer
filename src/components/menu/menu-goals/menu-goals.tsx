import React from "react";
import { IonList, IonListHeader, IonLabel, IonButton, IonIcon } from "@ionic/react";
import MenuGoal from "./menu-goal/menu-goal";
import { add } from "ionicons/icons";
import { GoalsProps } from "../../goals/goals";
import CreateTaskModal from "../modals/create-task/create-task";

const MenuGoals: React.FC<GoalsProps> = ({ id, label, items }) => {
  return (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>
            <h1>{label}</h1>
          </IonLabel>
          <IonButton id={String(id)} expand="block" size="large">
            <IonIcon icon={add} />
          </IonButton>
        </IonListHeader>
        {items.map((e) => (
          <MenuGoal {...e} listId={id} key={e.id} />
        ))}
      </IonList>
      <CreateTaskModal listId={id} />
    </>
  );
};

export default MenuGoals;
