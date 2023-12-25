import { IonCard, IonCardHeader, IonGrid } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { OnChangeCounter, OnChangeCounterinput } from '../../types/CounterType';
import CounterHandler, { CounterHandlerInput_CounterParams } from '../Counter/CounterHandler';

type SectionInput = {
  counterInput: CounterHandlerInput_CounterParams[],
  onChange: OnChangeCounter
}

// A section that contain all the information about the counters and the actual counter
const Section: React.FC<SectionInput> = ({counterInput, onChange}) => {

  const [baseCounterHandlers, setCounterHandler] = useState<ReactElement<typeof CounterHandler[]>>();
  const [counter, setCounter] = useState<number>();

  const _onChange = useCallback((input: OnChangeCounterinput)=>{
    onChange(input);
    setCounter(input.newValue);
  }, [onChange])

  useEffect(()=>{
    console.log("loop 2");
    const _baseCounterHandlers: ReactElement[] = [];
    for(let i=0; i < counterInput.length; i++)
      _baseCounterHandlers.push(
        <CounterHandler 
          counterCode={counterInput[i].counterCode}
          /*counterLabel={counterInput[i].counterLabel}
          counterValue={counterInput[i].counterValue} */
          onChange={_onChange}
          key={i} counterName={''} value={0} locked={false}/>
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
