'use server';

import {cookies} from "next/headers";
import {SETTINGS} from "@/settings";
import {fetchCustomerData} from "@/lib/api/customer.api";
import {RemoteCartLineType} from "@/lib/definitions/cart";
import {createCart} from "@/lib/api/cart.api";
import {createCartIdCookie} from "@/lib/session";

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

export const fetchCustomerCartIdAndStoreAsCookie = async (accessToken: string) => {
    const customer = await fetchCustomerData(accessToken);
    (await cookies()).set('cartId', customer.cartId);
}

export const createCartAndStoreCookie = async (accessToken?: string, lines?: RemoteCartLineType[]) => {
    const countryISO = await getCountryIso();
    const cartId = await createCart(accessToken, lines, countryISO);
    await createCartIdCookie(cartId);

    return cartId;
}