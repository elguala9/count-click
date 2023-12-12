import React from 'react';
import { useCounter } from '../hooks';
import BaseCounter from './BaseCounter';
import './ExploreContainer.css';
import { IonItem, IonLabel } from '@ionic/react';

type BaseCounterHandlerInput = {
  onChange: (newValue: number, change: number)=>void;
  counterValue: number;
  counterLabel: string;
  counterCode:string;
}

const BaseCounterHandler: React.FC<BaseCounterHandlerInput> = ({counterCode, counterLabel, counterValue, onChange}) => {

  const {count, onClick} = useCounter(counterValue, onChange);


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
