import { IonCol, IonGrid, IonItem, IonLabel, IonRow } from '@ionic/react';
import React from 'react';
import { useCounterClick } from '../../hooks/HooksCounter';
import { OnChangeCounter } from '../../types/CounterType';
import { CounterStructure, SectionStructure } from '../../types/DataType';
import Counter from './Counter';
import DeleteCounterButton from './DeleteCounterButton';
import { SectionCode } from '../../types/SectionType';

type CounterHandlerInput = CounterStructure & {
  onChange: OnChangeCounter;
  sectionStructure: SectionStructure;
};

// The components that handle the single counter
const CounterHandler: React.FC<CounterHandlerInput> = ({counterCode, counterName, value, onChange, sectionStructure}) => {

  const {count, onClick} = useCounterClick(counterCode, value, onChange);

  return (
    <IonRow>
      <IonCol>
        <Counter onClick={onClick}>
          <IonGrid>
            <IonRow>
              <IonCol>
                {counterName}
              </IonCol>
              <IonCol>
                {count}
              </IonCol>
            </IonRow>
          </IonGrid>
        </Counter>
      </IonCol>
      <IonCol size='xs'>
        <DeleteCounterButton counterCode={counterCode} sectionStructure={sectionStructure}/>
      </IonCol>
    </IonRow>
    
  );
};

export default CounterHandler;
