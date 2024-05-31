import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonDatetimeButton,
  IonListHeader,
  IonToggle,
  IonLabel,
  IonChip,
} from "@ionic/react";
import _ from "lodash";
import moment from "moment";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../redux/hooks";
import { selectPointsArchive } from "../../../../redux/selectors/points-selectors";
import { selectArchiveSettings } from "../../../../redux/selectors/settings-selectors";
import createChipText from "../../../../utils/functions/create-chip-text";
import DatePickerModal from "../date-picker/date-picker";
import "./archive.css";
import { MAX_LABEL_LENGTH } from "../create-task-list/create-task-list";

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArchiveModal: React.FC<ArchiveModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const archive = useAppSelector(selectPointsArchive);
  const archiveSettings = useAppSelector(selectArchiveSettings);
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [searchQuery, setSearchQuery] = useState<string>("");

  const archiveGroupedByDay = useMemo(
    () => _.groupBy(archive, (e) => moment(e.deadline).format("YYYY-MM-DD")),
    [archive]
  );

  const filteredArchive = useMemo(() => {
    let newFilteredArchive = _.reverse(archiveGroupedByDay[selectedDate.format("YYYY-MM-DD")]) || [];
    if (archiveSettings.archiveWithoutRepeats)
      newFilteredArchive = _.uniqBy(newFilteredArchive, (e) => e.label);
    if (archiveSettings.archiveOnlyIncome)
      newFilteredArchive = _.filter(newFilteredArchive, (e) => e.points > 0);
    return newFilteredArchive;
  }, [selectedDate, archiveSettings, archiveGroupedByDay]);

  const displayedArchive = useMemo(
    () =>
      _.filter(
        filteredArchive,
        (e) =>
          e.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(e.points).includes(searchQuery.toLowerCase())
      ),
    [filteredArchive, searchQuery]
  );

  const handleDateChange = (date: moment.Moment) => {
    setSelectedDate(date);
  };

  const handleSearchChange = (e: CustomEvent) => {
    setSearchQuery(e.detail.value);
  };

  const archiveDateTimePicker = "archive-date-time-picker";

  return (
    <IonModal id="archive-modal" className="ion-padding full-screen" isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("archive")}</IonTitle>
          <IonButton size="small" fill="clear" slot="end" onClick={onClose}>
            {t("close")}
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem lines="none" className="ion-padding-bottom search-toolbar">
            <IonTitle>
              <h2>
                <IonInput
                  className="ion-text-center"
                  placeholder={t("search")}
                  value={searchQuery}
                  onIonChange={handleSearchChange}
                  maxlength={MAX_LABEL_LENGTH}
                />
              </h2>
              <IonDatetimeButton datetime={archiveDateTimePicker} />
            </IonTitle>
            <DatePickerModal
              max={moment().toISOString()}
              datetime={archiveDateTimePicker}
              value={selectedDate}
              onConfirm={handleDateChange}
            />
          </IonItem>
          {displayedArchive.length > 0 ? (
            displayedArchive.map((e, i) => (
              <IonItem key={i} lines="full" className="archive-table-item">
                <IonLabel className="archive-table-label">{e.label}</IonLabel>
                <IonLabel className="archive-table-date" slot="end" color="medium">
                  <h3>{moment(e.deadline).format("h:mm A")}</h3>
                </IonLabel>
                <IonChip className="archive-table-chip" slot="end">
                  {createChipText(e.points)}
                </IonChip>
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel>{t("no_records")}</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default ArchiveModal;
