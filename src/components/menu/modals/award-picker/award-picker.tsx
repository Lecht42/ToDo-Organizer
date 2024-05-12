import { IonButton, IonModal, IonPicker, IonPickerColumn, IonPickerColumnOption } from "@ionic/react";
import { DEFAULT_POINTS_SYMBOL } from "../../../../utils/functions/create-chip-text";
import { useEffect, useRef, useState } from "react";

interface AwardPickerModalProps {
  onClick: (points: number) => void;
  value: number;
  step?: number;
  maxValue?: number;
  trigger: string;
}

export const AWARD_PICKER_MODAL_TRIGGER = "open-award-picker-list";

const AwardPickerModal: React.FC<AwardPickerModalProps> = ({
  value,
  onClick,
  step = 1,
  maxValue = 10,
  trigger,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [points, setPoints] = useState<number>(value);

  useEffect(() => {
    setPoints(value);
  }, [value]);

  const onConfirmHandler = () => {
    onClick(points);
    modal.current?.dismiss();
  };

  const onChangeHandler = (event: CustomEvent) => {
    setPoints(event.detail.value);
  };

  const optionsCount = Math.ceil((maxValue - 1) / step) + 1;
  const options = Array.from({ length: optionsCount }, (_, i) => i * step);

  return (
    <IonModal
      id="award-picker-modal"
      className="ion-padding"
      trigger={trigger}
      ref={modal}
      keepContentsMounted
    >
      <IonPicker onIonChange={onChangeHandler}>
        <IonPickerColumn value={points} step={step} maxValue={maxValue}>
          {options.map((e, i) => (
            <IonPickerColumnOption key={i} value={e}>
              {e}
            </IonPickerColumnOption>
          ))}
        </IonPickerColumn>
      </IonPicker>
      <IonButton className="ion-margin" size="large" shape="round" onClick={onConfirmHandler}>
        Confirm
      </IonButton>
    </IonModal>
  );
};

export default AwardPickerModal;
