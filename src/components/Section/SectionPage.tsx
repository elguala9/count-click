import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { OnChangeCounter, OnChangeCounterinput, SectionCode } from '../../types/CounterType';
import { CounterHandlerInput_CounterParams, CounterHandlerInput_OnChange } from '../Counter/CounterHandler';
import Section from './Section';
import { useSection } from '../../hooks/HooksData';
import { SectionStructure } from '../../types/DataType';
import SectionHandler, { SectionHandlerInput } from './SectionHandler';

type SectionPageInput =  {
  sectionCode: SectionCode
}

// A section that contain all the information about the counters and the actual counter
// The children can be another section. Usefull if we have counters nidificated
const SectionPage: React.FC<SectionPageInput> = ({sectionCode}) => {

  const [ sectionHandlersInput, setSectionHandlersInput ] = useState<ReactElement>();
  const  { retriveSection } = useSection();



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
    

  }, [])

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
