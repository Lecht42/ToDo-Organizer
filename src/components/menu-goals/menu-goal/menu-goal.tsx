import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonReorder,
} from "@ionic/react";
import { IGoal } from "../../../interfaces";
import { trash } from "ionicons/icons";

interface MenuGoalProps extends IGoal {}

const MenuGoal: React.FC<MenuGoalProps> = ({ label, completed }) => {
  return (
    <IonItem>
      <IonButton>
        <IonIcon icon={trash} />
      </IonButton>
      <IonLabel>{label}</IonLabel>
    </IonItem>
  );
};

export default MenuGoal;
