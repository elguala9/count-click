import { IonButton } from '@ionic/react';
import React, { useCallback } from 'react';
import { SectionStructure } from '../../types/DataType';
import { OnSelectSection } from '../../types/SectionType';

export type SectionBoxInput = {
  sectionStructure: SectionStructure;
  onClick: OnSelectSection;
}

// Used to select a section from the list
const SectionBox: React.FC<SectionBoxInput> = ({ sectionStructure, onClick}) => {

  
  const _onClick = useCallback(()=>{
    onClick(sectionStructure);
  }, [onClick, sectionStructure]);


  return (
    <IonButton onClick={_onClick}>
      {sectionStructure.sectionName}
    </IonButton>
      

  );
};

export default SectionBox ;
