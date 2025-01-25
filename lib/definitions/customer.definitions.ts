export type AddressType = {
    countryCode: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    zip: string;
    city: string;
    phone: string;
    country?: string;
}

export type CustomerType = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    token: string;
    cartId: string;
    wishlistId: string;
}
