import { useCallback, useMemo } from "react";
import { SectionStructure } from "../types/DataType";
import { SectionCode } from "../types/SectionType";
import { useCounterFunctions, useCounterTotal } from "./HooksCounter";
import { useSectionData } from "./HooksData";

// hook utility for section
export function useSectionFunctions() {

    const  { retriveSection, setSection, deleteSection } = useSectionData();
    const { removeCounter } = useCounterFunctions();

    const createSection = useCallback(async (sectionStructure: SectionStructure)=>{
        const { found } = await retriveSection(sectionStructure.sectionCode);
        if(found)
            throw new DOMException("Section " + sectionStructure.sectionCode + " already exist");
        await setSection(sectionStructure);
    }, [retriveSection, setSection]);

    const getSection = useCallback(async (sectionCode: SectionCode)=>{
        const { section, found} = await retriveSection(sectionCode);
        if(found === false)
            throw new DOMException("Section " + sectionCode + " not found");
        return section;
    }, [retriveSection]);

    const updateSubSectionList = useCallback(async (sectionStructure: SectionStructure, fatherSectionCode: SectionCode)=>{
        const fatherSectionStructure = await getSection(fatherSectionCode)
        fatherSectionStructure.subSectionCodeList.push(sectionStructure.sectionCode);
        setSection(fatherSectionStructure)
    }, [getSection, setSection]);

    const removeSection = useCallback(async (sectionCode: SectionCode)=>{
        const sectionStructure = await getSection(sectionCode);
        for(let i=0; i<sectionStructure.counters.length; i++){
            removeCounter(sectionStructure.counters[i], sectionStructure);
            for(let i=0; i<sectionStructure.subSectionCodeList.length; i++)
                removeSection(sectionStructure.subSectionCodeList[i])
        }
        deleteSection(sectionStructure.sectionCode);
    }, [deleteSection, getSection, removeCounter]);


    return useMemo(()=>{
        return { getSection, createSection, updateSubSectionList, removeSection }
    }, [getSection, createSection, updateSubSectionList, removeSection]);
}

export function useSectionTotal() {

    const { getSection } = useSectionFunctions();
    const { getTotalAndListFromCounterList } = useCounterTotal();

    const getTotalValueOfSection = useCallback(async (section?: SectionStructure)=>{
        if(section === undefined)
            return 0;
        let {totalValue} = await getTotalAndListFromCounterList(section.counters);
        let _setionStructure: SectionStructure;
       
        for(let i=0; i < section?.subSectionCodeList.length;  i++){
            _setionStructure = await getSection(section?.subSectionCodeList[i]);
            totalValue += await getTotalValueOfSection(_setionStructure);
        }

        return totalValue;
    }, [getTotalAndListFromCounterList, getSection]);

    return useMemo(()=>{
        return { getTotalValueOfSection }
    }, [getTotalValueOfSection]);
}