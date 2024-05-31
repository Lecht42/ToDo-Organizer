import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonItem,
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
import { alertCircleOutline, checkmarkDone, removeCircle } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { TODAY_GOAL_ID } from "../../pages/home/home";

export interface GoalListProps extends GoalListType {
  id: number;
  color?: string;
}

const GoalList: React.FC<GoalListProps> = ({ id, label, items, color, points }) => {
  const pointSymbol = useAppSelector(selectPointIconType);
  const [rewardIsGot, setRewardIsGot] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onGoalClickHandler = (goal: GoalType) => {
    return () => {
      const listId = goal.attachedListId || id;
      const goalId = goal.id as number;
      dispatch(toggleGoalCompletion({ listId, id: goalId }));
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
    setTimeout(() => dispatch(deleteGoalList(id)), 700);
  };

  const rewardIsDisabled = Boolean(_.filter(items, (e) => !e.completed).length) || !Boolean(items.length);

  return (
    <IonCard className={rewardIsGot ? "damage-text-out" : "damage-text-in"} color={color || "secondary"}>
      <IonCardHeader>
        <IonCardTitle>
          <IonLabel>{label}</IonLabel>
          {Boolean(points) && (
            <IonChip
              className={`ion-margin-horizontal ${!rewardIsDisabled ? "damage-text-in" : "damage-text-out"}`}
              disabled={rewardIsDisabled}
              onClick={getListReward}
              color="primary"
            >
              <IonIcon color="light" icon={rewardIsDisabled ? removeCircle : checkmarkDone} />
              <IonLabel>{`${createChipText(points as number, "+", pointSymbol)}`}</IonLabel>
            </IonChip>
          )}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList lines="none">
          {items.length > 0 ? (
            _.map(items, (e, i) => <Goal {...e} attachedListId={id} onClick={onGoalClickHandler(e)} key={i} />)
          ) : (
            <IonItem>
              <IonLabel>{id === TODAY_GOAL_ID ? t("no_today_goals") : t("no_goals")}</IonLabel>
              <IonIcon slot="end" color="primary" icon={alertCircleOutline} />
            </IonItem>
          )}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default GoalList;
