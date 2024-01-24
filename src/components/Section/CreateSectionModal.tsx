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
  const { retrieveSectionByName } = useSectionData();
  const { createSection, addSectionToSubSectionList } = useSectionFunctions();

  const onInput = useCallback(async (event: any)=>{
    setFormError(false);
    const _sectionName: string = event.target.value
    if(_sectionName.length === 0)
      return setFormError(true);
    console.log("_sectionName:", _sectionName);
    setSectionName(_sectionName);
    const {section, found} = await retrieveSectionByName(_sectionName);
    console.log("section:", section, found);
    setFormError(found);
  }, [retrieveSectionByName])

  const onSubmitModal = useCallback(async ()=>{
    
    const sectionStructure: SectionStructure = {
      counters: [],
      locked: true,
      sectionName: sectionName,
      sectionCode: await hashString(sectionName),
      subSectionCodeList: [],
      isSubSection: false,
      fatherSection: fatherSectionCode
    }
    // add the section created to the father
    if(fatherSectionCode !== undefined){
      await addSectionToSubSectionList(sectionStructure, fatherSectionCode)
      sectionStructure.isSubSection = true;
    }

    await createSection(sectionStructure)
    if(onSubmit !== undefined)
      onSubmit();
  }, [createSection, fatherSectionCode, onSubmit, sectionName, addSectionToSubSectionList])

  return (
    <GeneralModalButton modalTitle={'Create a Section'} buttonLabel={"Create Section Modal"} 
      onSubmitModal={onSubmitModal} buttonSubmitLabel={"Create Section"}
      submitDisabled={formError}>
      <IonCard>
        <IonCardHeader>
          Create Section
        </IonCardHeader>
        <IonInput onIonInput={onInput} color={formError ? 'danger' : 'primary'}/>
      </IonCard>
    </GeneralModalButton>
  );
};

export default CreateSectionModal;
