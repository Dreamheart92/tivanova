export type ChangePasswordState = {
    success: boolean | null;
    errors: {
        currentPassword?: string[];
        newPassword?: string[];
        confirmPassword?: string[];
        passwordsNotMatching?: string[];
        invalidCredentials?: string[];
    }
    message: string | null;
};

export type UpdateProfileState = {
    success: boolean | null;
    errors: {
        email?: string[];
        firstName?: string[];
        lastName?: string[];
        phone?: string[];
    }
    message: string | null;
}