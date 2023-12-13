import { useCallback, useEffect, useMemo, useState } from "react";
import { CounterCode, SectionCode } from "../types/CounterType";

export function useRetiveSection(sectionCode: SectionCode) {
    const [ countCodes, setCountCodes ] = useState<CounterCode[]>([]);
    const [ loadingRetriveSection, setLoadingRetriveSection ] = useState<boolean>(true);
    
    useEffect(()=>{
        const _sectionCode = sectionCode;
        setLoadingRetriveSection(true);
        setCountCodes(["Ciaooo", "CICICIC"])
        setLoadingRetriveSection(false);
    }, [setCountCodes, sectionCode, setLoadingRetriveSection]);

    return useMemo(()=>{
        return {countCodes, loadingRetriveSection};
    }, [countCodes, loadingRetriveSection])
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