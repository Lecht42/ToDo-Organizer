import { IonPage, IonContent } from "@ionic/react";
import GoalsIndicator from "../../components/goal-list/goals-indicator/goals-indicator";
import Header from "../../components/header/header";
import { useAppSelector } from "../../redux/hooks";
import { selectTodayGoals, selectGoals } from "../../redux/selectors/goals-selectors";
import { selectDailyPoints } from "../../redux/selectors/points-selectors";
import { GoalListType } from "../../utils/interfaces/goals";
import GoalList from "../../components/goal-list/goal-list";

export const HOME_HREF = "/home";

const Home: React.FC = () => {
  const dailyPoints = useAppSelector(selectDailyPoints);
  const todayGoals: GoalListType = {
    id: 0,
    label: "Today",
    points: dailyPoints,
    items: useAppSelector(selectTodayGoals),
  };
  const goals = useAppSelector(selectGoals);

  return (
    <IonPage id="main-content">
      <Header />
      <IonContent>
        <div className="ion-padding">
          <GoalsIndicator />
          {Boolean(todayGoals.items.length) && (
            <GoalList {...todayGoals} color="primary" id={todayGoals.id as number} />
          )}
          {Boolean(goals.length) &&
            goals
              .filter((g) => g.id !== undefined)
              .map((e) => <GoalList {...e} id={e.id as number} key={e.id as number} />)}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
