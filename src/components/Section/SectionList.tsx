import { IonGrid, IonRow, IonToggle, useIonLoading } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLoading } from '../../hooks/HookLoading';
import { useSectionData } from '../../hooks/HooksData';
import { SectionStructure } from '../../types/DataType';
import { OnSelectSection } from '../../types/SectionType';
import CreateSectionModal from './CreateSectionModal';
import SectionBox from './SectionBox';

export type SectionListInput = {
  onSelect?: OnSelectSection;
}

// A list of all the sections
const SectionList: React.FC<SectionListInput> = () => {

  const [ listSections, setListSection ] = useState<ReactElement[]>([])
  const { retrieveSectionsArray } = useSectionData();
  const history = useHistory();
  const [ subSectionVisibility, setSubSectionVisibility ] = useState<boolean>(false)
  const { presentLoading, dismissLoading, loadingElement} = useLoading()

  const _onSelect: OnSelectSection = useCallback((sectionStructure: SectionStructure)=>{
    history.push("SectionPage/" + sectionStructure.sectionCode)
  }, [history]);

  const updateListSections = useCallback(async ()=>{
    await presentLoading();
    const sections: SectionStructure[] = await retrieveSectionsArray()
    
    const _listSections: ReactElement[] = [];
    for(let i=0; i<sections.length; i++)
      if(subSectionVisibility || sections[i].isSubSection === false)
        _listSections.push(
            <IonRow key={i}>
              <SectionBox sectionStructure={sections[i]} onClick={_onSelect} />  
            </IonRow>
          ) 
    await dismissLoading()
    setListSection(_listSections);
  }, [presentLoading, retrieveSectionsArray, dismissLoading, subSectionVisibility, _onSelect]);

  useEffect(()=>{
    updateListSections();
  }, [updateListSections])


  const onChangeVisibility = useCallback(async ()=>{
    await presentLoading();
    setSubSectionVisibility(()=>!subSectionVisibility)
    await dismissLoading()
  }, [dismissLoading, presentLoading, subSectionVisibility]);

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonToggle onIonChange={onChangeVisibility} checked={subSectionVisibility}>SubSection Visible</IonToggle>   
        </IonRow>
        <IonRow>
          <CreateSectionModal onSubmit={updateListSections}/>
        </IonRow>
        {listSections}
      </IonGrid>
      {loadingElement}
    </>
  );
};

export default SectionList;
