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
import "./goal-list.css";
import { GoalListType, GoalType } from "../../utils/interfaces/goals";
import Goal from "./goal/goal";

export interface GoalListProps extends GoalListType {
  id: number;
  color?: string;
}

const GoalList: React.FC<GoalListProps> = ({ id, label, items, color, points }) => {
  const dispatch = useAppDispatch();

  const onGoalClickHandler = (goal: GoalType) => {
    return () => {
      dispatch(toggleGoalCompletion({ listId: goal.attachedListId || id, id: goal.id as number }));
      dispatch(completeGoal(goal));
    };
  };

  const getListReward = () => {
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
          <IonLabel>
            <h1>{label}</h1>
          </IonLabel>
          {Boolean(points) && (
            <IonChip
              disabled={Boolean(items.filter((e) => !e.completed).length)}
              onClick={getListReward}
              color="primary"
            >
              {createChipText(points as number)}
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

export default GoalList;
