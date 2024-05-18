import { IonCheckbox, IonChip, IonIcon, IonItem, IonLabel, IonLoading, IonSpinner } from "@ionic/react";
import "./goal.css";
import createChipText from "../../../utils/functions/create-chip-text";
import { GoalType } from "../../../utils/interfaces/goals";
import { timer } from "ionicons/icons";

interface GoalProps extends GoalType {
  onClick: () => void;
}

const Goal: React.FC<GoalProps> = ({ label, points, completed, onClick, period }) => {
  return (
    <IonItem button onClick={onClick} detail={false}>
      {period && completed ? (
        <>
          <IonIcon className="ion-no-margin" icon={timer} slot="start" color="primary" />
          <IonLabel slot="start" className={`${completed ? "completed" : "not-completed"} ion-margin-start`}>
            <h3>{label}</h3>
          </IonLabel>
        </>
      ) : (
        <IonCheckbox checked={completed} labelPlacement="end" justify="start">
          <h3 className={completed ? "completed" : "not-completed"}>{label}</h3>
        </IonCheckbox>
      )}
      <IonChip slot="end" disabled={!completed} color="tertiary">
        {createChipText(points)}
      </IonChip>
    </IonItem>
  );
};

export default Goal;
