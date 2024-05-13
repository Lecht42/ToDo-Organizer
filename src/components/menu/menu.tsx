import React from "react";
import { IonMenu, IonContent, IonFooter, IonButton, IonIcon, IonLabel } from "@ionic/react";
import { useAppSelector } from "../../redux/hooks";
import { selectGoals } from "../../redux/selectors/goals-selectors";
import { add, settingsOutline } from "ionicons/icons";
import MenuGoals from "./menu-goals/menu-goals";
import CreateTaskListModal from "./modals/create-task-list/create-task-list";
import { useHistory } from "react-router-dom";

const CREATE_TASK_LIST_MODAL_ID = "create-new-task-list";
export const MENU_ID = "menu";

const Menu: React.FC = () => {
  const history = useHistory();
  const goals = useAppSelector(selectGoals);

  return (
    <IonMenu contentId="main-content" side="start" menuId={MENU_ID}>  
      <IonContent>
        <IonButton id={CREATE_TASK_LIST_MODAL_ID} fill="clear" className="ion-margin">
          <IonIcon icon={add} />
          <IonLabel>Add new task group</IonLabel>
        </IonButton>
        <CreateTaskListModal trigger={CREATE_TASK_LIST_MODAL_ID} />
        {goals
          .filter((goal) => goal.id !== undefined)
          .map((goal) => (
            <MenuGoals {...goal} id={goal.id as number} key={goal.id as number} />
          ))}
      </IonContent>
      <IonFooter>
          <IonButton expand="block" >
            <IonIcon icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonButton>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
