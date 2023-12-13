import React from 'react';
import { IonButton } from '@ionic/react';

type ButtonCounterInput = {
  onClick: React.MouseEventHandler<HTMLIonButtonElement>;
  label?: string;
}

// base nutton of the application that will be used to update a counter
const ButtonCounter: React.FC<ButtonCounterInput> = ({onClick, label}) => {
  return (
    <IonButton onClick={onClick}>
      {label}
    </IonButton>
  );
};

export default ButtonCounter;
