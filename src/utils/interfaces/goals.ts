import IPeriod from "./period";

export interface IGoal {
  id?: number;
  label: string;
  points: number;
  deadline: string;
  completed?: boolean;
  attachedListId?: number;
  period?: IPeriod;
}

export interface IGoalList {
  id?: number;
  label: string;
  points?: number;
  items: IGoal[];
}
