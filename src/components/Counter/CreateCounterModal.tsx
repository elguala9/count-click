import { IonContent, IonGrid, IonHeader, IonInput, IonModal, IonRow } from '@ionic/react';
import React from 'react';
import { SectionCode } from '../../types/SectionType';

export type CreateCounterModalInput = {
  sectionCode: SectionCode;
  isOpen: boolean;
  onClose: ()=>void;
}

// Component in which we can create a new counter
const CreateCounterModal: React.FC<CreateCounterModalInput> = ({ isOpen, sectionCode, onClose}) => {



  return (
    <IonModal isOpen={isOpen} onWillDismiss={onClose}>
      <IonHeader>
        Insert Counter
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonInput label='Name'/>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default CreateCounterModal;
