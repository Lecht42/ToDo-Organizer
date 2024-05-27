import { IonDatetime, IonModal } from "@ionic/react";
import moment from "moment";

interface DatePickerModalProps {
  min?: string;
  max?: string;
  datetime?: string;
  presentation?: string;
  presentingElement?: HTMLElement | null; // Ensure it can accept null
  value: moment.Moment;
  onConfirm: (date: moment.Moment) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  value,
  onConfirm,
  min,
  max,
  presentingElement,
  presentation = "date",
  datetime: trigger = "datetime",
}) => {
  console.log(presentingElement);
  return (
    <IonModal keepContentsMounted presentingElement={presentingElement || undefined}>
      <IonDatetime
        preferWheel
        min={min}
        max={max}
        presentation={presentation as any}
        id={trigger}
        value={value.toISOString(true)}
        onIonChange={(event) => onConfirm(moment(event.detail.value, moment.ISO_8601))}
      />
    </IonModal>
  );
};

export default DatePickerModal;
