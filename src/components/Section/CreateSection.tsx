import { IonButton, IonCard, IonCardHeader, IonInput } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { storage } from '../../App';
import { SectionRootKey } from '../../const/Const';
import { Sections } from '../../types/DataType';
import CounterHandler from '../Counter/CounterHandler';

// A section that contain all the information about the counters and the actual counter
// The children can be another section. Usefull if we ahve counters nidificated
const CreateSection: React.FC = () => {

  const [baseCounterHandlers, setCounterHandler] = useState<ReactElement<typeof CounterHandler[]>>();
  const [sectionName, setSectionName] = useState<string>("");
  const [formError, setFormError] = useState<boolean>(true);

  useEffect(()=>{
    storage.get(SectionRootKey).then((section: Sections)=>{
      if(section === null)
        storage.set(SectionRootKey, [] as string[]);
    });
  });

  const onInput = useCallback(async (event: any)=>{
    setFormError(false);
    const _sectionName: string = event.target.value
    if(_sectionName.length === 0)
      return setFormError(true);
    setSectionName(_sectionName);
    const sections: Sections = await storage.get(SectionRootKey);
    const found = sections.includes(_sectionName);
    setFormError(found);
  }, [])

  const onClick = useCallback(async ()=>{
    const sections: Sections = await storage.get(SectionRootKey);
    sections.push(sectionName);
    storage.set(SectionRootKey, sections);
  }, [sectionName])

  return (
    <IonCard>
      <IonCardHeader>
        Create Section
      </IonCardHeader>
      <IonInput onIonInput={onInput}/>
      <IonButton onClick={onClick} disabled={formError}/>
    </IonCard>

  );
};

export default CreateSection;
