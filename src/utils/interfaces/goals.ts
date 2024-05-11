export interface IGoal {
  id?: number;
  label: string;
  points: number;
  deadline: string;
  completed?: boolean;
  attachedListId?: number;
}

export interface IGoalList {
  id?: number;
  label: string;
  points: number;
  items: IGoal[];
  completed?: boolean;
}
