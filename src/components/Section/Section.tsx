import { IonCard, IonCardHeader, IonGrid } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { OnChangeCounter, OnChangeCounterinput } from '../../types/CounterType';
import CounterHandler, { CounterHandlerInput_CounterParams } from '../Counter/CounterHandler';
import CounterListModal from '../Counter/CounterListModal';
import { SectionCode } from '../../types/SectionType';

type SectionInput = {
  sectionCode: SectionCode,
  onChange: OnChangeCounter
}

// A section that contain all the information about the counters and the actual counter
const Section: React.FC<SectionInput> = ({sectionCode, onChange}) => {

  const [baseCounterHandlers, setCounterHandler] = useState<ReactElement<typeof CounterHandler[]>>();
  const [counter, setCounter] = useState<number>();
  const [isOpen, setIsOpen ] = useState(false);

  return (
    <>
      <IonCard onClick={()=>setIsOpen(true)}>
        <IonCardHeader>
          Section Counter: {counter}
        </IonCardHeader>
      </IonCard>
      <CounterListModal sectionCode={sectionCode} onChange={onChange} isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
    </>
  );
};

export default Section;
