import React from 'react';
import { IonButton } from '@ionic/react';

type BaseButtonCounterInput = {
  onClick: React.MouseEventHandler<HTMLIonButtonElement>;
  label?: string;
}

const BaseButtonCounter: React.FC<BaseButtonCounterInput> = ({onClick, label}) => {
  return (
    <IonButton onClick={onClick}>
      {label}
    </IonButton>
  );
};

export default BaseButtonCounter;
