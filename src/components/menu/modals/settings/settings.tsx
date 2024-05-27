import { useEffect, useRef, useState } from "react";
import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonDatetimeButton,
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { useDispatch } from "react-redux";
import { setSettingsState } from "../../../../redux/reducers/settings-slice";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../redux/hooks";
import { selectSettingsState } from "../../../../redux/selectors/settings-selectors";
import { preloadLanguages } from "../../../../i18next";
import ConfirmButton from "../../../buttons/confirm-button/confirm-button";
import toggleDarkPalette from "../../../../utils/functions/toggle-dark-palette";
import { pointsIconTypesArray } from "../../../../utils/functions/create-chip-text";
import _ from "lodash";
import DatePickerModal from "../date-picker/date-picker";
import moment from "moment";
import PointsPickerModal from "../points-picker/points-picker";
import { arrowBack } from "ionicons/icons";
import "./settings.css"

export const SETTINGS_MODAL_TRIGGER = "open-settings-modal";

interface SettingsProps {
  isOpen?: boolean;
  onDismiss: () => void;
}

const SettingsModal: React.FC<SettingsProps> = ({ isOpen, onDismiss }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const modal = useRef<HTMLIonModalElement>(null);
  const settings = useAppSelector(selectSettingsState);
  const [localSettings, setLocalSettings] = useState(settings);
  const notificationsTimePicker = "notifications-time-index-picker";

  useEffect(() => {
    document.documentElement.style.setProperty("font-size", `${localSettings.textSize}px`);
    document.documentElement.style.setProperty("--ion-default-font", localSettings.fontFamily);
    toggleDarkPalette(localSettings.darkMode);
  }, [localSettings.textSize, localSettings.fontFamily, localSettings.darkMode]);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleOnConfirm = () => {
    dispatch(setSettingsState(localSettings));
    modal.current?.dismiss();
  };

  const handleChange = (field: keyof typeof localSettings, value: string | number | boolean) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      [field]: value,
    }));
  };

  const dailyPointsPicker = "open-daily-points-picker";

  return (
    <IonModal
      id="settings-modal"
      className="ion-padding"
      trigger={SETTINGS_MODAL_TRIGGER}
      ref={modal}
      keepContentsMounted
      isOpen={isOpen}
      onDidDismiss={onDismiss}
    >
      <IonHeader>
        <IonToolbar>          
          <IonButton fill="clear" slot="start">
            <IonIcon icon={arrowBack}/>
          </IonButton>
          <IonTitle slot="primary">{t("settings")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonListHeader>{t("preferences")}</IonListHeader>
          <IonItem>
            <IonSelect
              label={t("language")}
              value={i18n.language}
              onIonChange={(event) => {
                handleChange("language", event.detail.value);
                i18n.changeLanguage(event.detail.value);
              }}
            >
              {preloadLanguages.map((e, i) => (
                <IonSelectOption value={e} key={i}>
                  {t(e)}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader>{t("daily_activities")}</IonListHeader>
          <IonItem>
            <IonLabel>{t("daily_points_income")}</IonLabel>
            <IonButton id={dailyPointsPicker} fill="clear" slot="end" expand="block">
              <IonLabel>
                <h2>{localSettings.dailyPointsIncome}</h2>
              </IonLabel>
            </IonButton>
            <PointsPickerModal
              value={localSettings.dailyPointsIncome}
              max={15}
              onConfirm={(points: number) => handleChange("dailyPointsIncome", points)}
              trigger={dailyPointsPicker}
            />
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader>{t("appearance")}</IonListHeader>
          <IonItem>
            <IonToggle
              checked={localSettings.darkMode}
              onIonChange={(event) => {
                handleChange("darkMode", event.detail.checked);
                toggleDarkPalette(event.detail.checked);
              }}
            >
              {t("dark_mode")}
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonSelect
              value={localSettings.pointIconType}
              onIonChange={(event) => handleChange("pointIconType", event.detail.value)}
              label={t("point_icon_type")}
            >
              {_.map(pointsIconTypesArray, (e, i) => (
                <IonSelectOption key={i} value={e}>
                  {e}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader>{t("notifications")}</IonListHeader>
          <IonItem>
            <IonToggle
              checked={localSettings.notifications}
              onIonChange={(event) => handleChange("notifications", event.detail.checked)}
            >
              {t("notifications")}
            </IonToggle>
          </IonItem>
          <IonItem disabled={!localSettings.notifications}>
            <IonLabel>{t("notification_time")}</IonLabel>
            <IonDatetimeButton datetime={notificationsTimePicker} slot="end" />
            <DatePickerModal
              datetime={notificationsTimePicker}
              presentation="time"
              presentingElement={modal.current}
              value={moment(localSettings.notificationTime)}
              onConfirm={(newDate) => handleChange("notificationTime", newDate.toISOString())}
            />
          </IonItem>
        </IonList>
        <div className="ion-padding-vertical">
          <ConfirmButton onClick={handleOnConfirm} />
        </div>
      </IonContent>
    </IonModal>
  );
};

export default SettingsModal;
