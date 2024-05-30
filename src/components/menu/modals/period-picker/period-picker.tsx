import { IonModal, IonPicker, IonPickerColumn, IonPickerColumnOption } from "@ionic/react";
import { useRef, useState, useEffect } from "react";
import MomentRecurrenceOption from "../../../../utils/enums/moment-recurrence-option";
import IPeriod from "../../../../utils/interfaces/period";
import ConfirmButton from "../../../buttons/confirm-button/confirm-button";
import { t } from "i18next";

export const PERIOD_PICKER_MODAL_TRIGGER = "open-period-picker";

interface PeriodPickerModalProps {
  onClick: (period?: IPeriod) => void;
  value?: IPeriod;
}

const PeriodPickerModal: React.FC<PeriodPickerModalProps> = ({ onClick, value }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [periodType, setPeriodType] = useState<MomentRecurrenceOption | undefined>(value?.type);
  const [periodValue, setPeriodValue] = useState<number | undefined>(value?.value);

  useEffect(() => {
    if (value) {
      setPeriodType(value.type);
      setPeriodValue(value.value);
    }
  }, [value]);

  const onConfirmHandler = () => {
    if (periodType && periodValue !== undefined) {
      onClick({ type: periodType, value: periodValue });
    } else {
      onClick(undefined);
    }
    modal.current?.dismiss();
  };

  const onChangeTypeHandler = (event: CustomEvent) => {
    setPeriodType(event.detail.value as MomentRecurrenceOption);
  };

  const onChangeValueHandler = (event: CustomEvent) => {
    setPeriodValue(parseInt(event.detail.value, 10));
  };

  const periodRecurrenceOptions: MomentRecurrenceOption[] = [t("days"), t("weeks"), t("months")];

  return (
    <IonModal
      id="period-picker-modal"
      className="ion-padding sub-modal"
      trigger={PERIOD_PICKER_MODAL_TRIGGER}
      ref={modal}
      keepContentsMounted
    >
      <IonPicker>
        <IonPickerColumn value={periodValue?.toString()} onIonChange={onChangeValueHandler}>
          <div slot="prefix">{t("every")}</div>
          {Array.from({ length: 3 }, (_, i) => i + 1).map((number, index) => (
            <IonPickerColumnOption key={index} value={number.toString()}>
              {number}
            </IonPickerColumnOption>
          ))}
        </IonPickerColumn>
        <IonPickerColumn value={periodType} onIonChange={onChangeTypeHandler}>
          {periodRecurrenceOptions.map((option, index) => (
            <IonPickerColumnOption className="ion-text-left" key={index} value={option}>
              {option}
            </IonPickerColumnOption>
          ))}
        </IonPickerColumn>
      </IonPicker>
      <ConfirmButton onClick={onConfirmHandler} />
    </IonModal>
  );
};

export default PeriodPickerModal;
