import { CounterCode, SectionCode } from "./CounterType";

export type SectionStructure = {
    sectionName: string;
    sectionCode: SectionCode;
    counters: CounterCode[];
    locked: boolean;
    SectionStructure? : SectionStructure;
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
