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
  IonRange,
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
import { textOutline } from "ionicons/icons";
import getFonts from "../../../../utils/functions/get-fonts";

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
    i18n.changeLanguage(localSettings.language);
  }, [localSettings.textSize, localSettings.fontFamily, localSettings.darkMode, localSettings.language]);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleOnConfirm = () => {
    dispatch(setSettingsState(localSettings));
    onDismiss();
  };

  const handleChange = (field: keyof typeof localSettings, value: string | number | boolean) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setLocalSettings(settings);
    onDismiss();
  };

  const dailyPointsPicker = "open-daily-points-picker";

  return (
    <IonModal
      id="settings-modal"
      className="ion-padding full-screen"
      trigger={SETTINGS_MODAL_TRIGGER}
      ref={modal}
      keepContentsMounted
      showBackdrop={false}
      isOpen={isOpen}
      onDidDismiss={handleClose}
    >
      <IonHeader>
        <IonToolbar>
          <IonButton size="small" fill="clear" slot="start" onClick={onDismiss}>
            {t("close")}
          </IonButton>
          <IonTitle slot="end">{t("settings")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" className="ion-padding">
        <IonListHeader>{t("preferences")}</IonListHeader>
        <IonList inset>
          <IonItem>
            <IonSelect
              label={t("language")}
              value={i18n.language}
              onIonChange={(event) => handleChange("language", event.detail.value)}
            >
              {preloadLanguages.map((e, i) => (
                <IonSelectOption value={e} key={i}>
                  {t(e)}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonListHeader>{t("daily_activities")}</IonListHeader>
        <IonList inset>
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
              value={moment(localSettings.notificationTime)}
              onConfirm={(newDate) => handleChange("notificationTime", newDate.toISOString())}
            />
          </IonItem>
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
        <IonListHeader>{t("appearance")}</IonListHeader>
        <IonList inset>
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
          <IonItem>
            <IonSelect
              label={t("font_family")}
              value={localSettings.fontFamily}
              onIonChange={(event) => handleChange("fontFamily", event.detail.value)}
            >
              {_.map(getFonts(), (e, i) => (
                <IonSelectOption value={e} key={i}>{e}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonRange
              pin
              min={14}
              max={24}
              step={1}
              value={localSettings.textSize}
              onIonChange={(event) => handleChange("textSize", Number(event.detail.value))}
            >
              <IonIcon size="small" icon={textOutline} slot="start" />
              <IonIcon size="large" icon={textOutline} slot="end" />
            </IonRange>
          </IonItem>
        </IonList>
        <IonListHeader>{t("archive_settings")}</IonListHeader>
        <IonList inset>
          <IonItem>
            <IonToggle
              checked={localSettings.archiveWithoutRepeats}
              onIonChange={(event) => {
                handleChange("archiveWithoutRepeats", event.detail.checked);
                handleChange("archiveOnlyIncome", false);
              }}
            >
              {t("only_last_entries")}
            </IonToggle>
          </IonItem>
          <IonItem disabled={localSettings.archiveWithoutRepeats}>
            <IonToggle
              checked={localSettings.archiveOnlyIncome}
              onIonChange={(event) => handleChange("archiveOnlyIncome", event.detail.checked)}
            >
              {t("only_income_entries")}
            </IonToggle>
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
