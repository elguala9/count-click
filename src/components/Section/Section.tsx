import { IonCard, IonCardHeader, IonGrid } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import CounterHandler, { CounterHandlerInput_CounterParams, CounterHandlerInput_OnChange } from '../Counter/CounterHandler';
import { OnChangeCounterinput } from '../../types/CounterType';

type SectionInput =  CounterHandlerInput_OnChange & {
  counterInput: CounterHandlerInput_CounterParams[];
}

// A section that contain all the information about the counters and the actual counter
// The children can be another section. Usefull if we ahve counters nidificated
const Section: React.FC<SectionInput> = ({counterInput, onChange}) => {

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
  }, [_onChange, counterInput, setCounterHandler]);

  return (
    <IonCard>
      <IonCardHeader>
        Counter: {counter}
      </IonCardHeader>
      <IonGrid>
        {baseCounterHandlers}
      </IonGrid>
    </IonCard>

  );
};

export default Section;
