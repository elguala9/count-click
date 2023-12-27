import { useCallback, useMemo, useState } from "react";
import { CounterCode, OnChangeCounter } from "../types/CounterType";
import { CounterStructure } from "../types/DataType";
import { SectionCode } from "../types/SectionType";
import { useCounterData, useSectionData } from "./HooksData";
import { useSectionFunctions } from "./HooksSection";

// hook used to simply the source code. This hook handle the change of the counter in the CounterHandler component.
export function useCounterClick(counterCode: string, counterValue: number, onChange: OnChangeCounter) {
    const [ count, setCount ] = useState<number>(counterValue)

    const onClick = useCallback((value: number)=>{
        setCount(count => {
            const _count = count + value;
            onChange({counterCode, newValue: _count, change: value});
            return _count;
        });
    }, [counterCode, onChange]);

    return useMemo(()=>{
        return {count, onClick};
    }, [count, onClick])
}

// utility function for the counters
export function useCounterFunctions() {

    const { retriveCounter, setCounter } = useCounterData()
    const { retriveSection, setSection } = useSectionData()
    

    const createCounter = useCallback(async (sectionCode: SectionCode, counterStructure: CounterStructure)=>{
        const {found: foundCounter} = await retriveCounter(counterStructure.counterCode);
        console.log("sectionCode", sectionCode);
        const {found: foundSection, section} = await retriveSection(sectionCode);
        if(foundCounter)
            throw new DOMException("Counter " + counterStructure.counterCode + " already exist");
        if(foundSection === false)
            throw new DOMException("Section " + sectionCode + " not found");
        setCounter(counterStructure);
        // TO DO: I need al limit to the counters in a section
        section.counters.push(counterStructure.counterCode);
        setSection(section);
    }, [retriveCounter, retriveSection, setCounter, setSection]);

    const getCounter = useCallback(async (counterCode: CounterCode)=>{
        const { counter, found} = await retriveCounter(counterCode);
        if(found === false)
            throw new DOMException("Counter " + counterCode + " not found");
        return counter;
    }, [retriveCounter]);

    
    
    const getCounterList = useCallback(async (counterCodeList: CounterCode[])=>{
        const _counterList: CounterStructure[] = [];
        for(let i=0; i<counterCodeList.length; i++)
            _counterList.push(await getCounter(counterCodeList[i]))
        return _counterList;
    }, [getCounter]);

    return useMemo(()=>{
        return {getCounter, getCounterList, createCounter}
    }, [getCounter, getCounterList, createCounter]);
}

export function useCounterTotal() {
    const { getSection } = useSectionFunctions();
    const { getCounter } = useCounterFunctions();

    const getTotalAndListFromCounterList = useCallback(async (counterCodeList: CounterCode[])=>{
        let totalValue = 0;
        const counters: CounterStructure[] = [];
        let counter: CounterStructure;
        for(let i=0; i<counterCodeList.length; i++){
            counter = await getCounter(counterCodeList[i])
            counters.push(counter);
            totalValue += counter.value;
        }
            
        return {counters, totalValue};
    }, [getCounter]);

    const getTotalAndCounterListFromSectionCode = useCallback(async (sectionCode: SectionCode)=>{
        const counterCodeList: CounterCode[] = (await getSection(sectionCode)).counters;
        console.log("counterCodeList", counterCodeList);
        return getTotalAndListFromCounterList(counterCodeList);
    }, [getSection, getTotalAndListFromCounterList]);

    return useMemo(()=>{
        return {getTotalAndListFromCounterList, getTotalAndCounterListFromSectionCode}
    }, [getTotalAndListFromCounterList, getTotalAndCounterListFromSectionCode]);

}