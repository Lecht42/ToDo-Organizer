import { IArchiveGoal, IGoalList } from "./goals";

export interface GoalsState {
  goalLists: IGoalList[];
}

export interface PointsState {
  points: number;
  dailyPoints: number;
  archive: IArchiveGoal[];
}

export interface PointsState {
  points: number;
  dailyPoints: number;
  archive: IArchiveGoal[];
}

export interface SettingsState {
  dailyPointsIncome: number;
  textSize: number;
  darkMode: boolean;
  language: string;
}

export interface GoogleAuthResponse {
  credential: string;
  clientId: string;
}

export interface AuthState {
  googleAuth?: GoogleAuthResponse;
}
