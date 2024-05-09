import { IonCheckbox, IonChip, IonItem, IonLabel } from "@ionic/react";
import "./goal.css";
import { IGoal } from "../../../interfaces";
import createChipText from "../../../utils/functions/create-chip-text";

interface GoalProps extends IGoal {
  onClick: () => void;
}

const Goal: React.FC<GoalProps> = ({ label, points, completed, onClick }) => {
  return (
    <IonItem button onClick={onClick} detail={false}>
      <IonCheckbox checked={completed} labelPlacement="end" justify="start">
        <h3 className={completed ? "completed" : "not-completed"}>{label}</h3>
      </IonCheckbox>
      <IonChip disabled={!completed} color="tertiary">
        {createChipText(points)}
      </IonChip>
    </IonItem>  
  );
};

export default Goal;
