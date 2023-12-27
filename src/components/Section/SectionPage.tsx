import React, { useEffect, useState } from 'react';
import { useSectionData } from '../../hooks/HooksData';
import { SectionStructure } from '../../types/DataType';
import { SectionCode } from '../../types/SectionType';
import SectionHandler, { SectionHandlerInput } from './SectionHandler';

type SectionPageInput =  {
  sectionCode: SectionCode
}

// The componenet that retrive the section from the data
const SectionPage: React.FC<SectionPageInput> = ({sectionCode}) => {

  const [ sectionHandlersInput, setSectionHandlersInput ] = useState<SectionHandlerInput>({ sectionCode } as SectionHandlerInput);
  const  { retriveSection } = useSectionData();

  useEffect(()=>{
    console.log("loop");
    retriveSection(sectionCode).then(({found, section})=>{
      if(found){
        // TO FIX: this function (getCompleteSection) goes in loop
        //getCompleteSection(section).then((res)=>console.log("section" + res));
        const _sectionHandlerInput: SectionHandlerInput = { sectionCode } as SectionHandlerInput;
        const _section: SectionStructure = section;
        /*while(_section != undefined){
          _sectionHandlerInput.onChange = undefined;
          _sectionHandlerInput.sectionHandlerInput
          //{_sectionHandlerInput.counterInput, }  = _section.counters;
        }*/
        setSectionHandlersInput(_sectionHandlerInput);
      }
    })
    

  }, [retriveSection, sectionCode])

  return (
    <>
      <SectionHandler {...sectionHandlersInput}/>
      
    </>
    
  );
};

export default SectionPage;
