import {
  IonItem,
  IonLabel,
} from "@ionic/react";
import { IGoal } from "../../../../utils/interfaces/goals";

interface MenuGoalProps extends IGoal {}

const MenuGoal: React.FC<MenuGoalProps> = ({ label, completed }) => {
  return (
    <IonItem>
      <IonLabel className={completed ? "completed" : "not-completed"}>{label}</IonLabel>
    </IonItem>
  );
};

export default MenuGoal;
