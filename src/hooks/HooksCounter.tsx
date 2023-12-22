import { useCallback, useMemo, useState } from "react";
import { CounterCode, OnChangeCounter } from "../types/CounterType";
import { useCounterData } from "./HooksData";
import { CounterHandlerInput_CounterParams } from "../components/Counter/CounterHandler";
import { CounterStructure } from "../types/DataType";

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

    const { retriveCounter } = useCounterData()

    const getCounter = useCallback(async (counterCode: CounterCode)=>{
        const { counter, found} = await retriveCounter(counterCode);
        if(found === false)
            throw new DOMException("Counter " + counterCode + " not found");
        return counter;
    }, [retriveCounter]);

    const getTotalFromCounters = useCallback(async (countersCode: CounterCode[])=>{
        let totalValue = 0;
        const counters: CounterStructure[] = [];
        let counter: CounterStructure;
        for(let i=0; i<countersCode.length; i++){
            counter = await getCounter(countersCode[i])
            counters.push(counter);
            totalValue += counter.value;
        }
            
        return {counters, totalValue};
    }, [getCounter]);

    

    return useMemo(()=>{
        return {getCounter, getTotalFromCounters}
    }, [getCounter, getTotalFromCounters]);
}