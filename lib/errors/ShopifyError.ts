import {ReshapedErrorType} from "@/lib/definitions/error";

export class ShopifyError extends Error {
    details: ReshapedErrorType;

    constructor(details: ReshapedErrorType) {
        super();
        this.details = details;
    }
}