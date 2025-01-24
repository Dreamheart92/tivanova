export type FieldConfigType = {
    name: string;
    placeholder?: string;
    label: string;
}
export type FilterOptionType = {
    id: string;
    input: string;
    label: string;
    count: number;
}
export type FilterType = {
    label: string;
    type: string;
    values: FilterOptionType[];
}
export type ImageType = {
    url: string;
}