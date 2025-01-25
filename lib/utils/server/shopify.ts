'use server';

import {cookies} from "next/headers";
import {SETTINGS} from "@/settings";
import {QUERY} from "@/lib/constants/query";

export const applyCountryIsoToQuery = async (query: string) => {
    const countryISO = (await cookies()).get('countryISO')?.value || SETTINGS.DEFAULT_COUNTRY;

    return query.replace(QUERY.COUNTRY_ISO_REPLACEMENT_KEY, countryISO);
}