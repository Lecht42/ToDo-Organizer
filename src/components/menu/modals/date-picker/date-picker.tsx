import { IonDatetime, IonModal } from "@ionic/react";
import getMaxDate from "../../../../utils/functions/get-max-date";
import moment from "moment";

interface DatePickerModalProps {
  value: moment.Moment;
  onConfirm: (date: moment.Moment) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ value, onConfirm }) => {
  return (
    <IonModal keepContentsMounted={true}>
      <IonDatetime
        preferWheel
        display-format="DD/MM/YYYY"
        min={moment().toISOString()}
        max={getMaxDate()}
        presentation="date"
        id="datetime"
        value={value.toISOString()}
        onIonChange={(event) => onConfirm(moment(event.detail.value))}
      ></IonDatetime>
    </IonModal>
  );
};

export default DatePickerModal;
