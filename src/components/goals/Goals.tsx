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
import { completeGoal, completeList } from "../../redux/reducers/points-slice";
import createChipText from "../../utils/functions/create-chip-text";
import { IGoal, IGoalList } from "../../utils/interfaces/goals";
import Goal from "./goal/goal";
import "./goals.css";

export interface GoalsProps extends IGoalList {
  id: number;
  color?: string;
}

const Goals: React.FC<GoalsProps> = ({ id, label, items, color, points }) => {
  const dispatch = useAppDispatch();

  const onGoalClickHandler = (goal: IGoal) => {
    return () => {
      dispatch(toggleGoalCompletion({ listId: goal.attachedListId || id, id: goal.id }));
      dispatch(completeGoal(goal));
    };
  };

  const onGoalsClickHandler = () => {
    dispatch(
      completeList({
        id,
        label,
        items,
        points,
      })
    );
    dispatch(deleteGoalList(id));
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
      <IonCardContent>
        <IonList lines="none" className="goals">
          {items.map((e) => (
            <Goal {...e} onClick={onGoalClickHandler(e)} key={e.id} />
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default Goals;
