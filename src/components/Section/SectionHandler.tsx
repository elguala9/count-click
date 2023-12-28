import { IonGrid, IonRow } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useSectionFunctions, useSectionTotal } from '../../hooks/HooksSection';
import { OnChangeCounter, OnChangeCounterinput } from '../../types/CounterType';
import { SectionStructure } from '../../types/DataType';
import Section from './Section';

export type SectionHandlerInput =  {
  onChange?: OnChangeCounter;
  sectionCode: string;
}

// An handler of the section. It handle the total counnter and the evetnual subsection
const SectionHandler: React.FC<SectionHandlerInput> = ({onChange, sectionCode}) => {

  const [sectionTotal, setSectionTotal] = useState<number>(0);
  const [reloadSections, setReloadSections] = useState(false);
  const [ sectionStructure, setSectionStructure ] = useState<SectionStructure>();
  const { getSection } = useSectionFunctions()

  const { getTotalValueOfSection } = useSectionTotal()

  const _onChange = useCallback((input: OnChangeCounterinput)=>{
    console.log("sectionTotal", sectionTotal, input.change);
    setSectionTotal(()=>sectionTotal+input.change)
    if(onChange !== undefined)
      onChange(input);
  }, [onChange, sectionTotal])

  useEffect(()=>{
    getSection(sectionCode).then((sectionStructure)=>{
      getTotalValueOfSection(sectionStructure).then((total)=>{
        setSectionTotal(total);
      })

      setSectionStructure(sectionStructure);
    })
  }, [getSection, getTotalValueOfSection, sectionCode]);

  const sectionHandlerList = useCallback(()=>{
    const _list: ReactElement[] = [];
    if(sectionStructure === undefined)
      return _list;
    
    for(let i=0; i<sectionStructure.subSectionCodeList.length; i++){
      _list.push(
        <IonRow>
          <SectionHandler onChange={_onChange} sectionCode={sectionStructure.subSectionCodeList[i]}/>
        </IonRow>
      )
    }
    return _list;

  }, [_onChange, sectionStructure]);

  useEffect(()=>{
    if(reloadSections === true)
      setReloadSections(false);
  }, [reloadSections, setReloadSections]);

  return (
    <>
      <Section onChange={_onChange} 
        sectionCode={sectionCode} 
        sectionTotal={sectionTotal}
        sectionName={sectionStructure?.sectionName ?? ""}/>
      <IonGrid>
        {sectionHandlerList()}
      </IonGrid>
      
    </>
  );
};

export default SectionHandler;
