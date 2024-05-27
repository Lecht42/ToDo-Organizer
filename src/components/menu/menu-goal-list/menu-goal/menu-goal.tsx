import React, { useState } from "react";
import { IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from "@ionic/react";
import { pencil, trash } from "ionicons/icons";
import { GoalType } from "../../../../utils/interfaces/goals";
import moment from "moment";
import { useAppDispatch } from "../../../../redux/hooks";
import { deleteGoal } from "../../../../redux/reducers/goals-slice";

interface MenuGoalProps extends GoalType {
  listId: number;
}

const MenuGoal: React.FC<MenuGoalProps> = ({ id, listId, label, completed, deadline }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteGoal({ id, listId }));
  };

  return (
    <IonItemSliding>
      <IonItem>
        <IonLabel className={completed ? "completed" : "not-completed"}>{label}</IonLabel>
        <IonLabel slot="end" color="medium">
          <h3>{moment(deadline).format("MMM Do YY")}</h3>
        </IonLabel>
      </IonItem>
      <IonItemOptions side="start">
        <IonItemOption color="danger" onClick={handleDelete}>
          <IonIcon icon={trash} />
        </IonItemOption>
        <IonItemOption color="success">
          <IonIcon icon={pencil} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default MenuGoal;
