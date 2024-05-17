import React from "react";
import { IonMenu, IonContent, IonFooter, IonButton, IonIcon, IonLabel, IonItem } from "@ionic/react";
import { useAppSelector } from "../../redux/hooks";
import { selectGoals } from "../../redux/selectors/goals-selectors";
import { add, settingsOutline } from "ionicons/icons";
import MenuGoals from "./menu-goals/menu-goals";
import CreateTaskListModal from "./modals/create-task-list/create-task-list";
import SettingsModal, { SETTINGS_MODAL_TRIGGER } from "./modals/settings/settings";
import { useTranslation } from "react-i18next";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setGoogleAuth } from "../../redux/reducers/auth-slice";
import { tryFetchUserState } from "../../redux/sagas/user/user-actions";
import { setupPushSubscription } from "../../utils/service-workers/setup-push-notifications";

const CREATE_TASK_LIST_MODAL_ID = "create-new-task-list";
export const MENU_ID = "menu";

const Menu: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const goals = useAppSelector(selectGoals);

  const handleOnLogin = (response: GoogleCredentialResponse) => {
    dispatch(
      setGoogleAuth({ credential: response.credential as string, clientId: response.clientId as string })
    );
    dispatch({ type: tryFetchUserState.type, payload: response.clientId as string });
  };

  const handleOnFailedLogin = () => {
    console.error("Google login failed");
  };

  const handleSubscribe = async () => {
    try {
      const subscription = await setupPushSubscription();
      console.log("Subscription:", subscription);
    } catch (error) {
      console.error("Error subscribing to notifications:", error);
    }
  };

  return (
    <IonMenu contentId="main-content" side="start" menuId={MENU_ID}>
      <IonContent>
        <CreateTaskListModal trigger={CREATE_TASK_LIST_MODAL_ID} />
        {goals
          .filter((goal) => goal.id !== undefined)
          .map((goal) => (
            <MenuGoals {...goal} id={goal.id as number} key={goal.id as number} />
          ))}
        <IonButton id={CREATE_TASK_LIST_MODAL_ID} fill="clear" className="ion-margin">
          <IonIcon icon={add} />
          <IonLabel slot="end">{t("add_new_task_group")}</IonLabel>
        </IonButton>
      </IonContent>
      <IonFooter>
        <IonItem>
          <GoogleLogin auto_select onSuccess={handleOnLogin} onError={handleOnFailedLogin} />
          <IonButton slot="end" id={SETTINGS_MODAL_TRIGGER} expand="block" fill="clear">
            <IonIcon icon={settingsOutline} />
          </IonButton>
        </IonItem>
        <SettingsModal />
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
