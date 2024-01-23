import { useCallback, useMemo, useState } from "react";
import { CounterCode, OnChangeCounter } from "../types/CounterType";
import { CounterStructure, SectionStructure } from "../types/DataType";
import { SectionCode } from "../types/SectionType";
import { useCounterData, useSectionData } from "./HooksData";
import { useSectionFunctions } from "./HooksSection";

// hook used to simply the source code. This hook handle the change of the counter in the CounterHandler component.
export function useCounterClick(counterCode: string, counterValue: number, onChange: OnChangeCounter) {
    const [ count, setCount ] = useState<number>(counterValue)
    const { updateTotalCounter } = useCounterFunctions();

    const onClick = useCallback((value: number)=>{
        setCount(count => {
            const _count = count + value;
            updateTotalCounter(counterCode, _count);
            onChange({counterCode, newValue: _count, change: value});
            return _count;
        });
    }, [counterCode, onChange, updateTotalCounter]);

    return useMemo(()=>{
        return {count, onClick};
    }, [count, onClick])
}

// utility function for the counters
export function useCounterFunctions() {

    const { retrieveCounter, setCounter, deleteCounter } = useCounterData()
    const { retrieveSection, setSection } = useSectionData()
    

    const createCounter = useCallback(async (sectionCode: SectionCode, counterStructure: CounterStructure)=>{
        const {found: foundCounter} = await retrieveCounter(counterStructure.counterCode);
        const {found: foundSection, section} = await retrieveSection(sectionCode);
        if(foundCounter)
            throw new DOMException("Counter " + counterStructure.counterCode + " already exist");
        if(foundSection === false)
            throw new DOMException("Section " + sectionCode + " not found");
        await setCounter(counterStructure);
        // TO DO: I need al limit to the counters in a section
        section.counters.push(counterStructure.counterCode);
        await setSection(section);
    }, [retrieveCounter, retrieveSection, setCounter, setSection]);

    const getCounter = useCallback(async (counterCode: CounterCode)=>{
        const { counter, found} = await retrieveCounter(counterCode);
        if(found === false)
            throw new DOMException("Counter " + counterCode + " not found");
        return counter;
    }, [retrieveCounter]);

    const updateTotalCounter = useCallback(async (counterCode: CounterCode, value: number)=>{
        const counterStructure = await getCounter(counterCode);
        counterStructure.value = value;
        setCounter(counterStructure);

    }, [getCounter, setCounter]);
    
    const getCounterList = useCallback(async (counterCodeList: CounterCode[])=>{
        const _counterList: CounterStructure[] = [];
        for(let i=0; i<counterCodeList.length; i++)
            _counterList.push(await getCounter(counterCodeList[i]))
        return _counterList;
    }, [getCounter]);

    const removeCounter = useCallback(async (counterCode: CounterCode, sectionStructure: SectionStructure)=>{
        const counterStructure = await getCounter(counterCode);
        deleteCounter(counterStructure.counterCode);
        //I need to delete the counter also from the list of the section
        const index = sectionStructure.counters.indexOf(counterCode);
        sectionStructure.counters.splice(index, 1);
        setSection(sectionStructure);
    }, [deleteCounter, getCounter, setSection]);

    return useMemo(()=>{
        return {getCounter, getCounterList, createCounter, updateTotalCounter, removeCounter}
    }, [getCounter, getCounterList, createCounter, updateTotalCounter, removeCounter]);
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