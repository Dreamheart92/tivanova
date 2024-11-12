'use server';

import {z} from 'zod';
import {LoginState, SignupState} from "@/app/(auth)/lib/definitions";
import {client} from "@/lib/shopify";
import {isRedirectError} from "next/dist/client/components/redirect";
import {createUserAccessToken} from "@/lib/services/auth-service";
import {createCartService} from "@/lib/services/cart-service";
import {setSession} from "@/lib/session";
import {redirect} from "next/navigation";

const SignUpSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password shouldn\'t be more than 20 characters'),
    first_name: z.string()
        .min(2, 'First name must be at least 2 characters')
        .max(20, 'First name shouldn\'t be more than 20 characters'),
    last_name: z.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(20, 'Last name shouldn\'t be more than 20 characters'),
    phone: z.string().length(13, 'Phone is incorrect'),
})

const LoginSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password shouldn\'t be more than 20 characters'),
})

export const signup = async (previousState: SignupState | undefined, formData: FormData): Promise<SignupState | undefined> => {
    const validateFields = SignUpSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        phone: formData.get('phone'),
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Incorrect fields. Failed to signup.'
        }
    }

    try {
        const userData = {
            email: validateFields.data.email,
            firstName: validateFields.data.first_name,
            lastName: validateFields.data.last_name,
            password: validateFields.data.password,
            phone: validateFields.data.phone,
        }

        const {data, errors} = await client.request(`mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          firstName
          lastName
          email
          phone
          id
        }
        customerUserErrors {
          field
          message
          code
        }
      }
    }`, {
            variables: {
                input: userData,
            }
        })

        if (errors) {
            return {
                errors: {
                    internal_error: 'Something went wrong. Please try again.',
                },
                message: 'Internal server error',
            }
        }


        if (data.customerCreate.customerUserErrors.length > 0) {
            return {
                errors: {
                    invalid_credentials: data.customerCreate.customerUserErrors[0].message,
                },
                message: 'Invalid credentials',
            }
        }

        const accessToken = await createUserAccessToken(validateFields.data.email, validateFields.data.password);
        const cartId = await createCartService(accessToken, data.customerCreate.customer.id);

        const userCookie = {
            id: data.customerCreate.customer.id,
            email: data.customerCreate.customer.email,
            firstName: data.customerCreate.customer.firstName,
            lastName: data.customerCreate.customer.lastName,
            phone: data.customerCreate.customer.phone,
            token: accessToken,
            cartId,
        }

        await setSession(userCookie);

        redirect('/');

    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof Error && error?.message === '409') {
            return {
                errors: {
                    invalid_credentials: 'Incorrect email or password'
                },
                message: 'Invalid credentials',
            }
        }

        return {
            errors: {
                internal_error: 'Something went wrong. Please try again.',
            },
            message: 'Internal server error',
        }
    }
}

export const authenticate = async (previousState: LoginState | undefined, formData: FormData): Promise<LoginState | undefined> => {
    const validateFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validateFields.success) {
        return {
            success: false,
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Incorrect fields. Failed to login.'
        }
    }

    try {
        const accessToken = await createUserAccessToken(validateFields.data.email, validateFields.data.password);

        const {data} = await client.request(`
        {
  customer(customerAccessToken: "${accessToken}") {
    email
    firstName
    lastName
    phone
    id
    metafields(identifiers: [
    {key: "cartId", namespace: "custom"},
    {key: "wishlist", namespace: "custom"},
    ]) {
      key
      value
    }
  }
}`)
        const userData = {
            id: data.customer.id,
            email: data.customer.email,
            firstName: data.customer.firstName,
            lastName: data.customer.lastName,
            phone: data.customer.phone,
            token: accessToken,
            cartId: data.customer.metafields[0].value,
            wishlist: typeof data?.customer?.metafields[1]?.value === 'undefined' ? [] : JSON.parse(data.customer.metafields[1].value),
        }

        return {
            success: true,
            userData,
        }

    } catch (error: unknown) {
        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof Error && error?.message === '409') {
            return {
                success: false,
                errors: {
                    invalid_credentials: 'Incorrect email or password'
                },
                message: 'Invalid credentials',
            }
        }

        return {
            success: false,
            errors: {
                internal_error: 'Something went wrong. Please try again.',
            },
            message: 'Internal error',
        }
    }
}