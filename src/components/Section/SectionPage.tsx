import React, { useEffect, useState } from 'react';
import { useSectionData } from '../../hooks/HooksData';
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
    retriveSection(sectionCode).then(({found})=>{
      if(found){
        const _sectionHandlerInput: SectionHandlerInput = { sectionCode } as SectionHandlerInput;
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
