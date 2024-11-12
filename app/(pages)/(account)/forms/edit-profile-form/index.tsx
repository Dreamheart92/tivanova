'use client';

import Box from "@/components/box";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import {UserData} from "@/lib/definitions";
import {useState} from "react";
import {updateProfile} from "@/app/(pages)/(account)/lib/actions";
import {UpdateProfileState} from "@/app/(pages)/(account)/lib/definitions";
import {useFormState} from "react-dom";

export default function EditProfileForm({userData}: { userData: UserData }) {
    const initialState: UpdateProfileState = {message: null, errors: {}, success: null};
    const [state, formAction] = useFormState(updateProfile, initialState);
    const [isEdited, setIsEdited] = useState<boolean>(false);

    const handleIsEdited = () => {
        if (!isEdited) {
            setIsEdited(true);
        }
    }

    return (
        <form
            action={formAction}
            style={{
                maxWidth: '900px',
                width: '100%',
            }}
        >
            <h3>Edit profile</h3>

            <Box column gap='2em' style={{width: '100%', paddingTop: '2em'}}>
                <Input
                    name='email'
                    label='Email address'
                    type='email'
                    defaultValue={userData.email}
                    onChange={handleIsEdited}
                    error={state?.errors?.email}
                />

                <Input
                    name='firstName'
                    label='First Name'
                    defaultValue={userData.firstName}
                    onChange={handleIsEdited}
                    error={state?.errors?.firstName}
                />

                <Input
                    name='lastName'
                    label='Last Name'
                    defaultValue={userData.lastName}
                    onChange={handleIsEdited}
                    error={state?.errors?.lastName}
                />

                <Input
                    name='phone'
                    label='Phone'
                    defaultValue={userData.phone}
                    type='tel'
                    onChange={handleIsEdited}
                    error={state?.errors?.phone}
                />

                <SubmitButton disabled={!isEdited}>
                    Save
                </SubmitButton>
            </Box>
        </form>
    )
}