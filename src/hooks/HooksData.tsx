import { useCallback, useMemo } from "react";
import { storage } from "../App";
import { CounterRootKey, SectionRootKey } from "../const/Const";

import { CounterStructure, CounterMap, SectionStructure, SectionMap } from "../types/DataType";
import { SectionCode } from "../types/SectionType";
import { hashString } from "../utility/HashUtility";

export function useSectionData() {

    const retrieveSectionsMap = useCallback(async ()=>{
        let sections: SectionMap = await storage.get(SectionRootKey);
        if(sections === null){
            sections = new Map<string, SectionStructure>();
            storage.set(SectionRootKey, sections);
            return sections;
        }
        return sections
    }, []);

    /*
    const retrieveSectionsIterableKeys = useCallback(async ()=>{
        const sections: SectionMap = await retrieveSectionsMap();
        return sections.keys();
    }, [retrieveSectionsMap]);

    const retrieveSectionsArrayKeys = useCallback(async (): Promise<string[]>=>{
        const sections: IterableIterator<string> = await retrieveSectionsIterableKeys();
        return Array.from(sections);
    }, [retrieveSectionsIterableKeys]);*/

    const retrieveSectionsIterable = useCallback(async ()=>{
        const sections: SectionMap = await retrieveSectionsMap();
        return sections.values();
    }, [retrieveSectionsMap]);

    const retrieveSectionsArray = useCallback(async (): Promise<SectionStructure[]>=>{
        const sections: IterableIterator<SectionStructure> = await retrieveSectionsIterable();
        return Array.from(sections);
    }, [retrieveSectionsIterable]);

    const retrieveSection = useCallback(async (sectionCode: SectionCode)=>{
        const sections: SectionMap = await retrieveSectionsMap();
        const _section = sections.get(sectionCode);
        console.log("_section", _section); 
        return {section: _section ?? {} as SectionStructure, found: _section === undefined ? false : true};
    }, [retrieveSectionsMap]);


    const retrieveSectionByName = useCallback(async (sectionName: string)=>{
        return retrieveSection(await hashString(sectionName));
    }, [retrieveSection]);


    const setSection = useCallback(async (sectionStructure: SectionStructure)=>{
        const sections: SectionMap = await retrieveSectionsMap();
        sections.set(sectionStructure.sectionCode, sectionStructure);
        await storage.set(SectionRootKey, sections);
    }, [retrieveSectionsMap]);

    const deleteSection = useCallback(async (sectionCode: SectionCode)=>{
        const sections: SectionMap = await retrieveSectionsMap();
        sections.delete(sectionCode);
        await storage.set(SectionRootKey, sections);
    }, [retrieveSectionsMap]);

    return useMemo(()=>{
        return {retrieveSection, setSection, retrieveSectionsMap, retrieveSectionsArray, deleteSection, retrieveSectionByName};
    }, [retrieveSection, setSection, retrieveSectionsMap, retrieveSectionsArray, deleteSection, retrieveSectionByName])

}

export function useCounterData(){
    
    const retrieveCountersMap = useCallback(async ()=>{
        let counters: CounterMap = await storage.get(CounterRootKey);
        if(counters === null){
            counters = new Map<string, CounterStructure>();
            storage.set(CounterRootKey, counters);
            return counters;
        }
        return counters
    }, []);

    const retrieveCountersIterableKeys = useCallback(async ()=>{
        const counters: CounterMap = await retrieveCountersMap();
        return counters.keys();
    }, [retrieveCountersMap]);

    const retrieveArrayKeys = useCallback(async (): Promise<string[]>=>{
        const counters: IterableIterator<string> = await retrieveCountersIterableKeys();
        return Array.from(counters);
    }, [retrieveCountersIterableKeys]);

    const retrieveCounter = useCallback(async (counterCode: SectionCode)=>{
        const counters: CounterMap = await retrieveCountersMap();
        const counter = counters.get(counterCode);
        return {counter: counter ?? {} as CounterStructure, found: counter === undefined ? false : true};
    }, [retrieveCountersMap]);

    const setCounter = useCallback(async (counterStructure: CounterStructure)=>{
        const counterMap: CounterMap = await retrieveCountersMap();
        counterMap.set(counterStructure.counterCode, counterStructure);
        await storage.set(CounterRootKey, counterMap);
    }, [retrieveCountersMap]);

    const deleteCounter = useCallback(async (counterCode: SectionCode)=>{
        const counterMap: CounterMap = await retrieveCountersMap();
        counterMap.delete(counterCode);
        await storage.set(CounterRootKey, counterMap);
    }, [retrieveCountersMap]);

    return useMemo(()=>{
        return {retrieveCountersMap, retrieveCountersIterableKeys, retrieveArrayKeys, retrieveCounter, setCounter, deleteCounter};
    }, [retrieveArrayKeys, retrieveCounter, retrieveCountersIterableKeys, retrieveCountersMap, setCounter, deleteCounter])
}



