import { IonModal } from '@ionic/react';
import React from 'react';
import CounterList, { CounterListInput } from './CounterList';

export type CounterListModalInput = CounterListInput & {
  isOpen: boolean;
  onClose: ()=>void;
};

// The modal of a list of counters in a section
const CounterListModal: React.FC<CounterListModalInput> = ({sectionCode, onChange, isOpen, onClose}) => {

  return (
    <IonModal isOpen={isOpen} onWillDismiss={onClose}>
      <CounterList sectionCode={sectionCode} onChange={onChange}/>
    </IonModal>
  );
};

export default CounterListModal;
