import { useCallback, useMemo } from "react";
import { storage } from "../App";
import { CounterRootKey, SectionRootKey } from "../const/Const";

import { CounterStructure, CounterMap, SectionStructure, SectionMap } from "../types/DataType";
import { SectionCode } from "../types/SectionType";

export function useSectionData() {

    const retriveSectionsMap = useCallback(async ()=>{
        let sections: SectionMap = await storage.get(SectionRootKey);
        if(sections === null){
            sections = new Map<string, SectionStructure>();
            storage.set(SectionRootKey, sections);
            return sections;
        }
        return sections
    }, []);

    /*
    const retriveSectionsIterableKeys = useCallback(async ()=>{
        const sections: SectionMap = await retriveSectionsMap();
        return sections.keys();
    }, [retriveSectionsMap]);

    const retriveSectionsArrayKeys = useCallback(async (): Promise<string[]>=>{
        const sections: IterableIterator<string> = await retriveSectionsIterableKeys();
        return Array.from(sections);
    }, [retriveSectionsIterableKeys]);*/

    const retriveSectionsIterable = useCallback(async ()=>{
        const sections: SectionMap = await retriveSectionsMap();
        return sections.values();
    }, [retriveSectionsMap]);

    const retriveSectionsArray = useCallback(async (): Promise<SectionStructure[]>=>{
        const sections: IterableIterator<SectionStructure> = await retriveSectionsIterable();
        return Array.from(sections);
    }, [retriveSectionsIterable]);

    const retriveSection = useCallback(async (sectionCode: SectionCode)=>{
        const sections: SectionMap = await retriveSectionsMap();
        const section = sections.get(sectionCode);
        return {section: section ?? {} as SectionStructure, found: section === undefined ? false : true};
    }, [retriveSectionsMap]);

    const setSection = useCallback(async (sectionStructure: SectionStructure)=>{
        const sections: SectionMap = await retriveSectionsMap();
        sections.set(sectionStructure.sectionCode, sectionStructure);
        await storage.set(SectionRootKey, sections);
    }, [retriveSectionsMap]);

    return useMemo(()=>{
        return {retriveSection, setSection, retriveSectionsMap, retriveSectionsArray};
    }, [retriveSection, setSection, retriveSectionsMap, retriveSectionsArray])

}

export function useCounterData(){
    
    const retriveCountersMap = useCallback(async ()=>{
        let counters: CounterMap = await storage.get(CounterRootKey);
        if(counters === null){
            counters = new Map<string, CounterStructure>();
            storage.set(CounterRootKey, counters);
            return counters;
        }
        return counters
    }, []);

    const retriveCountersIterableKeys = useCallback(async ()=>{
        const counters: CounterMap = await retriveCountersMap();
        return counters.keys();
    }, [retriveCountersMap]);

    const retriveArrayKeys = useCallback(async (): Promise<string[]>=>{
        const counters: IterableIterator<string> = await retriveCountersIterableKeys();
        return Array.from(counters);
    }, [retriveCountersIterableKeys]);

    const retriveCounter = useCallback(async (counterCode: SectionCode)=>{
        const counters: CounterMap = await retriveCountersMap();
        const counter = counters.get(counterCode);
        return {counter: counter ?? {} as CounterStructure, found: counter === undefined ? false : true};
    }, [retriveCountersMap]);

    const setCounter = useCallback(async (counterStructure: CounterStructure)=>{
        const counterMap: CounterMap = await retriveCountersMap();
        counterMap.set(counterStructure.counterCode, counterStructure);
        await storage.set(CounterRootKey, counterMap);
    }, [retriveCountersMap]);


    return useMemo(()=>{
        return {retriveCountersMap, retriveCountersIterableKeys, retriveArrayKeys, retriveCounter, setCounter};
    }, [retriveArrayKeys, retriveCounter, retriveCountersIterableKeys, retriveCountersMap, setCounter])
}



