'use client';

import Input from "@/components/input";
import Box from "@/components/box";
import {signup} from "@/app/(auth)/lib/actions";
import {useFormState} from 'react-dom';
import {SignupState} from "@/app/(auth)/lib/definitions";
import ErrorMessage from "@/components/error-message";
import SubmitButton from "@/components/submit-button";

export default function SignupForm() {
    const initialState: SignupState = {message: null, errors: {}};
    const [state, formAction] = useFormState(signup, initialState);

    return (
        <form action={formAction}>
            <ErrorMessage
                style={{
                    paddingBottom: '2em',
                    textAlign: 'center',
                }}
            >
                {state?.errors?.invalid_credentials || state?.errors?.internal_error}
            </ErrorMessage>

            <Box column gap='2em' style={{width: '100%'}}>
                <Input
                    name='email'
                    label='Email address'
                    type='email'
                    error={state?.errors?.email}
                />

                <Input
                    name='password'
                    label='Password'
                    type='password'
                    error={state?.errors?.password}
                />

                <Input
                    name='first_name'
                    label='First Name'
                    error={state?.errors?.first_name}
                />

                <Input
                    name='last_name'
                    label='Last Name'
                    error={state?.errors?.last_name}
                />

                <Input
                    name='phone'
                    label='Phone'
                    defaultValue='+359'
                    type='tel'
                    error={state?.errors?.phone}
                />

                <SubmitButton>
                    Sign up
                </SubmitButton>
            </Box>
        </form>
    )
}