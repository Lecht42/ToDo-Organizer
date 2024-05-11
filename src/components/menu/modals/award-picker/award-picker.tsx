import {
  IonButton,
  IonModal,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
} from "@ionic/react";
import { DEFAULT_POINTS_SYMBOL } from "../../../../utils/functions/create-chip-text";
import { useRef, useState } from "react";

const MAX_AWARD_PICKED_VALUE = 10;
export const AWARD_PICKER_MODAL_TRIGGER = "open-award-picker";

interface AwardPickerModalProps {
  onClick: (points: number) => void;
  value: number;
}

const AwardPickerModal: React.FC<AwardPickerModalProps> = ({
  value,
  onClick,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [points, setPoints] = useState<number>(value);

  const onConfirmHandler = () => {
    onClick(points);
    modal.current?.dismiss();
  };

  const onChangeHandler = (event: any) => {
    setPoints(event.detail.value);
  };

  return (
    <IonModal
      id="award-picker-modal"
      className="ion-padding"
      trigger={AWARD_PICKER_MODAL_TRIGGER}
      ref={modal}
      keepContentsMounted
    >
      <IonPicker onIonChange={onChangeHandler}> 
        <IonPickerColumn value={value}>
          <div slot="prefix">+</div>
          {Array.from(Array(MAX_AWARD_PICKED_VALUE).keys()).map((i) => (
            <IonPickerColumnOption key={i} value={i + 1}>
              {i + 1}
            </IonPickerColumnOption>
          ))}
          <div slot="suffix">{DEFAULT_POINTS_SYMBOL}</div>
        </IonPickerColumn>
      </IonPicker>
      <IonButton className="ion-margin" size="large" shape="round" onClick={onConfirmHandler}>Confirm</IonButton>
    </IonModal>
  );
};

export default AwardPickerModal;
