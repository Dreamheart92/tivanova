'use server';

import {z} from 'zod';
import {updateProfileService} from "@/lib/services/customer-service";
import {getSession, updateUserSession} from "@/lib/session";
import {redirect} from "next/navigation";
import {isRedirectError} from "next/dist/client/components/redirect";
import {ChangePasswordState, UpdateProfileState} from "@/app/(pages)/(account)/lib/definitions";
import {createUserAccessToken} from "@/lib/services/auth-service";

const ChangePasswordSchema = z.object({
    currentPassword: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password shouldn\'t be more than 20 characters'),
    newPassword: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password shouldn\'t be more than 20 characters'),
    confirmPassword: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password shouldn\'t be more than 20 characters'),
})

const UpdateProfileSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
    firstName: z.string()
        .min(2, 'First name must be at least 2 characters')
        .max(20, 'First name shouldn\'t be more than 20 characters'),
    lastName: z.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(20, 'Last name shouldn\'t be more than 20 characters'),
    phone: z.string().length(13, 'Phone is incorrect'),
})

export const updateProfile = async (state: UpdateProfileState, formData: FormData) => {
    const validateFields = UpdateProfileSchema.safeParse({
        email: formData.get('email'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phone: formData.get('phone'),
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Incorrect fields. Failed to update user',
            success: false,
        }
    }

    try {
        const updatedData = await updateProfileService({
            email: validateFields.data.email,
            firstName: validateFields.data.firstName,
            lastName: validateFields.data.lastName,
            phone: validateFields.data.phone,
        });

        if (updatedData.success) {
            await updateUserSession(updatedData.data);
            redirect('/account');
        }

    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
    }

    return state;
}

export const updatePassword = async (state: ChangePasswordState, formData: FormData): Promise<ChangePasswordState> => {
    const validateFields = ChangePasswordSchema.safeParse({
        currentPassword: formData.get('currentPassword'),
        newPassword: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword'),
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Incorrect fields. Failed to change password',
            success: false,
        }
    }

    const data = {
        currentPassword: validateFields.data.currentPassword,
        newPassword: validateFields.data.newPassword,
        confirmPassword: validateFields.data.confirmPassword,
    }

    if (data.newPassword !== data.confirmPassword) {
        return {
            success: false,
            errors: {
                passwordsNotMatching: ['Passwords do not match'],
            },
            message: 'Passwords do not match'
        }
    }

    const session = await getSession();

    if (typeof session?.user !== 'undefined') {
        try {
            await createUserAccessToken(session.user.email, data.currentPassword);
            await updateProfileService({password: data.newPassword});
            redirect(`/account`);
        } catch (error: unknown) {
            if (isRedirectError(error)) {
                throw error;
            }

            if (error instanceof Error && error?.message === '409') {
                return {
                    success: false,
                    errors: {
                        invalidCredentials: ['Invalid password'],
                    },
                    message: 'Invalid credentials',
                }
            }
            // TODO : Handle error

        }
    }
    return {...state};
}