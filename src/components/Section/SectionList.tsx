import { IonGrid, IonLoading, IonRow } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useSectionData } from '../../hooks/HooksData';
import { SectionStructure } from '../../types/DataType';
import SectionBox from './SectionBox';
import { OnSelectSection } from '../../types/SectionType';
import { useHistory } from 'react-router';

export type SectionListInput = {
  onSelect?: OnSelectSection;
}

// A list of all the sections
const SectionList: React.FC<SectionListInput> = () => {

  const [loadingRetriveSections, setLoadingRetriveSections] = useState<boolean>(true);
  const [ listSections, setListSection ] = useState<ReactElement[]>([])
  const { retriveSectionsArray } = useSectionData();
  const history = useHistory();

  const _onSelect: OnSelectSection = useCallback((x: SectionStructure)=>{
    history.push("SectionPage/" + x.sectionCode)
  }, [history]);

  useEffect(()=>{
    setLoadingRetriveSections(true);
    retriveSectionsArray().then((sections: SectionStructure[])=>{
      const _listSections: ReactElement[] = [];
      for(let i=0; i<sections.length; i++)
        _listSections.push(
            <IonRow>
              <SectionBox sectionStructure={sections[i]} onClick={_onSelect}/>  
            </IonRow>
          )
      setListSection(_listSections);
    }).finally(()=>setLoadingRetriveSections(false))
  }, [_onSelect, retriveSectionsArray])

  if(loadingRetriveSections)
    return <IonLoading/>

  return (
    <IonGrid>
      {listSections}
    </IonGrid>

  );
};

export default SectionList;
