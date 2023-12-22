export type OnChangeCounterinput = {
    counterCode: CounterCode, newValue: number, change: number
};

export type OnChangeCounter = (input: OnChangeCounterinput)=>void;

export type CounterCode = string;
