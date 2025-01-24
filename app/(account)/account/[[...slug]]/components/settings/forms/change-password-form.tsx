'use client';

import InputWrapper from "@/app/(auth)/components/input-wrapper";
import {Button} from "@/components/ui/button";
import {useActionState, useEffect} from "react";
import {changePassword, ExtendedChangePasswordSchemaErrorType} from "@/lib/actions/customer.actions";
import ErrorMessage from "@/app/(auth)/components/error-message";

const settings = {
    password: {
        name: 'password',
        label: 'Password',
    },
    confirmPassword: {
        name: 'confirmPassword',
        label: 'Confirm password',
    },
    newPassword: {
        name: 'newPassword',
        label: 'New Password',
    }
}

type ChangePasswordFormProp = {
    onCloseDialog: () => void;
}

export default function ChangePasswordForm({onCloseDialog}: ChangePasswordFormProp) {
    const [state, formAction, isPending] = useActionState(changePassword, {
        data: {
            password: '',
            confirmPassword: '',
            newPassword: '',
        },
        errors: {} as ExtendedChangePasswordSchemaErrorType,
        success: false,
    })

    useEffect(() => {
        if (state.success) {
            onCloseDialog();
        }
    }, [state.success]);

    const errorMessage = state?.errors?.internalError?.[0];

    return (
        <form className='flex flex-col gap-4'>

            <InputWrapper
                name={settings.password.name}
                label={settings.password.label}
                type='password'
                errors={state?.errors?.fieldErrors?.password || state?.errors?.authError}
            />

            <InputWrapper
                name={settings.newPassword.name}
                label={settings.newPassword.label}
                type='password'
                errors={state?.errors?.fieldErrors?.newPassword}
            />

            <InputWrapper
                name={settings.confirmPassword.name}
                label={settings.confirmPassword.label}
                type='password'
                errors={state?.errors?.fieldErrors?.confirmPassword}
            />

            <ErrorMessage error={errorMessage}/>

            <Button formAction={formAction} loading={isPending} disabled={isPending}>Save</Button>
        </form>
    )
}