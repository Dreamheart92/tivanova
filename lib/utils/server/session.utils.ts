'use server';

import {cookies} from "next/headers";
import {CustomerType} from "@/lib/definitions/customer.definitions";

type Customer = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    cartId: string;
    wishlistId: string;
}

export const createSession = async (customer: Customer, accessToken: string) => {
    (await cookies()).set('session', JSON.stringify({
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        token: accessToken,
        cartId: customer.cartId,
        wishlistId: customer.wishlistId
    }), {
        httpOnly: true,
        path: '/',
    })
}

export const getSession = async (): Promise<CustomerType | null> => {
    const sessionCookie = (await cookies()).get('session')?.value;

    return sessionCookie ? JSON.parse(sessionCookie) : null;
}

export const deleteSession = async () => {
    cookies().then((cookies) => cookies.delete('session'));
}

export const getCartId = async () => {
    return (await cookies()).get('cartId')?.value;
}

export const createCartIdCookie = async (cartId: string) => {
    (await cookies()).set('cartId', cartId);
}

export const deleteCartIdCookie = async () => {
    (await cookies()).delete('cartId');
}

type UpdatedCustomerDataType = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export const updateCustomerSession = async (updatedDate: UpdatedCustomerDataType) => {
    const session = await getSession();

    if (session) {
        const updatedSession = {
            ...session,
            ...updatedDate,
        }

        await createSession(updatedSession, session.token);
    }
}

export const updateCustomerAccessToken = async (accessToken: string) => {
    const session = await getSession();

    if (session) {
        (await cookies()).set('session', JSON.stringify({
            ...session,
            token: accessToken,
        }))
    }
}
