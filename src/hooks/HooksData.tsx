import { useCallback, useEffect, useMemo, useState } from "react";
import { CounterCode, SectionCode } from "../types/CounterType";
import { SectionRootKey } from "../const/Const";
import { storage } from "../App";
import { SectionStructure, Sections } from "../types/DataType";

export function useSection() {

    const retriveSectionsMap = useCallback(async ()=>{
        let sections: Sections = await storage.get(SectionRootKey);
        if(sections === null){
            sections = new Map<string, SectionStructure>();
            storage.set(SectionRootKey, sections);
            return sections;
        }
        return sections
    }, []);

    const retriveIterableKeys = useCallback(async ()=>{
        const sections: Sections = await retriveSectionsMap();
        return sections.keys();
    }, [retriveSectionsMap]);

    const retriveArrayKeys = useCallback(async ()=>{
        const sections: IterableIterator<string> = await retriveIterableKeys();
         
    }, [retriveSectionsMap]);

    const retriveSection = useCallback(async (sectionCode: SectionCode)=>{
        const sections: Sections = await retriveSectionsMap();
        const section = sections.get(sectionCode);
        return {section, found: section === undefined ? false : true};
    }, [retriveSectionsMap]);

    const createSection = useCallback(async (sectionCode: SectionCode, sectionStructure: SectionStructure)=>{
        const {found} = await retriveSection(sectionCode)
        if(found)
            throw new DOMException("Section already exist")
        const sections: Sections = await retriveSectionsMap();
        sections.set(sectionCode, sectionStructure);
        storage.set(SectionRootKey, sections);
    }, [retriveSection, retriveSectionsMap]);

    return useMemo(()=>{
        return {retriveSection, createSection, retriveSectionsMap, retriveIterableKeys};
    }, [retriveSection, createSection, retriveSectionsMap, retriveIterableKeys])

}

// hook to get the information about a counter by counterCode
export function useRetiveCounter(counterCode: CounterCode) {
    const [ count, setCount ] = useState<number>(0);
    const [ countLabel, setCountLabel ] = useState<string>("");
    const [ loadingRetriveCounter, setLoadingRetriveCounter ] = useState<boolean>(true);
    
    useEffect(()=>{
        const _counterCode = counterCode;
        setLoadingRetriveCounter(true);
        setCount(10);
        setCountLabel("Ciaone");
        setLoadingRetriveCounter(false);
    }, [counterCode]);

    return useMemo(()=>{
        return {count, countLabel, loadingRetriveCounter};
    }, [count, countLabel, loadingRetriveCounter])
}

// hook to set the counter
export function useSetCounter() {
    
    const setCounter = useCallback((counterCode: string, newValue: number)=>{
        return;
    }, []);

    return useMemo(()=>{
        return {setCounter};
    }, [setCounter])
}

// hook to set the counter
export function useSetCounterWithCode(counterCode: string) {
    const {setCounter}= useSetCounter();
    
    const _setCounter = useCallback((newValue: number)=>{
        return setCounter(counterCode, newValue);
    }, [counterCode]);

    return useMemo(()=>{
        return {setCounter: _setCounter};
    }, [setCounter])
}


