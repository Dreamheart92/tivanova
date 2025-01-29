'use client';

import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {ChevronDown} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {cva} from "class-variance-authority";
import useQueryParams from "@/hooks/useSearch";
import {useSearchParams} from "next/navigation";
import {FilterOptionType, FilterType} from "@/lib/definitions/definitions";

type CheckboxWrapperProps = {
    option: FilterOptionType;
    onSearch: (isChecked: boolean, value: string) => void;
    selected: boolean;
}

const optionStyles = cva(
    'cursor-pointer',
    {
        variants: {
            variant: {
                disabled: 'cursor-not-allowed text-stone-400',
                allowed: 'cursor-pointer text-stone-900'
            }
        }
    }
)

const CheckboxWrapper = ({option, onSearch, selected}: CheckboxWrapperProps) => {
    const isDisabled = option.count <= 0;

    const labelStyle = optionStyles({
        variant: isDisabled ? 'disabled' : 'allowed'
    })

    return (
        <div className='flex items-center gap-1 py-1'>
            <Checkbox
                disabled={isDisabled}
                id={option.id}
                onCheckedChange={(isChecked: boolean) => onSearch(isChecked, option.input)}
                checked={selected}
            />
            <label
                htmlFor={option.id}
                aria-disabled
                className={labelStyle}
            >
                {option.label}
            </label>
        </div>
    )
}

export default function Filter({filter}: { filter: FilterType }) {
    const searchParams = useSearchParams();
    const {updateQueryParam} = useQueryParams();

    const isFilterSelected = searchParams.has(filter.label.toLowerCase());
    const selectedOptions = isFilterSelected && searchParams.get(filter.label.toLowerCase())?.split('|') || [];

    const handleSearch = (isChecked: boolean, value: string) => {
        updateQueryParam(filter.label, value);
    }

    return (
        <Collapsible defaultOpen={isFilterSelected} className='py-2 group/collapsible border-b border-stone-200 mb-2'>
            <CollapsibleTrigger className='flex justify-between items-center w-full'>
                <span className='first-letter:uppercase'>{filter.label}</span>
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>
            </CollapsibleTrigger>
            <CollapsibleContent className='flex flex-col pl-2 pt-2'>
                {filter.values.map((value) => (
                    <CheckboxWrapper
                        key={value.id}
                        option={value}
                        onSearch={handleSearch}
                        selected={selectedOptions.some((selectedOptions) => selectedOptions === value.input)}
                    />
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}