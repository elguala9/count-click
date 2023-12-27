import { IonGrid, IonRow } from '@ionic/react';
import React, { ReactElement, useEffect, useState } from 'react';
import { OnChangeCounter } from '../../types/CounterType';
import { CounterStructure } from '../../types/DataType';
import CounterHandler from './CounterHandler';
import CreateCounterModalButton from './CreateCounterModalButton';
import { SectionCode } from '../../types/SectionType';
import { useCounterFunctions } from '../../hooks/HooksCounter';

export type CounterListInput = {
  sectionCode: SectionCode;
  onChange: OnChangeCounter;
}

// The list of counters in a section
const CounterList: React.FC<CounterListInput> = ({sectionCode, onChange}) => {

  const [list, setList] = useState<ReactElement[]>([]);
  const { getTotalAndCounterListFromSectionCode } = useCounterFunctions();

  useEffect(()=>{
    getTotalAndCounterListFromSectionCode(sectionCode).then(({counters})=>{
      const _list: ReactElement[] = [];
      for(let i=0; i<counters.length; i++)
        _list.push(
          <CounterHandler {...counters[i]} onChange={onChange} key={i}/>
        );
      setList(_list);
    })
    }, [getTotalAndCounterListFromSectionCode, onChange, sectionCode]);
    

  return (
    <IonGrid>
      {list}
    </IonGrid>
    
  );
};

export default CounterList;
