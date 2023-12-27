import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { OnChangeCounter, OnChangeCounterinput } from '../../types/CounterType';
import { CounterHandlerInput_CounterParams } from '../Counter/CounterHandler';
import Section from './Section';
import { SectionCode } from '../../types/SectionType';
import { useSectionFunctions, useSectionTotal } from '../../hooks/HooksSection';
import { IonGrid, IonRow } from '@ionic/react';

export type SectionHandlerInput =  {
  onChange?: OnChangeCounter;
  sectionCode: string;
}

// An handler of the section. It handle the total counnter and the evetnual subsection
const SectionHandler: React.FC<SectionHandlerInput> = ({onChange, sectionCode}) => {

  const [sectionTotal, setSectionTotal] = useState<number>(0);
  const [ subSectionList, setSubSectionList ] = useState<ReactElement[]>();
  const { getSection } = useSectionFunctions()

  const { getTotalValueOfSection } = useSectionTotal()

  const _onChange = useCallback((input: OnChangeCounterinput)=>{
    setSectionTotal((sectionTotal)=>sectionTotal+input.change)
    if(onChange !== undefined)
      onChange(input);
  }, [onChange])

  useEffect(()=>{
    getSection(sectionCode).then((sectionStructure)=>{
      getTotalValueOfSection(sectionStructure).then((total)=>{
        setSectionTotal(total);
      })

      const _list: ReactElement[] = [];
      for(let i=0; i<sectionStructure.subSectionCodeList.length; i++){
        _list.push(
          <IonRow>
            <SectionHandler onChange={_onChange} sectionCode={sectionStructure.subSectionCodeList[i]}/>
          </IonRow>
        )
      }
      setSubSectionList(_list);
    })
  }, [_onChange, getSection, getTotalValueOfSection, sectionCode]);

  /*if(loadingRetriveSection)
    return <IonLoading/>*/
  return (
    <>
      <Section onChange={_onChange} 
      sectionCode={sectionCode} sectionTotal={sectionTotal}/>
      <IonGrid>
        {subSectionList}
      </IonGrid>
      
    </>
  );
};

export default SectionHandler;
