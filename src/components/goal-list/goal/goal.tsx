import { IonCheckbox, IonChip, IonIcon, IonItem, IonLabel } from "@ionic/react";
import "./goal.css";
import createChipText from "../../../utils/functions/create-chip-text";
import { GoalType } from "../../../utils/interfaces/goals";
import { timer } from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectPointIconType } from "../../../redux/selectors/settings-selectors";
import { useState, useEffect } from "react";
import moment from "moment";
import { disableCompletion } from "../../../redux/reducers/goals-slice";
import id from "../../../credentials/google-client-id";

interface GoalProps extends GoalType {
  onClick: () => void;
}

const Goal: React.FC<GoalProps> = ({
  id,
  label,
  points,
  completed,
  deadline,
  onClick,
  period,
  attachedListId,
}) => {
  const [rewardIsGot, setRewardIsGot] = useState(completed);
  const [showChip, setShowChip] = useState(rewardIsGot);
  const pointSymbol = useAppSelector(selectPointIconType);
  const dispatch = useAppDispatch();

  useEffect(() => setRewardIsGot(completed), [completed]);

  useEffect(() => {
    if (rewardIsGot) {
      setShowChip(true);
    } else {
      const timer = setTimeout(() => setShowChip(false), 700);
      return () => clearTimeout(timer);
    }
  }, [rewardIsGot]);

  const isSameDay = moment(deadline).isSame(new Date(), "day");

  useEffect(() => {
    if (!isSameDay && completed)
      dispatch(disableCompletion({ listId: attachedListId as number, id: id as number }));
  }, []);

  const onComplete = () => {
    setRewardIsGot((prev) => !prev);
    onClick();
  };

  return (
    <IonItem className="damage-text-in" button disabled={!isSameDay} onClick={onComplete} detail={false}>
      <IonCheckbox checked={completed} labelPlacement="end" justify="start">
        <IonLabel className={completed ? "completed" : "not-completed"}>{label}</IonLabel>
      </IonCheckbox>
      {period && <IonIcon className="ion-no-margin" icon={timer} color={isSameDay ? "primary" : "medium"} />}
      {showChip && (
        <IonChip className={rewardIsGot ? "damage-text-in" : "damage-text-out"} slot="end" color="primary">
          {createChipText(points, undefined, pointSymbol)}
        </IonChip>
      )}
    </IonItem>
  );
};

export default Goal;
