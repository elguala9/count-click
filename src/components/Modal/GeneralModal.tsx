import { InputChangeEventDetail, IonButton, IonContent, IonGrid, IonHeader, IonInput, IonModal, IonRow } from '@ionic/react';
import { IonInputCustomEvent } from '@ionic/core';
import React, { ReactElement, useCallback, useState } from 'react';
import { SectionCode } from '../../types/SectionType';
import { useCounterData } from '../../hooks/HooksData';
import { CounterStructure } from '../../types/DataType';
import { hashString } from '../../utility/HashUtility';
import { useCounterFunctions } from '../../hooks/HooksCounter';

export type GeneralModalInput = {
  modalTitle: string;
  isOpen: boolean;
  onClose: ()=>void;
  children: ReactElement;
  onSubmitModal: ()=>void;
  buttonSubmitLabel: string;
}

// Component in which we can create a new counter
const GeneralModal: React.FC<GeneralModalInput> = ({ isOpen, onClose, modalTitle, children, onSubmitModal, buttonSubmitLabel}) => {




  return (
    <IonModal isOpen={isOpen} onWillDismiss={onClose}>
      <IonHeader>
        {modalTitle}
      </IonHeader>
      {children}
      <IonButton onClick={onSubmitModal}>
        {buttonSubmitLabel}
      </IonButton>
    </IonModal>
  );
};

export default GeneralModal;
