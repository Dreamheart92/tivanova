'use server';

import {
    addToCart,
    cartBuyerIdentityUpdate,
    cartDeliveryAddressesAdd,
    cartDeliveryAddressesUpdate,
    cartLinesRemove,
    cartSelectedDeliveryOptionsUpdate,
} from "@/lib/api/cart.api";
import {revalidateTag} from "next/cache";
import {TAGS} from "@/lib/constants/tags";
import {getCartId} from "@/lib/session";
import {
    shippingAddressSchema,
    ShippingAddressSchemaErrorType,
    ShippingAddressSchemaType,
    shippingMethodSchema,
    ShippingMethodSchemaErrorType,
    ShippingMethodSchemaType
} from "@/lib/validations/checkoutSchema";
import {checkIfAddressExist} from "@/lib/utils/utils";
import {CartType, RemoteCartLineType} from "@/lib/definitions/cart.definitions";
import {InternalErrorType} from "@/lib/definitions/error.definitions";

export const addItem = async (prevState: any, lines: RemoteCartLineType[] | undefined) => {
    if (!lines) {
        return 'Failed to add to cart: Product is missing';
    }

    const cartId = await getCartId();

    if (!cartId) {
        return 'Failed to fetch cart';
    }

    try {
        await addToCart(lines, cartId);
        revalidateTag(TAGS.CART);
    } catch (error) {
        return 'Failed to add to cart';
    }
}

export const removeFromCart = async (state: any, variantId: string) => {
    const cartId = await getCartId();

    if (!cartId) {
        return 'We encountered an issue retrieving your cart. Please refresh the page or try again later.'
    }

    try {
        await cartLinesRemove(cartId, [variantId]);
        revalidateTag(TAGS.CART);
    } catch (error) {
        return 'An error occurred while removing the item from your cart. Please try again.'
    }
}

export type ExtendedShippingAddressSchemaErrorType = ShippingAddressSchemaErrorType & InternalErrorType;

export type CreateShippingAddressType = {
    data: ShippingAddressSchemaType,
    errors: ExtendedShippingAddressSchemaErrorType,
    success: boolean,
}

const createShippingAddressResponse = (data: any, errors: any, success: boolean) => ({
    data: data as ShippingAddressSchemaType,
    errors: errors as ExtendedShippingAddressSchemaErrorType,
    success,
})

export const createShippingAddress = async (
    cart: CartType | undefined,
    isLoggedIn: boolean,
    state: CreateShippingAddressType,
    formData: FormData
) => {
    if (!cart) {
        return createShippingAddressResponse(
            state.data,
            {
                internalError: ['We encountered an issue retrieving your cart. Please refresh the page or try again later.'],
            },
            false
        )
    }

    const data = Object.fromEntries(formData);
    const result = shippingAddressSchema.refine(
        (data) => {
            return !(!isLoggedIn && !data.email);
        },
        {
            message: 'Email is required',
            path: ['email'],
        }
    ).safeParse(data);

    if (!result.success) {
        return createShippingAddressResponse(data, result.error.formErrors, false);
    }

    const existingAddress = checkIfAddressExist(result.data, cart.delivery.addresses);

    try {
        if (existingAddress) {
            if (!existingAddress.selected) {
                await cartDeliveryAddressesUpdate(existingAddress, cart.id);
            }
        } else {
            await cartDeliveryAddressesAdd(cart.id, {
                firstName: result.data.firstName,
                lastName: result.data.lastName,
                phone: result.data.phone,
                zip: result.data.zip,
                address1: result.data.address1,
                address2: result.data.address2,
                city: result.data.city,
                countryCode: result.data.countryCode
            });
        }

        if (!isLoggedIn && cart?.buyerIdentity?.email !== result.data.email) {
            await cartBuyerIdentityUpdate(cart.id, {
                email: result.data.email || null,
            });
        }

        revalidateTag(TAGS.CART);

        return createShippingAddressResponse(result.data, {}, true);
    } catch (error) {
        return createShippingAddressResponse(
            result.data,
            {
                internalError: ['An unexpected error occurred while saving the shipping address. Please try again later.']
            },
            false
        )
    }
}


type DeliveryContextType = {
    deliveryGroupId: string | undefined;
    currentDeliveryOptionHandle: string | undefined;
}

export type ExtendedShippingMethodSchemaErrorType = ShippingMethodSchemaErrorType & InternalErrorType;

type SelectDeliveryOptionStateType = {
    data: ShippingMethodSchemaType,
    errors: ExtendedShippingMethodSchemaErrorType,
    success: boolean;
}

const createSelectDeliveryOptionResponse = (data: any, errors: any, success: boolean) => ({
    data: data as ShippingMethodSchemaType,
    errors: errors as ExtendedShippingMethodSchemaErrorType,
    success,
})

export const selectDeliveryOption = async (deliveryContext: DeliveryContextType, state: SelectDeliveryOptionStateType, formData: FormData) => {
    const data = Object.fromEntries(formData);

    const cartId = await getCartId();

    if (!cartId) {
        return createSelectDeliveryOptionResponse(
            data,
            {
                internalError: ['We encountered an issue retrieving your cart. Please refresh the page or try again.']
            },
            false
        );
    }

    const result = shippingMethodSchema.safeParse(data);

    if (!result.success) {
        return createSelectDeliveryOptionResponse(data, result.error.formErrors, false);
    }

    try {
        if (data.shippingMethod !== deliveryContext.currentDeliveryOptionHandle && deliveryContext.deliveryGroupId) {
            await cartSelectedDeliveryOptionsUpdate(cartId, deliveryContext.deliveryGroupId, result.data.shippingMethod);
            revalidateTag(TAGS.CART);
        }

        return createSelectDeliveryOptionResponse(result.data, {}, true);
    } catch (error) {
        return createSelectDeliveryOptionResponse(
            result.data,
            {
                internalError: ['An unexpected error occurred while saving your shipping method. Please try again.']
            },
            false
        );
    }
}


