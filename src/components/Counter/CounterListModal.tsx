import { IonGrid, IonModal } from '@ionic/react';
import React, { ReactElement, useEffect, useState } from 'react';
import { OnChangeCounter } from '../../types/CounterType';
import { CounterStructure } from '../../types/DataType';
import CounterHandler from './CounterHandler';
import CounterList, { CounterListInput } from './CounterList';
import CreateCounterModalButton from './CreateCounterModalButton';

export type CounterListModalInput = CounterListInput & {
  isOpen: boolean;
  onClose: ()=>void;
};

// The modal of a list of counters in a section
const CounterListModal: React.FC<CounterListModalInput> = ({sectionCode, onChange, isOpen, onClose}) => {

  return (
    <IonModal isOpen={isOpen} onWillDismiss={onClose}>
      <CounterList sectionCode={sectionCode} onChange={onChange}/>
      <CreateCounterModalButton sectionCode={sectionCode}/>
    </IonModal>
  );
};

export default CounterListModal;
