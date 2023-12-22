import { useCallback, useMemo } from "react";
import { storage } from "../App";
import { CounterRootKey, SectionRootKey } from "../const/Const";

import { CounterStructure, Counters, SectionStructure, Sections } from "../types/DataType";
import { SectionCode } from "../types/SectionType";

export function useSectionData() {

    const retriveSectionsMap = useCallback(async ()=>{
        let sections: Sections = await storage.get(SectionRootKey);
        if(sections === null){
            sections = new Map<string, SectionStructure>();
            storage.set(SectionRootKey, sections);
            return sections;
        }
        return sections
    }, []);

    /*
    const retriveSectionsIterableKeys = useCallback(async ()=>{
        const sections: Sections = await retriveSectionsMap();
        return sections.keys();
    }, [retriveSectionsMap]);

    const retriveSectionsArrayKeys = useCallback(async (): Promise<string[]>=>{
        const sections: IterableIterator<string> = await retriveSectionsIterableKeys();
        return Array.from(sections);
    }, [retriveSectionsIterableKeys]);*/

    const retriveSectionsIterable = useCallback(async ()=>{
        const sections: Sections = await retriveSectionsMap();
        return sections.values();
    }, [retriveSectionsMap]);

    const retriveSectionsArray = useCallback(async (): Promise<SectionStructure[]>=>{
        const sections: IterableIterator<SectionStructure> = await retriveSectionsIterable();
        return Array.from(sections);
    }, [retriveSectionsIterable]);

    const retriveSection = useCallback(async (sectionCode: SectionCode)=>{
        const sections: Sections = await retriveSectionsMap();
        const section = sections.get(sectionCode);
        return {section: section ?? {} as SectionStructure, found: section === undefined ? false : true};
    }, [retriveSectionsMap]);

    const createSection = useCallback(async (sectionStructure: SectionStructure)=>{
        const {found} = await retriveSection(sectionStructure.sectionCode)
        if(found)
            throw new DOMException("Section already exist")
        const sections: Sections = await retriveSectionsMap();
        sections.set(sectionStructure.sectionCode, sectionStructure);
        storage.set(SectionRootKey, sections);
    }, [retriveSection, retriveSectionsMap]);

    return useMemo(()=>{
        return {retriveSection, createSection, retriveSectionsMap, retriveSectionsArray};
    }, [retriveSection, createSection, retriveSectionsMap, retriveSectionsArray])

}

export function useCounterData(){
    
    const retriveCountersMap = useCallback(async ()=>{
        let counters: Counters = await storage.get(CounterRootKey);
        if(counters === null){
            counters = new Map<string, CounterStructure>();
            storage.set(SectionRootKey, counters);
            return counters;
        }
        return counters
    }, []);

    const retriveCountersIterableKeys = useCallback(async ()=>{
        const counters: Counters = await retriveCountersMap();
        return counters.keys();
    }, [retriveCountersMap]);

    const retriveArrayKeys = useCallback(async (): Promise<string[]>=>{
        const counters: IterableIterator<string> = await retriveCountersIterableKeys();
        return Array.from(counters);
    }, [retriveCountersIterableKeys]);

    const retriveCounter = useCallback(async (counterCode: SectionCode)=>{
        const counters: Counters = await retriveCountersMap();
        const counter = counters.get(counterCode);
        return {counter: counter ?? {} as CounterStructure, found: counter === undefined ? false : true};
    }, [retriveCountersMap]);

    const createCounter = useCallback(async (sectionCode: SectionCode, counterStructure: CounterStructure)=>{
        const {found} = await retriveCounter(sectionCode)
        if(found)
            throw new DOMException("Section already exist")
        const counters: Counters = await retriveCountersMap();
        counters.set(sectionCode, counterStructure);
        storage.set(SectionRootKey, counters);
    }, [retriveCounter, retriveCountersMap]);

    const setCounter = useCallback((counterStructure: CounterStructure)=>{
        return;
    }, []);


    return useMemo(()=>{
        return {retriveCountersMap, retriveCountersIterableKeys, retriveArrayKeys, retriveCounter, createCounter};
    }, [retriveArrayKeys, retriveCounter, retriveCountersIterableKeys, retriveCountersMap, createCounter])
}



