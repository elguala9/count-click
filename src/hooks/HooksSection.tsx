import { useCallback, useMemo } from "react";
import { SectionStructure } from "../types/DataType";
import { useCounterFunctions } from "./HooksCounter";

// hook utility for section
export function useSectionFunctions() {

    const { getTotalFromCounters } = useCounterFunctions();

    const getTotalCountFromSection = useCallback(async (section?: SectionStructure)=>{
        let cursor = section;
        let totalCount = 0;
        while(cursor !== undefined){
            totalCount += await getTotalFromCounters(cursor.counters);
            cursor = cursor.SectionStructure;
        }
        return totalCount;
    }, [getTotalFromCounters]);

    return useMemo(()=>{
        return { getTotalCountFromSection }
    }, [getTotalCountFromSection]);
}