import {
  IonDatetime,
  IonModal,
} from "@ionic/react";
import getMaxDate from "../../../../utils/functions/get-max-date";
import getTodayISODate from "../../../../utils/functions/get-today-iso-date";


const DatePickerModal: React.FC = () => {
  return (
    <IonModal keepContentsMounted={true}>
      <IonDatetime
        preferWheel
        display-format="DD/MM/YYYY"
        min={getTodayISODate()}
        max={getMaxDate()}
        presentation="date"
        id="datetime"
      ></IonDatetime>
    </IonModal>
  );
};

export default DatePickerModal;