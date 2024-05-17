import { IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";
import { IGoal } from "../../../../utils/interfaces/goals";
import moment from "moment";
import { useAppDispatch } from "../../../../redux/hooks";
import { deleteGoal, deleteGoalList } from "../../../../redux/reducers/goals-slice";

interface MenuGoalProps extends IGoal {
  listId: number;
}

const MenuGoal: React.FC<MenuGoalProps> = ({ id, listId, label, completed, deadline }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteGoal({id, listId}));
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
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default MenuGoal;
