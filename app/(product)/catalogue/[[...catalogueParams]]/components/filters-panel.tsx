import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import Filter from "@/app/(product)/catalogue/[[...catalogueParams]]/components/filter";
import ClearFiltersButton from "@/app/(product)/catalogue/[[...catalogueParams]]/components/clear-filters-button";

import {FilterType} from "@/lib/definitions/definitions";

const Filters = ({filters}: { filters: FilterType[] }) => {
    return (
        <div className='basis-4/5 overflow-y-auto overflow-x-hidden'>
            {filters.map((filter) => (
                <Filter key={filter.label} filter={filter}/>
            ))}
        </div>
    )
}

type FiltersPanelProps = {
    toggleFiltersLabel: string;
    clearQueryButtonLabel: string;
    filters: FilterType[];
}

export default function FiltersPanel({toggleFiltersLabel, clearQueryButtonLabel, filters}: FiltersPanelProps) {
    return (
        <Sheet>
            <SheetTrigger className='text-sm lg:text-base pl-2 lg:pl-0 pb-4'>FILTERS</SheetTrigger>
            <SheetContent className='overflow-y-scroll flex flex-col text-sm lg:text-base'>
                <SheetHeader className='basis-1/12'>
                    <SheetTitle className='text-left'>{toggleFiltersLabel}</SheetTitle>
                </SheetHeader>
                <Filters filters={filters}/>
                <ClearFiltersButton label={clearQueryButtonLabel}/>
            </SheetContent>
        </Sheet>
    )
}