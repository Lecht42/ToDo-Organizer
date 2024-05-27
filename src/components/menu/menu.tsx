import React, { useState } from "react";
import { IonMenu, IonContent, IonFooter, IonButton, IonIcon, IonLabel, IonItem } from "@ionic/react";
import { useAppSelector } from "../../redux/hooks";
import { selectGoals } from "../../redux/selectors/goals-selectors";
import { add, settingsOutline } from "ionicons/icons";
import CreateTaskListModal from "./modals/create-task-list/create-task-list";
import SettingsModal from "./modals/settings/settings";
import { useTranslation } from "react-i18next";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setGoogleAuth } from "../../redux/reducers/auth-slice";
import { tryFetchUserState } from "../../redux/sagas/user/user-actions";
import MenuGoalList from "./menu-goal-list/menu-goal-list";
import { selectGoogleUserId } from "../../redux/selectors/auth-selectors";

const CREATE_TASK_LIST_MODAL_ID = "create-new-task-list";
export const MENU_ID = "menu";

const Menu: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const goals = useAppSelector(selectGoals);
  const userId = useAppSelector(selectGoogleUserId);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); 

  const handleOnLogin = (response: GoogleCredentialResponse) => {
    if (userId) {
      dispatch(setGoogleAuth({ credential: response.credential as string, clientId: response.clientId as string }));
      dispatch({ type: tryFetchUserState.type, payload: response.clientId as string });
    }
  };

  const handleOnFailedLogin = () => {
    console.error("Google login failed");
  };

  return (
    <IonMenu contentId="main-content" side="start" menuId={MENU_ID}>
      <IonContent>
        <CreateTaskListModal trigger={CREATE_TASK_LIST_MODAL_ID} />
        {goals
          .filter((goal) => goal.id !== undefined)
          .map((goal) => (
            <MenuGoalList {...goal} id={goal.id as number} key={goal.id as number} />
          ))}
        <IonButton id={CREATE_TASK_LIST_MODAL_ID} fill="clear" className="ion-margin">
          <IonIcon icon={add} />
          <IonLabel slot="end">{t("add_new_task_group")}</IonLabel>
        </IonButton>
      </IonContent>
      <IonFooter>
        <IonItem>
          <GoogleLogin auto_select onSuccess={handleOnLogin} onError={handleOnFailedLogin} />
          <IonButton expand="block" slot="end" onClick={() => setIsSettingsOpen(true)} fill="clear">
            <IonIcon icon={settingsOutline} />
          </IonButton>
        </IonItem>
        <SettingsModal isOpen={isSettingsOpen} onDismiss={() => setIsSettingsOpen(false)} />
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
