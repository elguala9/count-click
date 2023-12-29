import { IonCard, IonCardHeader, IonCol, IonGrid, IonModal, IonRow } from '@ionic/react';
import React, { ReactElement, useState } from 'react';
import { OnChangeCounter } from '../../types/CounterType';
import { SectionCode } from '../../types/SectionType';
import CounterListModal from '../Counter/CounterListModal';
import CounterList from '../Counter/CounterList';

type SectionInput = {
  sectionCode: SectionCode,
  sectionName: string,
  onChange: OnChangeCounter
  sectionTotal: number;
  children: ReactElement;
}

// A section that contain all the information about the counters and the actual counter
const Section: React.FC<SectionInput> = ({sectionCode, onChange, sectionTotal, sectionName, children}) => {

  const [isOpen, setIsOpen ] = useState(false);

  return (
    <>
      <IonCard onClick={()=>setIsOpen(true)}>
        <IonCardHeader>
          <IonGrid>
            <IonRow>
              <IonCol>{sectionName}</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>{sectionTotal}</IonCol>
            </IonRow>
          </IonGrid>
        </IonCardHeader>
      </IonCard>
      <IonModal isOpen={isOpen} onWillDismiss={()=>setIsOpen(false)}>
        <CounterList sectionCode={sectionCode} onChange={onChange}/>
        {children}
      </IonModal>
    </>
  );
};

export default Section;
