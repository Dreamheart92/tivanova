'use client';

import FormWrapper from "@/app/(auth)/components/form-wrapper";
import InputWrapper from "@/app/(auth)/components/input-wrapper";
import {Button} from "@/components/ui/button";
import {useActionState} from "react";
import {ExtendedSignupSchemaErrorType, signup} from "@/lib/actions/auth.actions";
import ErrorMessage from "@/app/(auth)/components/error-message";
import {useCart} from "@/lib/context/cart";
import {useWishlist} from "@/lib/context/wishlist";
import {FieldConfigType} from "@/lib/definitions/definitions";

type SignupFormProps = {
    settings: {
        email: FieldConfigType;
        firstName: FieldConfigType;
        lastName: FieldConfigType;
        password: FieldConfigType;
        confirmPassword: FieldConfigType;
        phone: FieldConfigType;
        buttonCaption: string;
    }
}

const initialFormState = {
    data: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
    },
    errors: {} as ExtendedSignupSchemaErrorType,
}

export default function SignupForm({settings}: SignupFormProps) {
    const {cart: guestCart} = useCart();
    const {wishlist: guestWishlist} = useWishlist();

    const signupAction = signup.bind(null, guestCart, guestWishlist);

    const [state, formAction, isPending] = useActionState(signupAction, initialFormState);

    const errorMessage = state?.errors?.authError?.[0] || state?.errors?.internalError?.[0];

    return (
        <form>
            <ErrorMessage error={errorMessage}/>

            <FormWrapper>
                <InputWrapper
                    name={settings.email.name}
                    label={settings.email.label}
                    placeholder={settings.email.placeholder}
                    errors={state?.errors?.fieldErrors?.email}
                    defaultValue={state?.data?.email}
                    type='email'
                />

                <InputWrapper
                    name={settings.firstName.name}
                    label={settings.firstName.label}
                    placeholder={settings.firstName.placeholder}
                    defaultValue={state?.data?.firstName}
                    errors={state?.errors?.fieldErrors?.firstName}
                />

                <InputWrapper
                    name={settings.lastName.name}
                    label={settings.lastName.label}
                    placeholder={settings.lastName.placeholder}
                    defaultValue={state?.data?.lastName}
                    errors={state?.errors?.fieldErrors?.lastName}
                />

                <InputWrapper
                    name={settings.phone.name}
                    label={settings.phone.label}
                    placeholder={settings.phone.placeholder}
                    defaultValue={state?.data?.phone}
                    errors={state?.errors?.fieldErrors?.phone}
                />

                <InputWrapper
                    name={settings.password.name}
                    label={settings.password.label}
                    errors={state?.errors?.fieldErrors?.password}
                    type='password'
                />

                <InputWrapper
                    name={settings.confirmPassword.name}
                    label={settings.confirmPassword.label}
                    errors={state?.errors?.fieldErrors?.confirmPassword}
                    type='password'
                />

                <Button
                    loading={isPending}
                    disabled={isPending}
                    formAction={formAction}
                >
                    {settings.buttonCaption}
                </Button>
            </FormWrapper>
        </form>
    )
}