import { GoalsState } from "../../../redux/reducers/goals-slice";
import { PointsState } from "../../../redux/reducers/points-slice";
import { SettingsState } from "../../../redux/reducers/settings-slice";
import _ from "lodash";

const URL = "http://localhost:3111/users/"; // Ensure you are using http:// or https://

export interface PutUserBody {
  id: string;
  points: PointsState;
  goals: GoalsState;
  settings: SettingsState;
}

class UserApi {
  static async getUserState(id: string): Promise<{ data?: PutUserBody; error?: string }> {
    try {
      const res = await fetch(`${URL}${id}`);

      if (!res.ok) {
        return { error: "Failed to fetch user state" };
      }
      const data: PutUserBody = await res.json();
      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Unknown error" };
    }
  }

  static async putUserState(body: PutUserBody): Promise<{ data?: PutUserBody; error?: string }> {
    try {
      const res = await fetch(`${URL}${body.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_.omit(body, ["id"])),
      });

      console.log(body);
      if (!res.ok) {
        return { error: "Failed to update user state" };
      }
      const data: PutUserBody = await res.json();
      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Unknown error" };
    }
  }
}

export default UserApi;
