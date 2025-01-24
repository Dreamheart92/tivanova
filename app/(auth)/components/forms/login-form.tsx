'use client';

import FormWrapper from "@/app/(auth)/components/form-wrapper";
import InputWrapper from "@/app/(auth)/components/input-wrapper";
import {Button} from "@/components/ui/button";
import {useActionState} from "react";
import {authenticate, ExtendedLoginSchemaErrorType} from "@/lib/actions/auth.actions";
import ErrorMessage from "@/app/(auth)/components/error-message";
import {useCart} from "@/lib/context/cart";
import {useWishlist} from "@/lib/context/wishlist";
import {FieldConfigType} from "@/lib/definitions/definitions";

type LoginFormProps = {
    settings: {
        email: FieldConfigType,
        password: FieldConfigType,
        buttonCaption: string;
    }
}

const initialFormState = {
    data: {
        email: '',
        password: '',
    },
    errors: {} as ExtendedLoginSchemaErrorType,
}

export default function LoginForm({settings}: LoginFormProps) {
    const {cart: guestCart} = useCart();
    const {wishlist: guestWishlist} = useWishlist();

    const authenticateAction = authenticate.bind(null, guestCart, guestWishlist);
    const [state, formAction, isPending] = useActionState(authenticateAction, initialFormState);

    return (
        <form>
            <ErrorMessage error={state?.errors?.internalError?.[0] || state?.errors?.authError?.[0]}/>

            <FormWrapper>
                <InputWrapper
                    name={settings.email.name}
                    label={settings.email.label}
                    placeholder={settings.email.placeholder}
                    errors={state?.errors?.fieldErrors?.email}
                    defaultValue={state?.data?.email}
                />

                <InputWrapper
                    name={settings.password.name}
                    label={settings.password.label}
                    type='password'
                    errors={state?.errors?.fieldErrors?.password}
                />

                <Button
                    disabled={isPending}
                    formAction={formAction}
                    loading={isPending}
                >
                    {settings.buttonCaption}
                </Button>
            </FormWrapper>
        </form>
    )
}