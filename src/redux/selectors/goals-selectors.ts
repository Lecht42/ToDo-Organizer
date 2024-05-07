import { IGoalList } from "../../interfaces";
import { RootState } from "../store";

export const getGoals = (state: RootState): IGoalList[] => state.goals.goalLists;