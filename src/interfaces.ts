export interface IGoal {
    id: number;
    label : string;
    completed : boolean;
}

export interface IGoalList {
    id: number;
    items: IGoal[];
    label: string;
}