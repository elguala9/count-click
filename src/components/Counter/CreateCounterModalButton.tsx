import React, { useCallback, useState } from 'react';
import { SectionCode } from '../../types/SectionType';
import CreateCounterModal from './CreateCounterModal';
import { IonButton } from '@ionic/react';

export type CreateCounterModalButtonInput = {
  sectionCode: SectionCode;
}

// Component itha open the model that is used to create a new component
const CreateCounterModalButton: React.FC<CreateCounterModalButtonInput> = ({ sectionCode}) => {

  const [ isOpen, setIsOpen ] = useState(false);

  const onClick = useCallback(()=>{
    setIsOpen(true);
  }, []);

  const onClose = useCallback(()=>{
    setIsOpen(false);
  }, []);

  return (
    <>
      <CreateCounterModal isOpen={isOpen} sectionCode={sectionCode} onClose={onClose}/>
      <IonButton onClick={onClick}>
        Create Counter
      </IonButton>
    </>

  );
};

export default CreateCounterModalButton;
