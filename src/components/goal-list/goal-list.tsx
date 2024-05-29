import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonLabel,
  IonList,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteGoalList, toggleGoalCompletion } from "../../redux/reducers/goals-slice";
import { completeGoal, completeList } from "../../redux/reducers/points-slice";
import createChipText from "../../utils/functions/create-chip-text";
import "./goal-list.css";
import { GoalListType, GoalType } from "../../utils/interfaces/goals";
import Goal from "./goal/goal";
import { selectPointIconType } from "../../redux/selectors/settings-selectors";
import _ from "lodash";

export interface GoalListProps extends GoalListType {
  id: number;
  color?: string;
}

const GoalList: React.FC<GoalListProps> = ({ id, label, items, color, points }) => {
  const pointSymbol = useAppSelector(selectPointIconType);
  const [rewardIsGot, setRewardIsGot] = useState(false);
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
    setRewardIsGot(true);
    setTimeout(() => dispatch(deleteGoalList(id)), 1000);
  };

  if (!items.length) return <></>;

  return (
    <IonCard color={color || "secondary"}>
      <IonCardHeader>
        <IonCardTitle>
          <IonLabel>{label}</IonLabel>
          {Boolean(points) && (
            <IonChip
              className={`ion-margin-horizontal ${rewardIsGot ? "damage-text" : ""}`}
              disabled={Boolean(_.filter(items, (e) => !e.completed).length)}
              onClick={getListReward}
            >
              {createChipText(points as number, "+", pointSymbol)}
            </IonChip>
          )}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList lines="none">
          {_.map(items, (e, i) => (
            <Goal {...e} onClick={onGoalClickHandler(e)} key={i} />
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default GoalList;
