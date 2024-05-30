import { IonModal, IonPicker, IonPickerColumn, IonPickerColumnOption } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import ConfirmButton from "../../../buttons/confirm-button/confirm-button";
import _ from "lodash";

interface AwardPickerModalProps {
  onConfirm: (points: number) => void;
  value: number;
  step?: number;
  max?: number;
  trigger: string;
}

export const AWARD_PICKER_MODAL_TRIGGER = "open-award-picker-list";

const PointsPickerModal: React.FC<AwardPickerModalProps> = ({
  value,
  onConfirm: onClick,
  step = 1,
  max = 10,
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

  return (
    <IonModal
      id="award-picker-modal"
      className="ion-padding sub-modal"
      trigger={trigger}
      ref={modal}
      keepContentsMounted
    >
      <IonPicker>
        <IonPickerColumn onIonChange={onChangeHandler} value={points}>
          {_.map(
            Array.from({ length: max }, (_, i) => i + 1 * step),
            (e, i) => (
              <IonPickerColumnOption key={i} value={e}>
                {e}
              </IonPickerColumnOption>
            )
          )}
        </IonPickerColumn>
      </IonPicker>
      <ConfirmButton onClick={onConfirmHandler} />
    </IonModal>
  );
};

export default PointsPickerModal;
