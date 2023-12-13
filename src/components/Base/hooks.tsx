import { useCallback, useMemo, useState } from "react";
import { OnChangeCounter } from "../../types/CounterType";

export function useCounter(counterCode: string, counterValue: number, onChange: OnChangeCounter) {
    const [ count, setCount ] = useState<number>(counterValue)

    const onClick = useCallback((value: number)=>{
        setCount(count => {
            const _count = count + value;
            onChange({counterCode, newValue: _count, change: value});
            return _count;
        });
    }, [setCount]);

    return useMemo(()=>{
        return {count, onClick};
    }, [count, onClick])
}