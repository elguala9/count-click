import { IonGrid, IonLoading, IonRow } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useSection } from '../../hooks/HooksData';
import { OnChangeCounterinput, SectionCode } from '../../types/CounterType';
import { CounterHandlerInput_CounterParams } from '../Counter/CounterHandler';
import Section from './Section';
import { SectionStructure, Sections } from '../../types/DataType';



// A section that contain all the information about the counters and the actual counter
// The children can be another section. Usefull if we ahve counters nidificated
const SectionList: React.FC = () => {

  const [loadingRetriveSections, setLoadingRetriveSections] = useState<boolean>(true);
  const [ listSections, setListSection ] = useState<ReactElement[]>([])
  const { retriveSectionsArray } = useSection();

  useEffect(()=>{
    setLoadingRetriveSections(true);
    retriveSectionsArray().then((sections: SectionStructure[])=>{
      const _listSections: ReactElement[] = [];
      for(let i=0; i<sections.length; i++)
        _listSections.push(
            <IonRow>
              1111  
            </IonRow>
          )
      setListSection(_listSections);
    }).finally(()=>setLoadingRetriveSections(false))
  }, [retriveSectionsArray])

  if(loadingRetriveSections)
    return <IonLoading/>


  return (
    <IonGrid>
      {listSections}
    </IonGrid>

  );
};

export default SectionList;
