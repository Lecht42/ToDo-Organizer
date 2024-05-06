import { IonItem, IonLabel } from "@ionic/react";
import "./Goal.css";
import { IGoal } from "../../../interfaces";

interface GoalProps extends IGoal {
  onClick: () => void;  
}

const Goal: React.FC<GoalProps> = ({ id, label, completed, onClick }) => {
  return (
    <IonItem button onClick={onClick} detail={false}>
      <IonLabel className={completed ? "completed" : "not-completed"}>
        {label}
      </IonLabel>
    </IonItem>
  );
};

export default Goal;
