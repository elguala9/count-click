import { IonLoading } from '@ionic/react';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useSection } from '../../hooks/HooksData';
import { OnChangeCounterinput, SectionCode } from '../../types/CounterType';
import { CounterHandlerInput_CounterParams } from '../Counter/CounterHandler';
import Section from './Section';
import { Sections } from '../../types/DataType';



// A section that contain all the information about the counters and the actual counter
// The children can be another section. Usefull if we ahve counters nidificated
const SectionList: React.FC = () => {

  const [totalCount, setTotalCount] = useState<number>(0);
  const { retriveSectionsMap } = useSection();

  const _onChange = useCallback((input: OnChangeCounterinput)=>{
    setTotalCount((totalCount)=>totalCount + input.change)
  }, [])

  useEffect(()=>{
    retriveSectionsMap().then((sections: Sections)=>{

    })
  }, [])

  /*if(loadingRetriveSection)
    return <IonLoading/>*/

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

export default SectionList;
