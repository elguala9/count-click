import { useCallback, useMemo } from "react";
import { CounterStructure, SectionStructure } from "../types/DataType";
import { useCounterFunctions } from "./HooksCounter";
import { CountersOfSection, SectionCode } from "../types/SectionType";
import { useSectionData } from "./HooksData";

// hook utility for section
export function useSectionFunctions() {

    const  { retriveSection,setSection } = useSectionData();

    const createSection = useCallback(async (sectionStructure: SectionStructure)=>{
        const { found } = await retriveSection(sectionStructure.sectionCode);
        if(found)
            throw new DOMException("Section " + sectionStructure.sectionCode + " already exist");
        console.log("sectionStructure",sectionStructure);
        setSection(sectionStructure);
    }, [retriveSection, setSection]);

    const getSection = useCallback(async (sectionCode: SectionCode)=>{
        const { section, found} = await retriveSection(sectionCode);
        if(found === false)
            throw new DOMException("Section " + sectionCode + " not found");
        return section;
    }, [retriveSection]);

    /*const getCompleteSection = useCallback(async (section?: SectionStructure)=>{
        const cursor = section;
        let totalCount = 0;
        const countersOfSection: CountersOfSection = new CountersOfSection();
        let cursorCountersOfSection: CountersOfSection | undefined = countersOfSection;
        while(cursor !== undefined){
            const {counters, totalValue} = await getTotalAndListFromCounterList(cursor.counters);
            totalCount += totalValue;
            cursorCountersOfSection = {countersStructure: counters, countersOfSection: new CountersOfSection()};
            cursorCountersOfSection = cursorCountersOfSection.countersOfSection;
            //cursor = 
        }
        return {countersOfSection, totalCount};
    }, [getTotalAndListFromCounterList]);*/

    return useMemo(()=>{
        return { getSection, createSection }
    }, [getSection, createSection]);
}