import { CounterCode } from "./CounterType";
import { SectionCode } from "./SectionType";

export type SectionStructure = {
    sectionName: string;
    sectionCode: SectionCode;
    counters: CounterCode[];
    locked: boolean;
    //sectionStructure? : SectionStructure;
    subSectionCode?: SectionCode;
}

export type Sections = Map<string, SectionStructure>;

export type CounterStructure = {
    counterName: string;
    counterCode: CounterCode;
    value: number;
    locked: boolean;
    // counter from which dectrat when this counter is increased
    connectedCounter?: CounterCode;
}

export type Counters = Map<string, CounterStructure>;
