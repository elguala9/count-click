import React from 'react';
import { useCounter } from './hooks';
import BaseCounter from './BaseCounter';
import './ExploreContainer.css';
import { IonItem, IonLabel } from '@ionic/react';
import { CounterCode, OnChangeCounter } from '../../../types/CounterType';

// I have created tese partial type becouse in this way they can be used in other components
export type BaseCounterHandlerInput_CounterParams = {
  counterValue: number;
  counterLabel: string;
  counterCode: CounterCode;
}

export type BaseCounterHandlerInput_OnChange = {
  onChange: OnChangeCounter;
}


type BaseCounterHandlerInput = BaseCounterHandlerInput_CounterParams & BaseCounterHandlerInput_OnChange;

// The components that handle the single counter
const BaseCounterHandler: React.FC<BaseCounterHandlerInput> = ({counterCode, counterLabel, counterValue, onChange}) => {

  const {count, onClick} = useCounter(counterCode, counterValue, onChange);

  return (
    <BaseCounter onClick={onClick}>
      <IonItem>
        <IonLabel>
          {counterLabel}
        </IonLabel>
        {count}
      </IonItem>
    </BaseCounter>
  );
};

export default BaseCounterHandler;
