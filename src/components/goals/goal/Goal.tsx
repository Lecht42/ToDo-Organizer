import { IonChip, IonItem, IonLabel } from "@ionic/react";
import "./Goal.css";
import { IGoal } from "../../../interfaces";
import createChipText from "../../../utils/functions/create-chip-text";

interface GoalProps extends IGoal {
  onClick: () => void;
}

const Goal: React.FC<GoalProps> = ({ label, points, completed, onClick }) => {
  return (
    <IonItem button onClick={onClick} detail={false}>
      <IonLabel className={completed ? "completed" : "not-completed"}>
        {label}
      </IonLabel>
      <IonChip slot="end" color="tertiary">{createChipText(points)}</IonChip>
    </IonItem>
  );
};

export default Goal;
