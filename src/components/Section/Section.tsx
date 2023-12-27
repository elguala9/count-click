import { IonCard, IonCardHeader, IonGrid } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { OnChangeCounter, OnChangeCounterinput } from '../../types/CounterType';
import CounterHandler, { CounterHandlerInput_CounterParams } from '../Counter/CounterHandler';
import CounterListModal from '../Counter/CounterListModal';
import { SectionCode } from '../../types/SectionType';
import { useSectionTotal } from '../../hooks/HooksSection';

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
