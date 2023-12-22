import React, { ReactElement, useEffect, useState } from 'react';
import { useSectionData } from '../../hooks/HooksData';
import { SectionCode } from '../../types/SectionType';
import { SectionStructure } from '../../types/DataType';
import { CounterHandlerInput_CounterParams } from '../Counter/CounterHandler';
import SectionHandler, { SectionHandlerInput } from './SectionHandler';
import { useCounterFunctions } from '../../hooks/HooksCounter';
import { useSectionFunctions } from '../../hooks/HooksSection';

type SectionPageInput =  {
  sectionCode: SectionCode
}

// The componenet that retrive the section from the data
const SectionPage: React.FC<SectionPageInput> = ({sectionCode}) => {

  const [ sectionHandlersInput, setSectionHandlersInput ] = useState<SectionHandlerInput>();
  const  { retriveSection } = useSectionData();
  const { getTotalFromCounters} = useCounterFunctions();
  const { getCompleteSection } = useSectionFunctions();

  useEffect(()=>{
    
    retriveSection(sectionCode).then(({found, section})=>{
      if(found){
        getCompleteSection(section).then((res)=>console.log("section" + res));
        const _sectionHandlerInput: SectionHandlerInput = {} as SectionHandlerInput;
        const _section: SectionStructure = section;
        while(_section != undefined){
          _sectionHandlerInput.onChange = undefined;
          _sectionHandlerInput.sectionHandlerInput
          //{_sectionHandlerInput.counterInput, }  = _section.counters;
        }
        setSectionHandlersInput(_sectionHandlerInput);
      }
    })
    

  }, [retriveSection, sectionCode])

  return (
    <></>
    //<SectionHandler sectionHandlerInput={sectionHandlersInput}/>
  );
};

export default SectionPage;
