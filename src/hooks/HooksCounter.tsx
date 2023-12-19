import { useCallback, useMemo, useState } from "react";
import { CounterCode, OnChangeCounter } from "../types/CounterType";
import { useCounter } from "./HooksData";

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

    const { retriveCounter } = useCounter()

    const getValueFromCounter = useCallback(async (counterCode: CounterCode)=>{
        const { counter, found} = await retriveCounter(counterCode);
        if(found === false)
            throw new DOMException("Counter " + counterCode + " not found");
        return counter.value;
    }, [retriveCounter]);

    const getTotalFromCounters = useCallback(async (counters: CounterCode[])=>{
        let totalValue = 0;
        for(let i=0; i<counters.length; i++)
            totalValue+= await getValueFromCounter(counters[i]);
        return totalValue;
    }, [getValueFromCounter]);

    return useMemo(()=>{
        return {getValueFromCounter, getTotalFromCounters}
    }, [getValueFromCounter, getTotalFromCounters]);
}