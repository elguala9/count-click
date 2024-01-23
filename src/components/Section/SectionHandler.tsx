import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useSectionFunctions, useSectionTotal } from '../../hooks/HooksSection';
import { OnChangeCounter, OnChangeCounterInput } from '../../types/CounterType';
import { SectionStructure } from '../../types/DataType';
import Section from './Section';
import CreateSectionModal from './CreateSectionModal';
import { useLoading } from '../../hooks/HookLoading';
import DeleteSectionButton from './DeleteSectionButton';

export type SectionHandlerInput =  {
  onChange?: OnChangeCounter;
  sectionCode: string;
}

// An handler of the section. It handle the total counter and the eventual subsection
const SectionHandler: React.FC<SectionHandlerInput> = ({onChange, sectionCode}) => {

  const [sectionTotal, setSectionTotal] = useState<number>(0);
  const [sectionList, setSectionList] = useState<ReactElement[]>([]);
  const [ sectionStructure, setSectionStructure ] = useState<SectionStructure>();
  const { getSection } = useSectionFunctions()
  const { presentLoading, dismissLoading} = useLoading()
  const { getTotalValueOfSection } = useSectionTotal()

  const _onChange = useCallback((input: OnChangeCounterInput)=>{ 
    setSectionTotal((p)=>p+input.change)
    if(onChange !== undefined)
      onChange(input);
  }, [onChange, sectionTotal])

  const sectionHandlerList = useCallback(()=>{
    const _list: ReactElement[] = [];
    if(sectionStructure === undefined)
      return _list;
    
    for(let i=0; i<sectionStructure.subSectionCodeList.length; i++){

      _list.push(
        <IonCol>
          <SectionHandler onChange={_onChange} sectionCode={sectionStructure.subSectionCodeList[i]} key={i}/>
        </IonCol>
      )
    }
    //return _list;
    setSectionList(_list);
  }, [_onChange, sectionStructure]);


  useEffect(()=>{
    getSection(sectionCode).then((sectionStructure)=>{
      getTotalValueOfSection(sectionStructure).then((total)=>{
        setSectionTotal(total);
      })

      setSectionStructure(sectionStructure);
    })
    sectionHandlerList();
  }, [getSection, getTotalValueOfSection, sectionCode, sectionHandlerList]);

  return (
    <>
      <Section onChange={_onChange} 
        sectionCode={sectionCode} 
        sectionTotal={sectionTotal}
        sectionName={sectionStructure?.sectionName ?? ""}
        isSubsection={sectionStructure?.isSubSection ?? false}>
          <CreateSectionModal fatherSectionCode={sectionCode} onSubmit={sectionHandlerList}/>
      </Section>
      <IonRow>
        {sectionList}
      </IonRow>

    </>
  );
};

export default SectionHandler;
