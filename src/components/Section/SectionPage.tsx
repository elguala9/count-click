import React, { useEffect, useState } from 'react';
import { useSectionData } from '../../hooks/HooksData';
import { SectionCode } from '../../types/SectionType';
import SectionHandler, { SectionHandlerInput } from './SectionHandler';
import { IonGrid } from '@ionic/react';

type SectionPageInput =  {
  sectionCode: SectionCode
}

// The componenet that retrieve the section from the data
const SectionPage: React.FC<SectionPageInput> = ({sectionCode}) => {

  const [ sectionHandlersInput, setSectionHandlersInput ] = useState<SectionHandlerInput>({ sectionCode } as SectionHandlerInput);
  const  { retrieveSection } = useSectionData();

  useEffect(()=>{
    retrieveSection(sectionCode).then(({found})=>{
      if(found){
        const _sectionHandlerInput: SectionHandlerInput = { sectionCode } as SectionHandlerInput;
        setSectionHandlersInput(_sectionHandlerInput);
      }
    })
    

  }, [retrieveSection, sectionCode])

  return (
    <IonGrid fixed={true}>
      <SectionHandler {...sectionHandlersInput}/>
    </IonGrid>
  );
};

export default SectionPage;
