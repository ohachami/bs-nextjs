export type TOption<T> = {
    value: T;
    label: string;
};

export type Nullable<T> = T | null;

export type MarketableConfig = {
    id?: string;
    name: string;
    color: string;
}