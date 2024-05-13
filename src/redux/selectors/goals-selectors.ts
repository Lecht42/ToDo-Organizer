import moment from "moment";
import { IGoalList, IGoal } from "../../utils/interfaces/goals"; 
import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectGoals = (state: RootState): IGoalList[] =>
  state.goals.goalLists;


export const selectTodayGoals = createSelector(
  (state: RootState) => state.goals.goalLists,
  (goalLists: IGoalList[]) => {
    const today = moment();

    return goalLists.reduce((todayItems: IGoal[], list: IGoalList) => {
      const listTodayItems = list.items
        .filter((item) => moment(item.deadline).isSame(today, 'day'))
        .map((e: IGoal) => {
          return { ...e, attachedListId: list.id };
        });
      return [...todayItems, ...listTodayItems];
    }, []);
  }
);