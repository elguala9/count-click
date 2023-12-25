import { useCallback, useMemo } from "react";
import { CounterStructure, SectionStructure } from "../types/DataType";
import { useCounterFunctions } from "./HooksCounter";
import { CountersOfSection } from "../types/SectionType";

// hook utility for section
export function useSectionFunctions() {

    const { getTotalFromCounters } = useCounterFunctions();

    const getCompleteSection = useCallback(async (section?: SectionStructure)=>{
        const cursor = section;
        let totalCount = 0;
        const countersOfSection: CountersOfSection = new CountersOfSection();
        let cursorCountersOfSection: CountersOfSection | undefined = countersOfSection;
        while(cursor !== undefined){
            const {counters, totalValue} = await getTotalFromCounters(cursor.counters);
            totalCount += totalValue;
            cursorCountersOfSection = {countersStructure: counters, countersOfSection: new CountersOfSection()};
            cursorCountersOfSection = cursorCountersOfSection.countersOfSection;
            //cursor = 
        }
        return {countersOfSection, totalCount};
    }, [getTotalFromCounters]);

    return useMemo(()=>{
        return { getCompleteSection }
    }, [getCompleteSection]);
}