import { IonButton, IonCard, IonCardHeader, IonInput } from '@ionic/react';
import React, { useCallback, useState } from 'react';
import { useSectionData } from '../../hooks/HooksData';
import { SectionStructure } from '../../types/DataType';
import { hashString } from '../../utility/HashUtility';
import { useSectionFunctions } from '../../hooks/HooksSection';
import { SectionCode } from '../../types/SectionType';
import GeneralModalButton from '../Modal/GeneralModalButton';

export type CreateSectionModalInput = {
  fatherSectionCode?: SectionCode;
  onSubmit?: ()=>void;
}

// Component in which we can create a new section
const CreateSectionModal: React.FC<CreateSectionModalInput> = ({fatherSectionCode, onSubmit}) => {

  const [sectionName, setSectionName] = useState<string>("");
  const [formError, setFormError] = useState<boolean>(true);
  const { retriveSection} = useSectionData();
  const { createSection, updateSubSectionList } = useSectionFunctions();

  const onInput = useCallback(async (event: any)=>{
    setFormError(false);
    const _sectionName: string = event.target.value
    if(_sectionName.length === 0)
      return setFormError(true);
    setSectionName(_sectionName);
    const {found} = await retriveSection(_sectionName);
    setFormError(found);
  }, [retriveSection])

  const onSubmitModal = useCallback(async ()=>{
    
    const sectionStructure: SectionStructure = {
      counters: [],
      locked: true,
      sectionName: sectionName,
      sectionCode: await hashString(sectionName),
      subSectionCodeList: []
    }
    // add the section created to the father
    if(fatherSectionCode !== undefined)
      await updateSubSectionList(sectionStructure, fatherSectionCode)

    createSection(sectionStructure)
    if(onSubmit !== undefined)
      onSubmit();
  }, [createSection, fatherSectionCode, onSubmit, sectionName, updateSubSectionList])

  return (
    <GeneralModalButton modalTitle={'Create a Section'} buttonLabel={"Create Section Modal"} 
    onSubmitModal={onSubmitModal} buttonSubmitLabel={"Create Section"}>
      <IonCard>
        <IonCardHeader>
          Create Section
        </IonCardHeader>
        <IonInput onIonInput={onInput}/>
      </IonCard>
    </GeneralModalButton>
  );
};

export default CreateSectionModal;
