import { CounterStructure, SectionStructure } from "./DataType";

export type SectionCode = string;

export type OnSelectSection = (sectionStructure: SectionStructure)=>void;

/*export type CountersOfSection = {
    countersStructure: CounterStructure[];
    countersOfSection?: CountersOfSection;
}*/

export class CountersOfSection{
    public countersStructure: CounterStructure[];
    public countersOfSection?: CountersOfSection;

    constructor(){
        this.countersStructure = [];
    }
}