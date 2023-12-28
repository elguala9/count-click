import { IonGrid } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useCounterTotal } from '../../hooks/HooksCounter';
import { OnChangeCounter } from '../../types/CounterType';
import { SectionCode } from '../../types/SectionType';
import CounterHandler from './CounterHandler';
import CreateCounterModal from './CreateCounterModal';
import CreateSectionModal from '../Section/CreateSectionModal';

export type CounterListInput = {
  sectionCode: SectionCode;
  onChange: OnChangeCounter;
}

// The list of counters in a section
const CounterList: React.FC<CounterListInput> = ({sectionCode, onChange}) => {

  const [list, setList] = useState<ReactElement[]>([]);
  const { getTotalAndCounterListFromSectionCode } = useCounterTotal();

  const updateList = useCallback(()=>{
    getTotalAndCounterListFromSectionCode(sectionCode).then(({counters})=>{
      const _list: ReactElement[] = [];
      for(let i=0; i<counters.length; i++)
        _list.push(
          <CounterHandler {...counters[i]} onChange={onChange} key={i}/>
        );
      setList(_list);
    })
  }, [getTotalAndCounterListFromSectionCode, onChange, sectionCode])

  useEffect(()=>{
    updateList();  
  }, [updateList]);
    

  return (
    <>
      <IonGrid>
        {list}
      </IonGrid>
      <CreateCounterModal sectionCode={sectionCode} onSubmit={updateList}/>
      <CreateSectionModal fatherSectionCode={sectionCode}/>
    </>
  );
};

export default CounterList;
