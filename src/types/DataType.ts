import { CounterCode } from "./CounterType";

export type SectionStructure = {
    counters: CounterCode[];
    locked: boolean;
}

export type Sections = Map<string, SectionStructure>;
export type Counters = string[];
