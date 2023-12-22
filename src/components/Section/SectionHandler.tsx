import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { OnChangeCounter, OnChangeCounterinput } from '../../types/CounterType';
import { CounterHandlerInput_CounterParams } from '../Counter/CounterHandler';
import Section from './Section';

export type SectionHandlerInput =  {
  onChange?: OnChangeCounter;
  counterInput?: CounterHandlerInput_CounterParams[],
  sectionHandlerInput?: SectionHandlerInput;
}

// An handler of the section. It handle the total counnter and the evetnual subsection
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
  return (
    <>
      <Section onChange={_onChange} 
      counterInput={counterInput ?? []}/>
      {subSection}
    </>
  );
};

export default SectionHandler;
