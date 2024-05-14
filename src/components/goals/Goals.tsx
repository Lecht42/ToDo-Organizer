import React from "react";
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
import { deleteGoalList, toggleGoalCompletion } from "../../redux/reducers/goals-slice";
import { addPoints } from "../../redux/reducers/points-slice";
import createChipText from "../../utils/functions/create-chip-text";
import { IGoalList } from "../../utils/interfaces/goals";
import Goal from "./goal/goal";
import "./goals.css";

export interface GoalsProps extends IGoalList {
  id: number;
  color?: string;
}

const Goals: React.FC<GoalsProps> = ({ id, label, items, color, points }) => {
  const dispatch = useAppDispatch();

  const onGoalClickHandler = (goalId: number, points: number, attachedListId?: number) => {
    return () => {
      dispatch(toggleGoalCompletion({ listId: attachedListId || id, id: goalId }));
      dispatch(addPoints(points));
    };
  };

  const onGoalsClickHandler = () => {
    dispatch(deleteGoalList(id));
    dispatch(addPoints(points as number));
  };

  if (!items.length) return <></>;

  return (
    <IonCard color={color || "secondary"}>
      <IonCardHeader>
        <IonCardTitle>
          <IonLabel>{label}</IonLabel>
          {points && (
            <IonChip
              disabled={Boolean(items.filter((e) => !e.completed).length)}
              onClick={() => onGoalsClickHandler()}
            >
              {createChipText(points)}
            </IonChip>
          )}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent >
      <IonList className="goals">
          {items.map((e) => (
            <Goal
              {...e}
              onClick={onGoalClickHandler(
                e.id as number,
                e.completed ? -e.points : e.points,
                e.attachedListId
              )}
              key={e.id}
            />
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default Goals;
