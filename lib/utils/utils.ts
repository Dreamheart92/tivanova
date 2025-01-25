import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {AddressType} from "@/lib/definitions/customer.definitions";
import {CartDeliveryAddressType, CartType} from "@/lib/definitions/cart.definitions";
import {SearchParamsType} from "@/app/(product)/catalogue/[[...catalogueParams]]/page";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const resolveImageSize = (index: number) => {
    const isBetweenOneAndTwo = index >= 1 && index <= 2;

    return {
        width: isBetweenOneAndTwo ? 500 : 1000,
        height: isBetweenOneAndTwo ? 750 : 1500,
    }
}

export const findMetaFieldValue = (metaFieldKey: string, metaFields: [{
    key: string,
    value: string
}]) => metaFields.find((metaField) => metaField.key === metaFieldKey)?.value;

export const reshapeCustomer = (customerData: any) => ({
    id: customerData.id,
    email: customerData.email,
    firstName: customerData.firstName,
    lastName: customerData.lastName,
    phone: customerData.phone,
    cartId: findMetaFieldValue('cartId', customerData.metafields) as string,
    wishlistId: findMetaFieldValue('wishlistId', customerData.metafields) as string,
})

export const normalizeName = (name: string) => name[0].toUpperCase() + name.slice(1).toLowerCase();

export const isNewDeliveryAddress = (newDeliveryAddress: AddressType, selectedDeliveryAddress?: AddressType) => {
    if (!selectedDeliveryAddress) return true;

    const keys = Object.keys(selectedDeliveryAddress) as (keyof AddressType)[];

    // Convert null to empty string
    return keys.some((key) => (selectedDeliveryAddress[key] || '') !== (newDeliveryAddress[key] || ''));
}

export const checkIfAddressExist = (newAddress: AddressType, cartAddresses?: CartDeliveryAddressType[]) => {
    if (!cartAddresses) return null;

    for (const currentCartAddress of cartAddresses) {
        if (!isNewDeliveryAddress(newAddress, currentCartAddress.address)) {
            return currentCartAddress;
        }
    }

    return null;
}

export const generateAddressData = (cart: CartType | undefined) => ({
    countryCode: cart?.delivery?.selectedDeliveryAddress?.address?.countryCode || '',
    firstName: cart?.delivery?.selectedDeliveryAddress?.address.firstName || '',
    lastName: cart?.delivery?.selectedDeliveryAddress?.address?.lastName || '',
    address1: cart?.delivery?.selectedDeliveryAddress?.address?.address1 || '',
    address2: cart?.delivery?.selectedDeliveryAddress?.address?.address2 || '',
    zip: cart?.delivery?.selectedDeliveryAddress?.address?.zip || '',
    city: cart?.delivery?.selectedDeliveryAddress?.address?.city || '',
    phone: cart?.delivery?.selectedDeliveryAddress?.address?.phone || '',
})

export const parseSearchQuery = (search: SearchParamsType): string[] => {
    return Object.values((search)).reduce((a: string[], b: string) => {
        b.split('|').forEach((query: string) => {
            a.push(JSON.parse(query));
        })

        return a;
    }, [])
}