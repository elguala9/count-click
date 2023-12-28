import { IonInputCustomEvent } from '@ionic/core';
import { InputChangeEventDetail, IonContent, IonGrid, IonInput, IonRow } from '@ionic/react';
import React, { useCallback, useState } from 'react';
import { useCounterFunctions } from '../../hooks/HooksCounter';
import { CounterStructure } from '../../types/DataType';
import { SectionCode } from '../../types/SectionType';
import { hashString } from '../../utility/HashUtility';
import GeneralModalButton from '../Modal/GeneralModalButton';

export type CreateCounterModalInput = {
  sectionCode: SectionCode;
}

// Component in which we can create a new counter
const CreateCounterModal: React.FC<CreateCounterModalInput> = ({ sectionCode}) => {

  const [ counterName, setCounterName ] = useState("");
  const { createCounter } = useCounterFunctions();

  const onChangeCounterName = useCallback((event: IonInputCustomEvent<InputChangeEventDetail>)=>{
    setCounterName(String(event.target.value))
  }, []);

  const onSubmitModal = useCallback(async ()=> {
    const counterStructure: CounterStructure = {
      counterName,
      counterCode: await hashString(counterName),
      locked: false,
      value: 0
    } 
    createCounter(sectionCode, counterStructure)
  }, [counterName, createCounter, sectionCode])

  return (
    <GeneralModalButton modalTitle={'Create a Counter'} buttonLabel={"Create Counter Modal"} onSubmitModal={onSubmitModal} buttonSubmitLabel={"Create Counter"}>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonInput label='Name' onIonChange={onChangeCounterName}/>
          </IonRow>
        </IonGrid>
      </IonContent>
    </GeneralModalButton>
  );
};

export default CreateCounterModal;
