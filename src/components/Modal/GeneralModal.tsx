import { IonButton, IonHeader, IonModal } from '@ionic/react';
import React, { ReactElement } from 'react';

export type GeneralModalInput = {
  modalTitle: string;
  isOpen: boolean;
  onClose: ()=>void;
  children: ReactElement;
  onSubmitModal: ()=>void;
  buttonSubmitLabel: string;
  disabled? : boolean;
}

// Component in which we can create a new counter
const GeneralModal: React.FC<GeneralModalInput> = ({ isOpen, onClose, modalTitle, children, onSubmitModal, buttonSubmitLabel, disabled}) => {




  return (
    <IonModal isOpen={isOpen} onWillDismiss={onClose}>
      <IonHeader>
        {modalTitle}
      </IonHeader>
      {children}
      <IonButton onClick={onSubmitModal} disabled={disabled}>
        {buttonSubmitLabel}
      </IonButton>
    </IonModal>
  );
};

export default GeneralModal;
