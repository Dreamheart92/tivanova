'use server';

import {
    createCartIdCookie,
    createSession,
    deleteCartIdCookie,
    deleteSession,
    getSession,
} from "@/lib/session";
import {isRedirectError} from "next/dist/client/components/redirect-error";
import {createCustomer, createCustomerAccessToken, deleteCustomerAccessToken} from "@/lib/api/auth.api";
import {redirect} from "next/navigation";
import {
    createWishlistAndStoreCookie,
    createWishlistCookie,
    deleteWishlistCookie,
    transferGuestWishlistToCustomer
} from "@/lib/actions/wishlist.actions";
import {
    loginSchema,
    LoginSchemaErrorType,
    LoginSchemaType,
    signupSchema,
    SignupSchemaErrorType,
    SignupSchemaType,
} from "@/lib/validations/accountSchema";
import {Wishlist} from "@/lib/context/wishlist";
import {fetchCustomerData, storeCartAndWishlistIdsToCustomer} from "@/lib/api/customer.api";
import {
    convertProductToShopifyCartLines, createCartAndStoreCookie,
    getProductsIds,
    transferGuestCartToCustomerCart
} from "@/lib/utils/cart.utils";
import {ShopifyError} from "@/lib/errors/ShopifyError";
import {AuthenticationErrorType, InternalErrorType} from "@/lib/definitions/error";
import {CartType} from "@/lib/definitions/cart";


export type ExtendedLoginSchemaErrorType = LoginSchemaErrorType & AuthenticationErrorType & InternalErrorType;

type State = {
    data?: LoginSchemaType,
    errors?: ExtendedLoginSchemaErrorType,
}

const createAuthenticateResponse = (data: any, errors: any) => ({
    data: data as LoginSchemaType,
    errors: errors as ExtendedLoginSchemaErrorType,
})

export const authenticate = async (guestCart: CartType | undefined, guestWishlist: Wishlist | undefined, state: State, formData: FormData) => {
    const data = Object.fromEntries(formData);
    const result = loginSchema.safeParse(data);

    if (!result.success) {
        return createAuthenticateResponse(data, result.error.formErrors);
    }

    try {
        const accessToken = await createCustomerAccessToken(result.data.email, result.data.password);
        const customer = await fetchCustomerData(accessToken);

        guestCart && await transferGuestCartToCustomerCart(customer.cartId, guestCart);
        guestWishlist && await transferGuestWishlistToCustomer(customer.wishlistId, guestWishlist.lines);

        await Promise.all([
            createCartIdCookie(customer.cartId),
            createWishlistCookie(customer.wishlistId),
            createSession(customer, accessToken),
        ])

        redirect('/');
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof ShopifyError) {
            return createAuthenticateResponse(data, {...error.details});
        }
    }

    return createAuthenticateResponse(data, {
        internalError: ['Something went wrong. Please try again.']
    })
}

export type ExtendedSignupSchemaErrorType = SignupSchemaErrorType & AuthenticationErrorType & InternalErrorType;

type SignupState = {
    data: SignupSchemaType,
    errors: ExtendedSignupSchemaErrorType,
}

const createSignupResponse = (data: any, errors: any) => ({
    data: data as SignupSchemaType,
    errors: errors as ExtendedSignupSchemaErrorType,
})

export const signup = async (guestCart: CartType | undefined, guestWishlist: Wishlist | undefined, state: SignupState, formData: FormData) => {
    const data = Object.fromEntries(formData);
    const result = signupSchema.safeParse(data);

    if (!result.success) {
        return createSignupResponse(data, result.error.formErrors);
    }

    try {
        const {customer} = await createCustomer({
            email: result.data.email,
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            phone: result.data.phone,
            password: result.data.password,
        });

        const accessToken = await createCustomerAccessToken(result.data.email, result.data.password);

        const cartLines = guestCart && convertProductToShopifyCartLines(guestCart.lines);
        const wishlistLines = guestWishlist && getProductsIds(guestWishlist.lines);

        const cartId = await createCartAndStoreCookie(accessToken, cartLines || []);
        const wishlistId = await createWishlistAndStoreCookie(customer.id, wishlistLines);

        await Promise.all([
            storeCartAndWishlistIdsToCustomer(customer.id, cartId, wishlistId),
            createSession(customer, accessToken),
        ])

        redirect('/');
    } catch (error) {

        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof ShopifyError) {
            return createSignupResponse(result.data, {...error.details});
        }

        return createSignupResponse(data, {
            internalError: ['Something went wrong. Please try again.']
        })
    }
}

//TODO: Handle guest cart creation delay

export const logout = async () => {
    const session = await getSession();

    if (session !== null) {
        try {
            await Promise.all([
                deleteCustomerAccessToken(session.token),
                deleteSession(),
                deleteCartIdCookie(),
                deleteWishlistCookie(),
            ])

            redirect('/');
        } catch (error) {
            if (isRedirectError(error)) {
                throw error;
            }
        }
    }
}
