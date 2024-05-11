import { IonDatetime, IonModal } from "@ionic/react";
import getMaxDate from "../../../../utils/functions/get-max-date";
import moment from "moment";

interface DatePickerModalProps {
  curDate: moment.Moment;
  onConfirm: (date: moment.Moment) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ curDate, onConfirm }) => {
  return (
    <IonModal keepContentsMounted={true}>
      <IonDatetime
        display-format="DD/MM/YYYY"
        min={moment().toISOString()}
        max={getMaxDate()}
        presentation="date"
        id="datetime"
        onIonChange={(event) => onConfirm(moment(event.detail.value))}
      ></IonDatetime>
    </IonModal>
  );
};

export default DatePickerModal;
