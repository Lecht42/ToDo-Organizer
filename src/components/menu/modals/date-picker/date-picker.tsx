import { IonDatetime, IonModal } from "@ionic/react";
import moment from "moment";
import ConfirmButton from "../../../buttons/confirm-button/confirm-button";
import { useRef } from "react";

interface DatePickerModalProps {
  min?: string;
  max?: string;
  datetime?: string;
  presentation?: string;
  presentingElement?: HTMLElement | null;
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
  const modal = useRef<HTMLIonModalElement>(null);

  const handleConfirmClick = () => {
    onConfirm(value);
    modal.current?.dismiss();
  };

  return (
    <IonModal keepContentsMounted className="sub-modal ion-padding" ref={modal} presentingElement={presentingElement || undefined}>
      <IonDatetime
        preferWheel
        min={min}
        max={max}
        presentation={presentation as any}
        id={trigger}
        value={value.toISOString(true)}
        onIonChange={(event) => onConfirm(moment(event.detail.value, moment.ISO_8601))}
      />
      <ConfirmButton onClick={handleConfirmClick} />
    </IonModal>
  );
};

export default DatePickerModal;
