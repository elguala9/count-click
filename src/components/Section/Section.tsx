import { IonCard, IonCardHeader } from '@ionic/react';
import React, { useState } from 'react';
import { OnChangeCounter } from '../../types/CounterType';
import { SectionCode } from '../../types/SectionType';
import CounterListModal from '../Counter/CounterListModal';

type SectionInput = {
  sectionCode: SectionCode,
  onChange: OnChangeCounter
  sectionTotal: number;
}

// A section that contain all the information about the counters and the actual counter
const Section: React.FC<SectionInput> = ({sectionCode, onChange, sectionTotal}) => {

  const [isOpen, setIsOpen ] = useState(false);

  return (
    <>
      <IonCard onClick={()=>setIsOpen(true)}>
        <IonCardHeader>
          Section Counter: {sectionTotal}
        </IonCardHeader>
      </IonCard>
      <CounterListModal sectionCode={sectionCode} onChange={onChange} isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
    </>
  );
};

export default Section;
