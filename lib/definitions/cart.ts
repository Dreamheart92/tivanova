import {AddressType} from "@/lib/definitions/customer";
import {ProductType, ProductVariantType} from "@/lib/definitions/product";

export type RemoteCartLineType = {
    merchandiseId: string;
    quantity: number;
}

export type CartProductType = {
    id: string;
    cost: {
        totalAmount: CostType;
        amountPerQuantity: CostType;
    },
    quantity: number,
    merchandise: {
        product: ProductType,
    } & ProductVariantType,
}

export type CartDeliveryAddressType = {
    address: AddressType;
    id: string;
    selected: boolean;
    oneTimeUse: boolean;
}

export type CartDeliveryOptionType = {
    code: string;
    deliveryMethodType: string;
    description: string;
    estimatedCost: CostType;
    title: string;
    handle: string;
}

export type CostType = {
    amount: string;
    currencyCode: string;
}

export type CartCostType = {
    subtotalAmount: CostType;
    totalAmount: CostType;
}

export type BuyerIdentityType = {
    email: string | null;
}

export type CartType = {
    id: string,
    lines: CartProductType[],
    totalQuantity: number,
    cost: CartCostType;
    deliveryGroups: {
        deliveryOptions: CartDeliveryOptionType[];
        selectedDeliveryOption: CartDeliveryOptionType;
        id: string;
    }
    delivery: {
        addresses: CartDeliveryAddressType[];
        selectedDeliveryAddress: CartDeliveryAddressType | undefined;
    }
    buyerIdentity: BuyerIdentityType;
}