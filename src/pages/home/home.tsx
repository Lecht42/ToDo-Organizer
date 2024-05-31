import { IonPage, IonContent } from "@ionic/react";
import GoalsIndicator from "../../components/goal-list/goals-indicator/goals-indicator";
import Header from "../../components/header/header";
import { useAppSelector } from "../../redux/hooks";
import { selectTodayGoals, selectGoals } from "../../redux/selectors/goals-selectors";
import { selectDailyPoints } from "../../redux/selectors/points-selectors";
import { GoalListType } from "../../utils/interfaces/goals";
import GoalList from "../../components/goal-list/goal-list";
import { useTranslation } from "react-i18next";

export const TODAY_GOAL_ID = -1;

const Home: React.FC = () => {
  const dailyPoints = useAppSelector(selectDailyPoints);
  const { t } = useTranslation();
  const todayGoals: GoalListType = {
    id: TODAY_GOAL_ID,
    label: t("daily_tasks"),
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
          <GoalList {...todayGoals} color="tertiary" id={todayGoals.id as number} />
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
