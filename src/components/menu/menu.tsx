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
import CreateTaskListModal from "./modals/create-task-list/create-task-list";

const CREATE_TASK_LIST_MODAL_ID = "create-new-task-list";

const Menu: React.FC = () => {
  const goals = useAppSelector(getGoals);

  return (
    <IonMenu contentId="main-content">
      <IonContent>
        <IonButton
          id={CREATE_TASK_LIST_MODAL_ID}
          fill="clear"
          className="ion-margin"
        >
          <IonIcon icon={add} />
          <IonLabel>Add new task group</IonLabel>
        </IonButton>
        <CreateTaskListModal trigger={CREATE_TASK_LIST_MODAL_ID} />
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
