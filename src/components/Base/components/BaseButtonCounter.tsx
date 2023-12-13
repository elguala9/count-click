import React from 'react';
import { IonButton } from '@ionic/react';

type BaseButtonCounterInput = {
  onClick: React.MouseEventHandler<HTMLIonButtonElement>;
  label?: string;
}

// base nutton of the application that will be used to update a counter
const BaseButtonCounter: React.FC<BaseButtonCounterInput> = ({onClick, label}) => {
  return (
    <IonButton onClick={onClick}>
      {label}
    </IonButton>
  );
};

export default BaseButtonCounter;
