import { IonGrid } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useCounterTotal } from '../../hooks/HooksCounter';
import { useSectionFunctions } from '../../hooks/HooksSection';
import { OnChangeCounter } from '../../types/CounterType';
import { SectionCode } from '../../types/SectionType';
import CounterHandler from './CounterHandler';
import CreateCounterModal from './CreateCounterModal';

export type CounterListInput = {
  sectionCode: SectionCode;
  onChange: OnChangeCounter;
}

// The list of counters in a section
const CounterList: React.FC<CounterListInput> = ({sectionCode, onChange}) => {

  const [list, setList] = useState<ReactElement[]>([]);
  const { getTotalAndCounterListFromSectionCode } = useCounterTotal();
  const { getSection } = useSectionFunctions();

  const updateList = useCallback(async ()=>{
    const sectionStructure = await getSection(sectionCode);
    const { counters } = await getTotalAndCounterListFromSectionCode(sectionCode)
    const _list: ReactElement[] = [];
    for(let i=0; i<counters.length; i++)
      _list.push(
        <CounterHandler {...counters[i]} onChange={onChange} key={i} sectionStructure={sectionStructure}/>
      );
    setList(_list);
  }, [getSection, getTotalAndCounterListFromSectionCode, onChange, sectionCode])

  useEffect(()=>{
    updateList();  
  }, [updateList]);
    

  return (
    <>
      <IonGrid>
        {list}
      </IonGrid>
      <CreateCounterModal sectionCode={sectionCode} onSubmit={updateList}/>
    </>
  );
};

export default CounterList;
