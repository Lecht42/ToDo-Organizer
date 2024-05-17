import IPeriod from "./period";

export interface IGoal {
  id?: number;
  label: string;
  points: number;
  date: string;
  completed?: boolean;
  attachedListId?: number;
  period?: IPeriod;
}

export type IArchiveGoal = Omit<IGoal, "attachedListId" | "period">;

export interface IGoalList {
  id?: number;
  label: string;
  points?: number;
  items: IGoal[];
}
