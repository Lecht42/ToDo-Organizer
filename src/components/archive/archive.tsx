import React, { useState } from "react";
import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonChip,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonDatetimeButton,
  IonListHeader,
  IonCheckbox,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/hooks";
import { selectPointsArchive } from "../../redux/selectors/points-selectors";
import _ from "lodash";
import createChipText from "../../utils/functions/create-chip-text";
import moment from "moment";
import DatePickerModal from "../menu/modals/date-picker/date-picker";
import { selectArchiveSettings } from "../../redux/selectors/settings-selectors";

export const HISTORY_ID = "history";

const Archive: React.FC = () => {
  const { t } = useTranslation();
  const archive = useAppSelector(selectPointsArchive);
  const archiveSettings = useAppSelector(selectArchiveSettings);
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const archiveGroupedByDay = _.groupBy(archive, (e) => moment(e.deadline).format("YYYY-MM-DD"));

  let filteredArchive = _.reverse([...archiveGroupedByDay[selectedDate.format("YYYY-MM-DD")]]) || [];
  if (archiveSettings.archiveWithoutRepeats) filteredArchive = _.uniqBy(filteredArchive, (e) => e.label);
  if (archiveSettings.archiveOnlyIncome) filteredArchive = _.filter(filteredArchive, (e) => e.points > 0);

  const handleDateChange = (date: moment.Moment) => {
    setSelectedDate(date);
  };

  const archiveDateTimePicker = "archive-date-time-picker";

  return (
    <IonMenu side="end" menuId={HISTORY_ID} contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("archive")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonDatetimeButton
            className="ion-margin"
            slot="end"
            datetime={archiveDateTimePicker}
          ></IonDatetimeButton>
          <DatePickerModal
            max={moment().toISOString()}
            datetime={archiveDateTimePicker}
            value={selectedDate}
            onConfirm={handleDateChange}
          />
          {filteredArchive.length > 0 ? (
            filteredArchive.map((e, i) => (
              <IonItem key={i}>
                <IonLabel>{e.label}</IonLabel>
                <IonLabel slot="end" color="medium">
                  <h3>{moment(e.deadline).format("h:mm A")}</h3>
                </IonLabel>
                <IonChip slot="end">{createChipText(e.points)}</IonChip>
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel>{t("no_records")}</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Archive;
