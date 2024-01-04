import React, { useEffect } from 'react';
import { useCounterFunctions } from '../../hooks/HooksCounter';
import { CounterCode } from '../../types/CounterType';
import ButtonDelete from '../Button/ButtonDelete';
import { SectionCode } from '../../types/SectionType';
import { SectionStructure } from '../../types/DataType';

type DeleteCounterButtonInput = {
  counterCode: CounterCode;
  sectionStructure: SectionStructure;
}

// Button that can be used to remove a counter
const DeleteCounterButton: React.FC<DeleteCounterButtonInput> = ({counterCode, sectionStructure}) => {

  const { removeCounter } = useCounterFunctions();

  return (
    <ButtonDelete onClick={()=>removeCounter(counterCode, sectionStructure)}/>
  );
};

export default DeleteCounterButton;
