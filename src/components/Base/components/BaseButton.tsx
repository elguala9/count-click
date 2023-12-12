import React from 'react';
import { IonButton } from '@ionic/react';

type BaseButtonInput = {
  onClick: React.MouseEventHandler<HTMLIonButtonElement>;
  label?: string;
}

const BaseButton: React.FC<BaseButtonInput> = ({onClick, label}) => {
  return (
    <IonButton onClick={onClick}>
      {label}
    </IonButton>
  );
};

export default BaseButton;
