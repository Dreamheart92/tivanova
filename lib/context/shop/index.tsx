'use client';

import {createContext, use, useContext, useMemo, useState} from "react";
import {AvailableShippingCountryType} from "@/lib/definitions/shop";

type ShopContextStateType = {
    shopSettings: AvailableShippingCountryType;
    availableShippingCountries: AvailableShippingCountryType[];
}

const ShopContext = createContext<ShopContextStateType | null>(null);

type ShopProviderProps = {
    countryISO: string;
    availableShippingCountriesPromise: Promise<AvailableShippingCountryType[]>;
    children: React.ReactNode;
}

const defaultShopSettings = {
    currency: {
        isoCode: 'EUR',
        name: 'Euro',
        symbol: '€'
    },
    isoCode: 'BG',
    name: 'Bulgaria',
}

export default function ShopProvider(
    {
        countryISO,
        availableShippingCountriesPromise,
        children,
    }: ShopProviderProps) {
    const availableShippingCountries = use(availableShippingCountriesPromise);

    const countrySettings = availableShippingCountries.find((country) => country.isoCode === countryISO) || defaultShopSettings;

    const [shopSettings, setShopSettings] = useState({
        ...countrySettings
    })

    const shopContextValue = useMemo(() => ({
        shopSettings,
        availableShippingCountries,
    }), [shopSettings, availableShippingCountries]);

    return (
        <ShopContext.Provider value={shopContextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export function useShop() {
    const context = useContext(ShopContext);

    if (!context) {
        throw new Error('useShop must be used inside a ShopProvider');
    }

    return context;
}