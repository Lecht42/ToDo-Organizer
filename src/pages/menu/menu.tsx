import React from "react";
import { IonMenu, IonList, IonListHeader, IonLabel } from "@ionic/react";
import { useAppSelector } from "../../redux/hooks";
import { getGoals } from "../../redux/selectors/goals-selectors";
import MenuGoals from "../../components/menu-goals/menu-goals";
import { GoalsProps } from "../../components/goals/goals";

const Menu: React.FC = () => {
  const goals = useAppSelector(getGoals);

  return (
    <IonMenu contentId="main-content">
      {goals
        .filter((e) => e.id !== undefined)
        .map((e) => (
          <MenuGoals {...e} id={e.id as number} key={e.id as number} />
        ))}
    </IonMenu>
  );
};

export default Menu;
