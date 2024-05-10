import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonLabel,
  IonList,
} from "@ionic/react";
import { useAppDispatch } from "../../redux/hooks";
import { toggleGoalCompletion } from "../../redux/reducers/goals-slice";
import { addPoints } from "../../redux/reducers/points-slice";
import createChipText from "../../utils/functions/create-chip-text";
import Goal from "./goal/goal";
import { IGoalList } from "../../utils/interfaces/goals";

export interface GoalsProps extends IGoalList {
  id: number;
}

const Goals: React.FC<GoalsProps> = ({ id, label, items }) => {
  const dispatch = useAppDispatch();

  const onGoalClick = (goalId: number, points: number) => () => {
    dispatch(toggleGoalCompletion({ listId: id, id: goalId }));
    dispatch(addPoints(points));
  };

  return (
    <IonCard color="primary">
      <IonCardHeader>
        <IonCardTitle>
          <IonLabel>{label}</IonLabel>
          <IonChip color="warning">
            {createChipText(
              items.reduce(
                (acc, value) => (value.completed ? acc : (acc += value.points)),
                0
              )
            )}
          </IonChip>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {items.length > 0 ? (
            items.map((e) => (
              <Goal
                {...e}
                onClick={onGoalClick(
                  e.id as number,
                  e.completed ? -e.points : e.points
                )}
                key={e.id}
              />
            ))
          ) : (
            <h2>No goals available.</h2>
          )}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default Goals;
