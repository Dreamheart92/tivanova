'use client';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";

const useQueryParams = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const updateQueryParam = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams);

        const searchParamValues = params.get(key)?.split('|') || [];

        const searchParamValueIndex = searchParamValues.findIndex((paramValue) => paramValue === value);

        if (searchParamValueIndex === -1) {
            const updatedParamValues = [...searchParamValues, value];
            params.set(key, updatedParamValues.join('|'));
        } else {
            const updatedParamValues = searchParamValues.filter((paramValue) => paramValue !== value);

            if (updatedParamValues.length > 0) {
                params.set(key, updatedParamValues.join('|'));
            } else {
                params.delete(key);
            }
        }

        router.replace(`${pathname}?${params.toString()}`);

    }, [searchParams, pathname, router]);

    return {
        updateQueryParam,
    }
}

export default useQueryParams;
