import { useCallback, useMemo, useState } from "react";

export function useCounter(counterValue: number, onChange: (newValue: number, change: number)=>void) {
    const [ count, setCount ] = useState<number>(counterValue)

    const onClick = useCallback((value: number)=>{
        setCount(count => {
            const _count = count + value;
            onChange(_count, value);
            return _count;
        });
    }, [setCount]);

    return useMemo(()=>{
        return {count, onClick};
    }, [count, onClick])
}