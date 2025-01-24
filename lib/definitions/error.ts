type ErrorType = Record<string, string[]>;


export type ReshapedErrorType = {
    fieldErrors: ErrorType;
} & {
    [key: string]: string[] | ErrorType; // Allow dynamic keys and nested objects
};

export type InternalErrorType = {
    internalError: string[];
}

export type AuthenticationErrorType = {
    authError: string[];
}

export type ShopifyErrorType = {
    field: string[];
    message: string;
    code: string;
}