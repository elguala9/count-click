import React, { ReactElement, useEffect, useState } from 'react';
import { useSectionData } from '../../hooks/HooksData';
import { SectionCode } from '../../types/SectionType';
import { SectionStructure } from '../../types/DataType';
import { CounterHandlerInput_CounterParams } from '../Counter/CounterHandler';
import SectionHandler, { SectionHandlerInput } from './SectionHandler';

type SectionPageInput =  {
  sectionCode: SectionCode
}

// The componenet that retrive the section from the data
const SectionPage: React.FC<SectionPageInput> = ({sectionCode}) => {

  const [ sectionHandlersInput, setSectionHandlersInput ] = useState<ReactElement>();
  const  { retriveSection } = useSectionData();



  useEffect(()=>{
    retriveSection(sectionCode).then(({found, section})=>{
      if(found){
        const _sectionHandlerInput: SectionHandlerInput = {} as SectionHandlerInput;
        const _section: SectionStructure = section;
        while(_section != undefined){
          _sectionHandlerInput.onChange = undefined;
          //_sectionHandlerInput.counterInput = _section.counters;
        }
      }
    })
    

  }, [retriveSection, sectionCode])

  const obj: CounterHandlerInput_CounterParams = {
    counterCode: "xxx",
    counterLabel: "Ciao",
    counterValue: 10
  }

  return (
    <SectionHandler/>
  );
};

export default SectionPage;
