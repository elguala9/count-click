import { InputChangeEventDetail, IonButton, IonContent, IonGrid, IonHeader, IonInput, IonModal, IonRow } from '@ionic/react';
import { IonInputCustomEvent } from '@ionic/core';
import React, { useCallback, useState } from 'react';
import { SectionCode } from '../../types/SectionType';
import { useCounterData } from '../../hooks/HooksData';
import { CounterStructure } from '../../types/DataType';
import { hashString } from '../../utility/HashUtility';
import { useCounterFunctions } from '../../hooks/HooksCounter';
import CreateCounterModalButton from '../Modal/GeneralModalButton';
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
