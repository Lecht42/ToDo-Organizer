import React, { useState } from "react";
import { IonList, IonListHeader, IonLabel, IonButton, IonIcon, IonModal } from "@ionic/react";
import MenuGoal from "./menu-goal/menu-goal";
import { add } from "ionicons/icons";
import CreateTaskModal from "../modals/create-task/create-task";
import { GoalListProps } from "../../goal-list/goal-list";
import _ from "lodash";

const MenuGoalList: React.FC<GoalListProps> = ({ id, label, items }) => {
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleCreateTask = () => {
    setIsCreatingTask(true);
  };

  return (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>
            <h1>{label}</h1>
          </IonLabel>
          <IonButton onClick={handleCreateTask} id={String(id)} expand="block" size="large">
            <IonIcon icon={add} />
          </IonButton>
        </IonListHeader>
        {_.map(
          _.filter(items, (e) => e.id !== undefined),
          (e, i) => (
            <MenuGoal {...e} listId={id} key={i} />
          )
        )}
      </IonList>
      <IonModal isOpen={isCreatingTask} onDidDismiss={() => setIsCreatingTask(false)}>
        <CreateTaskModal listId={id} onClose={() => setIsCreatingTask(false)} />
      </IonModal>
    </>
  );
};

export default MenuGoalList;
