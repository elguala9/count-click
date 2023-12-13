import { IonCard, IonCardHeader, IonGrid } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import BaseCounterHandler, { BaseCounterHandlerInput_CounterParams, BaseCounterHandlerInput_OnChange } from './BaseCounterHandler';
import './ExploreContainer.css';
import { OnChangeCounterinput } from '../../../types/CounterType';

type BaseSectionInput =  BaseCounterHandlerInput_OnChange & {
  counterInput: BaseCounterHandlerInput_CounterParams[];
  children?: ReactElement;
}

// A section that contain all the information about the counters and the actual counter
// The children can be another section. Usefull if we ahve counters nidificated
const BaseSection: React.FC<BaseSectionInput> = ({counterInput, onChange, children}) => {

  const [baseCounterHandlers, setBaseCounterHandler] = useState<ReactElement<typeof BaseCounterHandler[]>>();
  const [counter, setCounter] = useState<number>();

  const _onChange = useCallback((input: OnChangeCounterinput)=>{
    onChange(input);
    setCounter(input.newValue);
  }, [])

  useEffect(()=>{
    const _baseCounterHandlers: ReactElement[] = [];
    for(let i=0; i < counterInput.length; i++)
      _baseCounterHandlers.push(
        <BaseCounterHandler 
          counterCode={counterInput[i].counterCode} 
          counterLabel={counterInput[i].counterLabel} 
          counterValue={counterInput[i].counterValue} 
          onChange={_onChange}
          key={i}/>
        );
      
    setBaseCounterHandler(
      <>
        {_baseCounterHandlers}
      </>);
  }, [setBaseCounterHandler]);

  return (
    <IonCard>
      <IonCardHeader>
        Conter: {counter}
      </IonCardHeader>
      <IonGrid>
        {baseCounterHandlers}
      </IonGrid>
      {children}
    </IonCard>

  );
};

export default BaseSection;
