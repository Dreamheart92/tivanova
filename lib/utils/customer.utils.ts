'use server';

import {cookies} from "next/headers";
import {SETTINGS} from "@/lib/settings";

export const getCountryIsoBasedOnIp = async (customerIp: string) => {
    const response = await fetch(`https://get.geojs.io/v1/ip/country/${customerIp}.json`);
    const data = await response.json();

    return data.country;
}

export const getCountryIso = async () => {
    const countryISO = (await cookies()).get('countryISO')?.value;

    if (!countryISO) {
        return SETTINGS.DEFAULT_COUNTRY
    }

    return countryISO;
}
