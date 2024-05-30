import { IonCheckbox, IonChip, IonIcon, IonItem, IonLabel } from "@ionic/react";
import "./goal.css";
import createChipText from "../../../utils/functions/create-chip-text";
import { GoalType } from "../../../utils/interfaces/goals";
import { timer } from "ionicons/icons";
import { useAppSelector } from "../../../redux/hooks";
import { selectPointIconType } from "../../../redux/selectors/settings-selectors";
import { useState, useEffect } from "react";

interface GoalProps extends GoalType {
  onClick: () => void;
}

const Goal: React.FC<GoalProps> = ({ label, points, completed, onClick, period }) => {
  const [rewardIsGot, setRewardIsGot] = useState(completed);
  const [showChip, setShowChip] = useState(rewardIsGot);
  const pointSymbol = useAppSelector(selectPointIconType);

  useEffect(() => setRewardIsGot(completed), [completed]);

  useEffect(() => {
    if (rewardIsGot) {
      setShowChip(true);
    } else {
      const timer = setTimeout(() => setShowChip(false), 700); 
      return () => clearTimeout(timer);
    }
  }, [rewardIsGot]);

  const onComplete = () => {
    setRewardIsGot((prev) => !prev);
    onClick();
  };

  return (
    <IonItem className="damage-text-in" button onClick={onComplete} detail={false}>
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
      {showChip && (
        <IonChip className={rewardIsGot ? "damage-text-in" : "damage-text-out"} slot="end" color="primary">
          {createChipText(points, undefined, pointSymbol)}
        </IonChip>
      )}
    </IonItem>
  );
};

export default Goal;
