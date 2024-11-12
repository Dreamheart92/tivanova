'use client';

import {updatePassword} from "@/app/(pages)/(account)/lib/actions";
import Box from "@/components/box";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import {useFormState} from "react-dom";
import {ChangePasswordState} from "@/app/(pages)/(account)/lib/definitions";

export default function ChangePasswordForm() {
    const initialState: ChangePasswordState = {success: null, message: null, errors: {}};
    const [state, formAction] = useFormState(updatePassword, initialState);

    return (
        <form
            action={formAction}
            style={{maxWidth: '900px', width: '100%'}}
        >
            <h3>Change password</h3>

            <Box column gap='2em' style={{width: '100%', paddingTop: '2em'}}>
                <Input
                    label='Current password'
                    name='currentPassword'
                    type='password'
                    error={state?.errors?.currentPassword || state?.errors?.invalidCredentials}
                />

                <Input
                    label='New password'
                    name='newPassword'
                    type='password'
                    error={state?.errors?.newPassword}
                />

                <Input
                    label='Confirm password'
                    name='confirmPassword'
                    type='password'
                    error={state?.errors?.confirmPassword || state?.errors?.passwordsNotMatching}
                />

                <SubmitButton>
                    Save
                </SubmitButton>
            </Box>
        </form>
    )
}