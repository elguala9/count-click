import React, { ReactElement, useCallback, useState } from 'react';
import { SectionCode } from '../../types/SectionType';
import { IonButton } from '@ionic/react';
import GeneralModal from './GeneralModal';

export type CreateCounterModalButtonInput = {
  modalTitle: string;
  children: ReactElement;
  buttonLabel: string;
  onSubmitModal: ()=>void;
  buttonSubmitLabel: string;
}

// Component itha open the model that is used to create a new component
const GeneralModalButton: React.FC<CreateCounterModalButtonInput> = ({ modalTitle, children, buttonLabel, onSubmitModal, buttonSubmitLabel}) => {

  const [ isOpen, setIsOpen ] = useState(false);


  const onClick = useCallback(()=>{
    setIsOpen(true);
  }, []);

  const onClose = useCallback(()=>{
    setIsOpen(false);
  }, []);


  const _onSubmitModal = useCallback(()=>{
    onSubmitModal();
    onClose();
  }, [onClose, onSubmitModal]);

  return (
    <>
      <GeneralModal isOpen={isOpen} onClose={onClose} modalTitle={modalTitle} buttonSubmitLabel={buttonSubmitLabel} onSubmitModal={_onSubmitModal}>
        {children}
      </GeneralModal>
      <IonButton onClick={onClick}>
        {buttonLabel}
      </IonButton>
    </>

  );
};

export default GeneralModalButton;
