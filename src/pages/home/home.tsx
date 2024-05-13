import { IonContent, IonPage } from "@ionic/react";
import { useAppSelector } from "../../redux/hooks";
import { selectGoals, selectTodayGoals } from "../../redux/selectors/goals-selectors";
import GoalsIndicator from "../../components/goals-indicator/goals-indicator";
import { selectDailyPoints } from "../../redux/selectors/points-selectors";
import { IGoalList } from "../../utils/interfaces/goals";
import Header from "../../components/header/header";
import Goals from "../../components/goals/goals";

export const HOME_HREF = "/home";

const HomeTab: React.FC = () => {
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
      <Header key={1} hasMenu={false}/>
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

export default HomeTab;
