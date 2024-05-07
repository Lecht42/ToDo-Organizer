import { RootState } from "../store";

export const getPoints = (state: RootState): number => state.points.points,
  getTodayPointsRemaining = (state: RootState): number => {
    return state.goals.goalLists.reduce(
      (acc, value) =>
        acc + value.items.reduce((acc2, value2) => acc2 + value2.points, 0),
      0
    );
  };
