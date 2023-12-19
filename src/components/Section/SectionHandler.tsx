import React, { Children, ReactElement, useCallback, useEffect, useState } from 'react';
import { OnChangeCounter, OnChangeCounterinput, SectionCode } from '../../types/CounterType';
import { CounterHandlerInput_CounterParams, CounterHandlerInput_OnChange } from '../Counter/CounterHandler';
import Section from './Section';

export type SectionHandlerInput =  {
  onChange?: OnChangeCounter;
  counterInput?: CounterHandlerInput_CounterParams[],
  sectionHandlerInput?: SectionHandlerInput;
}

// A section that contain all the information about the counters and the actual counter
// The children can be another section. Usefull if we ahve counters nidificated
const SectionHandler: React.FC<SectionHandlerInput> = ({onChange, counterInput, sectionHandlerInput}) => {

  const [totalCount, setTotalCount] = useState<number>(0);
  const [ subSection, setSubSection ] = useState<ReactElement>();
  //const { countCodes, loadingRetriveSection} = useRetiveSection(sectionCode);

  const _onChange = useCallback((input: OnChangeCounterinput)=>{
    setTotalCount((totalCount)=>totalCount+input.change)
    if(onChange !== undefined)
      onChange(input);
  }, [onChange])

  useEffect(()=>{
    if(sectionHandlerInput !== undefined)
      setSubSection(
        <SectionHandler onChange={_onChange} counterInput={sectionHandlerInput.counterInput} sectionHandlerInput={sectionHandlerInput.sectionHandlerInput}/>
        );
  }, [_onChange, sectionHandlerInput])

  /*if(loadingRetriveSection)
    return <IonLoading/>*/

  const obj: CounterHandlerInput_CounterParams = {
    counterCode: "xxx",
    counterLabel: "Ciao",
    counterValue: 10
  }

  return (
    <>
      <Section onChange={_onChange} 
      counterInput={counterInput ?? []}/>
      {subSection}
    </>
  );
};

export default SectionHandler;
