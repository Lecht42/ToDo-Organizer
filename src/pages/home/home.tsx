import { IonContent, IonPage } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectGoals, selectTodayGoals } from "../../redux/selectors/goals-selectors";
import { selectDailyPoints } from "../../redux/selectors/points-selectors";
import { IGoalList } from "../../utils/interfaces/goals";
import Header from "../../components/header/header";
import Goals from "../../components/goals/goals";
import GoalsIndicator from "../../components/goals/goals-indicator/goals-indicator";
import { useEffect } from "react";

export const HOME_HREF = "/home";

const Home: React.FC = () => {
  const todayGoals: IGoalList = {
    id: 0,
    label: "Today",
    points: 10,
    items: useAppSelector(selectTodayGoals),
  };
  const goals = useAppSelector(selectGoals);
  const dailyPoints = useAppSelector(selectDailyPoints);

  return (
    <IonPage id="main-content">
      <Header/>
      <IonContent>
        <div className="ion-padding">
          <GoalsIndicator />
          {Boolean(todayGoals.items.length) && dailyPoints > 0 && (
            <Goals {...todayGoals} color="primary" id={todayGoals.id as number} />
          )}
          {Boolean(goals.length) &&
            goals
              .filter((g) => g.id !== undefined)
              .map((e) => <Goals {...e} id={e.id as number} key={e.id as number} />)}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
