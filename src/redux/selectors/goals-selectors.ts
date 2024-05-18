import moment from "moment";
import { GoalListType, GoalType } from "../../utils/interfaces/goals";
import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { GoalsState } from "../reducers/goals-slice";

export const selectGoals = (state: RootState): GoalListType[] => state.goals.goalLists;
export const selectTodayGoals = createSelector(
  (state: RootState) => state.goals.goalLists,
  (goalLists: GoalListType[]) => {
    const today = moment();

    return goalLists.reduce((todayItems: GoalType[], list: GoalListType) => {
      const listTodayItems = list.items
        .filter((item) => moment(item.deadline).isSame(today, "day"))
        .map((e: GoalType) => {
          return { ...e, attachedListId: list.id };
        });
      return [...todayItems, ...listTodayItems];
    }, []);
  }
);

export const selectGoalsState = (state: RootState): GoalsState => state.goals;
