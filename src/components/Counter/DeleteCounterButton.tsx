import React, { useCallback, useEffect } from 'react';
import { useCounterFunctions } from '../../hooks/HooksCounter';
import { CounterCode } from '../../types/CounterType';
import ButtonDelete from '../Button/ButtonDelete';
import { SectionCode } from '../../types/SectionType';
import { SectionStructure } from '../../types/DataType';

export type OnDelete = ()=>void;

type DeleteCounterButtonInput = {
  counterCode: CounterCode;
  sectionStructure: SectionStructure;
  onDelete: OnDelete;
}

// Button that can be used to remove a counter
const DeleteCounterButton: React.FC<DeleteCounterButtonInput> = ({counterCode, sectionStructure, onDelete}) => {

  const { removeCounter } = useCounterFunctions();

  const _onDelete = useCallback(async ()=>{
    await removeCounter(counterCode, sectionStructure);
    onDelete();
  }, [counterCode, onDelete, removeCounter, sectionStructure]);

  return (
    <ButtonDelete onClick={_onDelete}/>
  );
};

export default DeleteCounterButton;
