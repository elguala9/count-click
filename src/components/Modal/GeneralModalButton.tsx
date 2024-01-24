import { IonButton } from '@ionic/react';
import React, { ReactElement, useCallback, useState } from 'react';
import GeneralModal from './GeneralModal';

export type CreateCounterModalButtonInput = {
  modalTitle: string;
  children: ReactElement;
  buttonLabel: string;
  onSubmitModal: ()=>void;
  buttonSubmitLabel: string;
  submitDisabled?: boolean;
  disabled? : boolean;
}

// Component that open the model that is used to create a new component
const GeneralModalButton: React.FC<CreateCounterModalButtonInput> = ({ modalTitle, children, buttonLabel, onSubmitModal, buttonSubmitLabel, submitDisabled, disabled}) => {

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
      <GeneralModal isOpen={isOpen} onClose={onClose} modalTitle={modalTitle} 
      buttonSubmitLabel={buttonSubmitLabel} onSubmitModal={_onSubmitModal} disabled={submitDisabled}>
        {children}
      </GeneralModal>
      <IonButton onClick={onClick} fill="outline" disabled={disabled}>
        {buttonLabel}
      </IonButton>
    </>
  );
};

export default GeneralModalButton;
