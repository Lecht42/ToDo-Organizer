export interface Goal {
    id: number;
    label : string;
    completed : boolean;
}

export interface GoalList {
    id: number;
    items: Goal[];
    label: string;
}