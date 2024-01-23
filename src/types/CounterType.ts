export type OnChangeCounterInput = {
    counterCode: CounterCode, newValue: number, change: number
};

export type OnChangeCounter = (input: OnChangeCounterInput)=>void;

export type CounterCode = string;
