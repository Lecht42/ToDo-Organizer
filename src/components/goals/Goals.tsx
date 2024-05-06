import { IonContent, IonLabel, IonList } from "@ionic/react";
import { IGoal, IGoalList } from "../../interfaces";
import "./Goals.css";
import Goal from "./goal/Goal";
import { useAppDispatch } from "../../redux/hooks";
import { flickGoal } from "../../redux/reducers/goals-slice";

interface GoalsProps extends IGoalList {
}

const Goals: React.FC<GoalsProps> = ({ id, label, items }) => {
  const dispatch = useAppDispatch();
  const onGoalClickHandler = (listId: number, id: number) =>
    dispatch(flickGoal({ listId, id }));

  return (
    <div className="container">
      <h2>{label}</h2>
      <IonList inset>
        {items.map((e) => (
          <Goal {...e} onClick={() => onGoalClickHandler(id, e.id)} key={e.id} />
        ))}
      </IonList>
    </div>
  );
};

export default Goals;
