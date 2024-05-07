import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList } from "@ionic/react";
import "./Goals.css";
import Goal from "./goal/Goal";
import { useAppDispatch } from "../../redux/hooks";
import { toggleGoalCompletion } from "../../redux/reducers/goals-slice";
import { IGoalList } from "../../interfaces";

interface GoalsProps extends IGoalList {
  id: number;
}

const Goals: React.FC<GoalsProps> = ({ id, label, items }) => {
  const dispatch = useAppDispatch();

  const onGoalClick = (goalId: number) => () => {
    dispatch(toggleGoalCompletion({ listId: id, id: goalId }));
  };

  return (
    <IonCard color="secondary">
      <IonCardHeader>
        <IonCardTitle>{label}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {items.length > 0 ? (
            items.map((e) => (
              <Goal {...e} onClick={onGoalClick(e.id as number)} key={e.id} />
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
