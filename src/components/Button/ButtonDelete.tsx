import React, { useCallback, useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { trashBinOutline } from 'ionicons/icons';
import ConfirmModal from '../Modal/ConfirmModal';

type ButtonDeleteInput = {
  onClick: ()=>void;
  label?: string;
}

// Button for deleting
const ButtonDelete: React.FC<ButtonDeleteInput> = ({onClick, label}) => {

  const [ open, setOpen ] = useState(false);

  const onConfirm = useCallback(()=>{
    setOpen(false);
    onClick();
  }, [onClick])

  return (
    <>
      <IonButton onClick={()=>setOpen(true)} color={'danger'}>
        {label}
        <IonIcon icon={trashBinOutline}/>
      </IonButton>
      <ConfirmModal label={"Delete"} isOpen={open} onCancel={()=>setOpen(false)} onConfirm={onConfirm}/>
    </>
    
  );
};

export default ButtonDelete;
