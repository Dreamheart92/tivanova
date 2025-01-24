'use client';

import InputWrapper from "@/app/(auth)/components/input-wrapper";
import {Button} from "@/components/ui/button";
import {useActionState, useEffect} from "react";
import {ExtendedUpdateCustomerSchemaErrorType, updateCustomerAction} from "@/lib/actions/customer.actions";
import ErrorMessage from "@/app/(auth)/components/error-message";

const settings = {
    firstName: {
        name: 'firstName',
        label: 'First name',
    },
    lastName: {
        name: 'lastName',
        label: 'Last name',
    },
    email: {
        name: 'email',
        label: 'Email',
    },
    phone: {
        name: 'phone',
        label: 'Phone',
    }
}

type EditProfileFormProps = {
    customerData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    },
    onCloseDialog: () => void;
}

export default function EditProfileForm({customerData, onCloseDialog}: EditProfileFormProps) {
    const [state, formAction, isPending] = useActionState(updateCustomerAction, {
        data: {
            ...customerData,
        },
        errors: {} as ExtendedUpdateCustomerSchemaErrorType,
        success: false,
    });

    const errorMessage = state?.errors?.internalError?.[0];

    useEffect(() => {
        if (state.success) {
            onCloseDialog();
        }
    }, [state.success]);

    return (
        <form className='flex flex-col gap-4'>
            <InputWrapper
                name={settings.firstName.name}
                label={settings.firstName.label}
                defaultValue={state.data.firstName}
                errors={state?.errors?.fieldErrors?.firstName}
            />

            <InputWrapper
                name={settings.lastName.name}
                label={settings.lastName.label}
                defaultValue={state.data.lastName}
                errors={state?.errors?.fieldErrors?.lastName}
            />

            <InputWrapper
                name={settings.email.name}
                label={settings.email.label}
                defaultValue={state.data.email}
                errors={state?.errors?.fieldErrors?.email}
            />

            <InputWrapper
                name={settings.phone.name}
                label={settings.phone.label}
                defaultValue={state.data.phone}
                errors={state?.errors?.fieldErrors?.phone}
            />

            <ErrorMessage error={errorMessage}/>

            <Button formAction={formAction} loading={isPending} disabled={isPending}>Save</Button>
        </form>
    )
}