import React from 'react';
import Counter from './Counter';
import { IonItem, IonLabel } from '@ionic/react';
import { CounterCode, OnChangeCounter } from '../../types/CounterType';
import { useCounterClick } from '../../hooks/HooksCounter';

// I have created tese partial type becouse in this way they can be used in other components
export type CounterHandlerInput_CounterParams = {
  counterValue: number;
  counterLabel: string;
  counterCode: CounterCode;
}

export type CounterHandlerInput_OnChange = {
  onChange: OnChangeCounter;
}


type CounterHandlerInput = CounterHandlerInput_CounterParams & CounterHandlerInput_OnChange;

// The components that handle the single counter
const CounterHandler: React.FC<CounterHandlerInput> = ({counterCode, counterLabel, counterValue, onChange}) => {

  const {count, onClick} = useCounterClick(counterCode, counterValue, onChange);

  return (
    <Counter onClick={onClick}>
      <IonItem>
        <IonLabel>
          {counterLabel}
        </IonLabel>
        {count}
      </IonItem>
    </Counter>
  );
};

export default CounterHandler;
