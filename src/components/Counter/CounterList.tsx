import { IonGrid } from '@ionic/react';
import React, { ReactElement, useEffect, useState } from 'react';
import { useCounterTotal } from '../../hooks/HooksCounter';
import { OnChangeCounter } from '../../types/CounterType';
import { SectionCode } from '../../types/SectionType';
import CounterHandler from './CounterHandler';

export type CounterListInput = {
  sectionCode: SectionCode;
  onChange: OnChangeCounter;
}

// The list of counters in a section
const CounterList: React.FC<CounterListInput> = ({sectionCode, onChange}) => {

  const [list, setList] = useState<ReactElement[]>([]);
  const { getTotalAndCounterListFromSectionCode } = useCounterTotal();

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
