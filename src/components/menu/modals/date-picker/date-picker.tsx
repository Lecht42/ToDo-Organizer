import { IonDatetime, IonModal } from "@ionic/react";
import getMaxDate from "../../../../utils/functions/get-max-date";
import moment from "moment";

interface DatePickerModalProps {
  min?: string;
  max?: string;
  datetime?: string;
  value: moment.Moment;
  onConfirm: (date: moment.Moment) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ value, onConfirm, min, max, datetime: trigger = "datetime" }) => {
  return (
    <IonModal keepContentsMounted={true}>
      <IonDatetime
        preferWheel
        display-format="DD/MM/YYYY"
        min={min}
        max={max}
        presentation="date"
        id={trigger}
        value={value.toISOString()}
        onIonChange={(event) => onConfirm(moment(event.detail.value))}
      />
    </IonModal>
  );
};

export default DatePickerModal;
