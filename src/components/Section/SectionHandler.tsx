import { IonLoading } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useRetiveSection } from '../../hooks/HooksData';
import { OnChangeCounterinput, SectionCode } from '../../types/CounterType';
import { CounterHandlerInput_CounterParams } from '../Counter/CounterHandler';
import Section from './Section';

type SectionHandlerInput =  {
  sectionCode: SectionCode
}

// A section that contain all the information about the counters and the actual counter
// The children can be another section. Usefull if we ahve counters nidificated
const SectionHandler: React.FC<SectionHandlerInput> = ({sectionCode}) => {

  const [totalCount, setTotalCount] = useState<number>(0);
  const { countCodes, loadingRetriveSection} = useRetiveSection(sectionCode);

  const _onChange = useCallback((input: OnChangeCounterinput)=>{
    setTotalCount((totalCount)=>totalCount+input.change)
  }, [])

  useEffect(()=>{
    //let _totalCount = 0;
    /*for(let i=0; i<countCodes.length; i++){
      
    }*/
  }, [])

  if(loadingRetriveSection)
    return <IonLoading/>

  const obj: CounterHandlerInput_CounterParams = {
    counterCode: "xxx",
    counterLabel: "Ciao",
    counterValue: 10
  }

  return (
    <Section onChange={_onChange} 
    counterInput={[obj]}/>

  );
};

export default SectionHandler;
