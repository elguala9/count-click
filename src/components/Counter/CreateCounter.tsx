import { IonInputCustomEvent } from '@ionic/core';
import { InputChangeEventDetail, IonButton, IonContent, IonGrid, IonInput, IonRow } from '@ionic/react';
import React, { useCallback, useState } from 'react';
import { useCounterFunctions } from '../../hooks/HooksCounter';
import { CounterStructure } from '../../types/DataType';
import { SectionCode } from '../../types/SectionType';
import { hashString } from '../../utility/HashUtility';

export type CreateCounterModalInput = {
  sectionCode: SectionCode;
  onClose: ()=>void;
}

// Component in which we can create a new counter
const CreateCounterModal: React.FC<CreateCounterModalInput> = ({ sectionCode, onClose}) => {

  const [ counterName, setCounterName ] = useState("");
  const { createCounter } = useCounterFunctions();

  const onChangeCounterName = useCallback((event: IonInputCustomEvent<InputChangeEventDetail>)=>{
    setCounterName(String(event.target.value))
  }, []);

  const onClick = useCallback(async ()=> {
    const counterStructure: CounterStructure = {
      counterName,
      counterCode: await hashString(counterName),
      locked: false,
      value: 0
    } 
    createCounter(sectionCode, counterStructure)
    onClose();
  }, [counterName, createCounter, onClose, sectionCode])

  return (
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonInput label='Name' onIonChange={onChangeCounterName}/>
          </IonRow>
          <IonRow>
            <IonButton onClick={onClick}>
              Create Counter
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
  );
};

export default CreateCounterModal;
