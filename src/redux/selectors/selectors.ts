import { GoalList } from "../../interfaces";
import { RootState } from "../store";


export const getGoals = (state: RootState): GoalList[] => state.goals.goalLists;