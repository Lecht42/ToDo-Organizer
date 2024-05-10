import {
  IonDatetime,
  IonModal,
} from "@ionic/react";
import getMaxDate from "../../../../utils/functions/get-max-date";

interface DatePickerModalProps {
  curDate: string
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({curDate}) => {
  return (
    <IonModal keepContentsMounted={true}>
      <IonDatetime
        preferWheel
        display-format="DD/MM/YYYY"
        min={curDate}
        max={getMaxDate()}
        presentation="date"
        id="datetime"
      ></IonDatetime>
    </IonModal>
  );
};

export default DatePickerModal;