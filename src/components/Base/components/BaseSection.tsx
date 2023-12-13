import { IonCard, IonCardHeader, IonGrid } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import BaseCounterHandler, { BaseCounterHandlerInput_CounterParams, BaseCounterHandlerInput_OnChange } from './BaseCounterHandler';
import './ExploreContainer.css';
import { OnChangeCounterinput } from '../../../types/CounterType';

type BaseSectionInput =  BaseCounterHandlerInput_OnChange & {
  counterInput: BaseCounterHandlerInput_CounterParams[];
}


const BaseSection: React.FC<BaseSectionInput> = ({counterInput, onChange}) => {

  const [baseCounterHandlers, setBaseCounterHandler] = useState<ReactElement<typeof BaseCounterHandler[]>>();
  const [counter, setCounter] = useState<ReactElement<typeof BaseCounterHandler[]>>();

  const _onChange = useCallback((input: OnChangeCounterinput)=>{
    onChange(input);
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

      </IonCardHeader>
      <IonGrid>
        {baseCounterHandlers}
      </IonGrid>
    </IonCard>

  );
};

export default BaseSection;
