import {isFormError} from "@/app/(auth)/lib/type-guard";

export const getErrors = (errors: any, field: string) => isFormError(errors) && (errors?.fieldErrors as {
    [key: string]: string[]
})?.[field] || undefined;