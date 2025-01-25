'use server';

import {
    changePasswordSchema,
    ChangePasswordSchemaErrorType,
    ChangePasswordSchemaType,
    updateCustomerSchema,
    UpdateCustomerSchemaErrorType,
    UpdateCustomerSchemaType
} from "@/lib/validations/accountSchema";
import {getSession, updateCustomerAccessToken, updateCustomerSession} from "@/lib/session";
import {updateCustomer} from "@/lib/api/customer.api";
import {isRedirectError} from "next/dist/client/components/redirect-error";
import {createCustomerAccessToken} from "@/lib/api/auth.api";
import {ShopifyError} from "@/lib/errors/ShopifyError";
import {AuthenticationErrorType, InternalErrorType} from "@/lib/definitions/error.definitions";

export type ExtendedUpdateCustomerSchemaErrorType =
    UpdateCustomerSchemaErrorType
    & AuthenticationErrorType
    & InternalErrorType;

type UpdateCustomerState = {
    data: UpdateCustomerSchemaType,
    errors: ExtendedUpdateCustomerSchemaErrorType,
    success: boolean,
}

const createCustomerUpdateResponse = (data: any, errors: any, success: boolean) => ({
    data: data as UpdateCustomerSchemaType,
    errors: errors as ExtendedUpdateCustomerSchemaErrorType,
    success,
})

export const updateCustomerAction = async (state: UpdateCustomerState, formData: FormData) => {
    const data = Object.fromEntries(formData);
    const result = updateCustomerSchema.safeParse(data);

    if (!result.success) {
        return createCustomerUpdateResponse(data, result.error.formErrors, false);
    }

    try {
        const session = await getSession();

        if (!session) {
            return createCustomerUpdateResponse(
                result.data,
                {
                    internalError: ['Unable to update your details because your session has expired. Please log in again.']
                },
                false
            )
        }

        const {customer} = await updateCustomer(result.data, session.token);
        await updateCustomerSession(customer);

        return createCustomerUpdateResponse(result.data, {}, true);

    } catch (error) {
        if (error instanceof ShopifyError) {
            return createCustomerUpdateResponse(result.data, {...error.details}, false);
        }

        return createCustomerUpdateResponse(
            result.data,
            {
                internalError: ['Something went wrong. Please try again.'],
            },
            false
        );
    }
}

export type ExtendedChangePasswordSchemaErrorType =
    ChangePasswordSchemaErrorType
    & AuthenticationErrorType
    & InternalErrorType;

type ChangePasswordStateType = {
    data: ChangePasswordSchemaType,
    errors: ExtendedChangePasswordSchemaErrorType,
    success: boolean,
}

const createChangePasswordResponse = (data: any, errors: any, success: boolean) => ({
    data: data as ChangePasswordSchemaType,
    errors: errors as ExtendedChangePasswordSchemaErrorType,
    success,
})

export const changePassword = async (state: ChangePasswordStateType, formData: FormData) => {
    const data = Object.fromEntries(formData);
    const result = changePasswordSchema.safeParse(data);

    if (!result.success) {
        return createChangePasswordResponse(data, result.error, false);
    }

    try {
        const session = await getSession();

        if (!session) {
            return createChangePasswordResponse(
                result.data,
                {
                    internalError: ['Unable to update your details because your session has expired. Please log in again.']
                },
                false
            )
        }

        await createCustomerAccessToken(session.email, result.data.password);
        const {customerAccessToken} = await updateCustomer({password: result.data.newPassword}, session.token);
        await updateCustomerAccessToken(customerAccessToken.accessToken);

        return createChangePasswordResponse(result.data, {}, true);

    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof ShopifyError) {
            if (error.details?.authError) {
                error.details.authError = ['Invalid password'];
            }

            return createChangePasswordResponse({}, {...error.details}, false);
        }

        return createChangePasswordResponse(
            {},
            {
                internalError: ['Something went wrong. Please try again.'],
            },
            false
        )
    }
}