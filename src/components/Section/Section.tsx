import { IonCard, IonCardHeader, IonGrid } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import CounterHandler, { CounterHandlerInput_CounterParams, CounterHandlerInput_OnChange } from '../Counter/CounterHandler';
import './ExploreContainer.css';
import { OnChangeCounterinput } from '../../types/CounterType';

type SectionInput =  CounterHandlerInput_OnChange & {
  counterInput: CounterHandlerInput_CounterParams[];
  children?: ReactElement;
}

// A section that contain all the information about the counters and the actual counter
// The children can be another section. Usefull if we ahve counters nidificated
const Section: React.FC<SectionInput> = ({counterInput, onChange, children}) => {

  const [baseCounterHandlers, setCounterHandler] = useState<ReactElement<typeof CounterHandler[]>>();
  const [counter, setCounter] = useState<number>();

  const _onChange = useCallback((input: OnChangeCounterinput)=>{
    onChange(input);
    setCounter(input.newValue);
  }, [])

  useEffect(()=>{
    const _baseCounterHandlers: ReactElement[] = [];
    for(let i=0; i < counterInput.length; i++)
      _baseCounterHandlers.push(
        <CounterHandler 
          counterCode={counterInput[i].counterCode} 
          counterLabel={counterInput[i].counterLabel} 
          counterValue={counterInput[i].counterValue} 
          onChange={_onChange}
          key={i}/>
        );
      
    setCounterHandler(
      <>
        {_baseCounterHandlers}
      </>);
  }, [setCounterHandler]);

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

export default Section;
