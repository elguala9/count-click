import { IonItem, IonLabel } from '@ionic/react';
import React from 'react';
import { useCounterClick } from '../../hooks/HooksCounter';
import { OnChangeCounter } from '../../types/CounterType';
import { CounterStructure } from '../../types/DataType';
import Counter from './Counter';

// I have created tese partial type becouse in this way they can be used in other components and also be expanded if necessary
export type CounterHandlerInput_CounterParams = CounterStructure;

export type CounterHandlerInput_OnChange = {
  onChange: OnChangeCounter;
}


type CounterHandlerInput = CounterHandlerInput_CounterParams & CounterHandlerInput_OnChange;

// The components that handle the single counter
const CounterHandler: React.FC<CounterHandlerInput> = ({counterCode, counterName, value, onChange}) => {

  const {count, onClick} = useCounterClick(counterCode, value, onChange);

  return (
    <Counter onClick={onClick}>
      <IonItem>
        <IonLabel>
          {counterName}
        </IonLabel>
        {count}
      </IonItem>
    </Counter>
  );
};

export default CounterHandler;
