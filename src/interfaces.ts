import { Color } from "./types";

export interface IGoal {
    id?: number;
    label : string;
    points: number;
    deadline: string;
    completed : boolean;
}

export interface IGoalList {
    id?: number;
    items: IGoal[];
    label: string;
}