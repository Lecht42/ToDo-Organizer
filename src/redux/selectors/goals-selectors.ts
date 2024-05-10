import { IGoalList } from "../../utils/interfaces/goals";
import { RootState } from "../store";

export const getGoals = (state: RootState): IGoalList[] => state.goals.goalLists;