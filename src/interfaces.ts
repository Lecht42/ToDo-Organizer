import { Color } from "./types";

export interface IGoal {
    id?: number;
    label : string;
    points: number;
    deadline: Date;
    completed : boolean;
}

export interface IGoalList {
    id?: number;
    items: IGoal[];
    color?: Color;
    label: string;
}