import {SHOPIFY_ERRORS} from "@/lib/constants/errors";
import {ReshapedErrorType, ShopifyErrorType} from "@/lib/definitions/error.definitions";

export const reshapeShopifyError = (errors: ShopifyErrorType[]) => {
    return errors.reduce<ReshapedErrorType>((accumulator, error) => {
        if (SHOPIFY_ERRORS[error.code]) {
            accumulator[SHOPIFY_ERRORS[error.code].field] = [SHOPIFY_ERRORS[error.code].message];
        } else {
            accumulator.fieldErrors[error.field[1]] = [error.message]
        }

        return accumulator;
    }, {fieldErrors: {}})
}