import { IonButton, IonCard, IonCardHeader, IonInput } from '@ionic/react';
import React, { useCallback, useState } from 'react';
import { useSectionData } from '../../hooks/HooksData';
import { SectionStructure } from '../../types/DataType';
import { hashString } from '../../utility/HashUtility';
import { useSectionFunctions } from '../../hooks/HooksSection';

// Component in which we can create a new section
const CreateSection: React.FC = () => {

  const [sectionName, setSectionName] = useState<string>("");
  const [formError, setFormError] = useState<boolean>(true);
  const { retriveSection} = useSectionData();
  const { createSection } = useSectionFunctions();

  const onInput = useCallback(async (event: any)=>{
    setFormError(false);
    const _sectionName: string = event.target.value
    if(_sectionName.length === 0)
      return setFormError(true);
    setSectionName(_sectionName);
    const {found} = await retriveSection(_sectionName);
    setFormError(found);
  }, [retriveSection])

  const onClick = useCallback(async ()=>{
    const sectionStructure: SectionStructure = {
      counters: [],
      locked: true,
      sectionName: sectionName,
      sectionCode: await hashString(sectionName),
    }
    createSection(sectionStructure)
  }, [createSection, sectionName])

  return (
    <IonCard>
      <IonCardHeader>
        Create Section
      </IonCardHeader>
      <IonInput onIonInput={onInput}/>
      <IonButton onClick={onClick} disabled={formError}>
        Create Section
      </IonButton>
    </IonCard>

  );
};

export default CreateSection;
