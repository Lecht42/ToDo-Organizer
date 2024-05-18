import IPeriod from "./period";

export interface GoalType {
  id?: number;
  label: string;
  points: number;
  deadline: string;
  completed?: boolean;
  attachedListId?: number;
  period?: IPeriod;
}

export type PointsDeltaEntry = Omit<GoalType, "attachedListId" | "period">;

export interface GoalListType {
  id?: number;
  label: string;
  points?: number;
  items: GoalType[];
}
