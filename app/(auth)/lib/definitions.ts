export type SignupState = {
    errors: {
        email?: string[];
        password?: string[];
        first_name?: string[];
        last_name?: string[];
        phone?: string[];
        invalid_credentials?: string;
        internal_error?: string;
    };
    message?: string | null;
}

export type LoginState = | {
    success: false | null;
    errors: {
        email?: string[];
        password?: string[];
        invalid_credentials?: string;
        internal_error?: string;
    }
    message: string | null;
} | {
    success: true | null;
    userData: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        token: string;
        cartId: string;
        wishlist: string[];
    }
}