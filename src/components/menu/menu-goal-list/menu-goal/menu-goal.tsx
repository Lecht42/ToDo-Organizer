import React, { useState, useRef } from "react";
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { pencil, timer, trash } from "ionicons/icons";
import { GoalType } from "../../../../utils/interfaces/goals";
import moment from "moment";
import { useAppDispatch } from "../../../../redux/hooks";
import { deleteGoal } from "../../../../redux/reducers/goals-slice";
import CreateTaskModal from "../../modals/create-task/create-task";
import isSameDay from "../../../../utils/functions/is-same-day";

interface MenuGoalProps extends GoalType {
  listId: number;
}

const MenuGoal: React.FC<MenuGoalProps> = ({
  id,
  listId,
  points,
  attachedListId,
  label,
  completed,
  deadline,
  period
}) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    dispatch(deleteGoal({ id, listId }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <>
      <IonItemSliding>
        <IonItem>
          <IonLabel className={completed ? "completed" : ""}>{label}</IonLabel>
          <IonLabel slot="end" color="medium">
            <h3>{moment(deadline).format("MMM Do YY")}</h3>
          </IonLabel>          
          {Boolean(period) && (
            <IonIcon
              slot="end"
              className="ion-no-margin"
              icon={timer}
              color={isSameDay(deadline) ? "primary" : "medium"}
            />
          )}
        </IonItem>
        <IonItemOptions side="start">
          <IonItemOption color="primary" onClick={handleDelete}>
            <IonIcon icon={trash} />
          </IonItemOption>
          <IonItemOption color="secondary" onClick={handleEdit}>
            <IonIcon icon={pencil} />
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
      <IonModal isOpen={isEditing} onDidDismiss={() => setIsEditing(false)}>
        <CreateTaskModal
          listId={listId}
          initialData={{ id, label, completed, points, attachedListId: Number(attachedListId), deadline }}
          onClose={() => setIsEditing(false)}
        />
      </IonModal>
    </>
  );
};

export default MenuGoal;
