import { IonButton, IonCol, IonGrid, IonHeader, IonModal, IonRow } from '@ionic/react';
import React from 'react';

export type ConfirmModalInput = {
  label: string;
  isOpen: boolean;
  onConfirm: ()=>void;
  onCancel: ()=>void;
}

// Modal with two button that can be used to confirm
const ConfirmModal: React.FC<ConfirmModalInput> = ({ isOpen, label, onCancel, onConfirm}) => {

  return (
    <IonModal isOpen={isOpen} onWillDismiss={onCancel}>
      <IonHeader>
        {label}
      </IonHeader>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonButton color={'success'} onClick={onConfirm}>
              Confirm
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton color={'danger'} onClick={onCancel}>
              Cancel
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonModal>
  );
};

export default ConfirmModal;
