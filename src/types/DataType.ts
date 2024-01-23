import { CounterCode } from "./CounterType";
import { SectionCode } from "./SectionType";

export type SectionStructure = {
    sectionName: string;
    sectionCode: SectionCode;
    counters: CounterCode[];
    locked: boolean;
    isSubSection: boolean;
    fatherSection?: SectionCode;
    //sectionStructure? : SectionStructure;
    subSectionCodeList: SectionCode[];
}

export type SectionMap = Map<string, SectionStructure>;

export type CounterStructure = {
    counterName: string;
    counterCode: CounterCode;
    value: number;
    locked: boolean;
    // counter from which detract when this counter is increased // TO IMPLEMENT
    connectedCounter?: CounterCode;
}

export type CounterMap = Map<string, CounterStructure>;
