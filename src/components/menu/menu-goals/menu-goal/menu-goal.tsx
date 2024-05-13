import { IonItem, IonLabel } from "@ionic/react";
import { IGoal } from "../../../../utils/interfaces/goals";
import moment from "moment";

interface MenuGoalProps extends IGoal {}

const MenuGoal: React.FC<MenuGoalProps> = ({ label, completed, deadline }) => {
  return (
    <IonItem>
      <IonLabel className={completed ? "completed" : "not-completed"}>
        {label}
      </IonLabel>
      <IonLabel slot="end" color="medium">
        {moment(deadline, moment.ISO_8601).format("MMM Do YY")}
      </IonLabel>
    </IonItem>
  );
};

export default MenuGoal;
