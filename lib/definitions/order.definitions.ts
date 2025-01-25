import {AddressType} from "@/lib/definitions/customer.definitions";
import {CostType} from "@/lib/definitions/cart.definitions";
import {SelectedProductOptionType} from "@/lib/definitions/product.definitions";

type CreateOrderLineType = {
    title: string;
    priceSet: {
        shopMoney: {
            amount: string;
            currencyCode: string;
        }
    }
    variantId: string;
    quantity: number;
}

type TransactionType = {
    kind: string;
    status: string;
    amountSet: {
        presentmentMoney: {
            amount: string;
            currencyCode: string;
        }
        shopMoney: {
            amount: string;
            currencyCode: string;
        }
    }
}

export type CreateOrderType = {
    shippingAddress: AddressType;
    lineItems: CreateOrderLineType[];
    transactions: TransactionType[];
    test: boolean;
    customerId: string | undefined;
    currency: string;
}

type FinancialStatusType =
    'PENDING'
    | 'AUTHORIZED'
    | 'PARTIALLY_PAID'
    | 'PARTIALLY_REFUNDED'
    | 'VOIDED'
    | 'PAID'
    | 'REFUNDED';

type FulfillmentStatusType =
    'UNFULFILLED'
    | 'PARTIALLY_FULFILLED'
    | 'FULFILLED'
    | 'RESTOCKED'
    | 'PENDING_FULFILLMENT'
    | 'OPEN'
    | 'IN_PROGRESS'
    | 'ON_HOLD'
    | 'SCHEDULED';

export type OrderSummaryLineType = {
    quantity: number;
    title: string;
    originalTotalPrice: CostType;
    variant: {
        id: string;
        image: {
            url: string;
        }
        price: CostType;
        selectedOptions: SelectedProductOptionType;
        sku: string;
        title: string;
        unitPrice: CostType;
    }
}

export type OrderSummaryType = {
    billingAddress: AddressType;
    currencyCode: string;
    email: string;
    financialStatus: FinancialStatusType;
    fulfillmentStatus: FulfillmentStatusType;
    name: string;
    orderNumber: number;
    phone: string;
    shippingAddress: AddressType;
    subtotalPrice: CostType;
    totalPrice: CostType;
    totalShippingPrice: CostType;
    lineItems: OrderSummaryLineType[];
    id: string;
    processedAt: string;
}

export type OrderLineItemType = {
    currentQuantity: number;
    id: string;
    image: {
        url: string;
    }
    name: string;
    originalTotalSet: {
        presentmentMoney: CostType;
        shopMoney: CostType;
    }
    originalUnitPriceSet: {
        presentmentMoney: CostType;
        shopMoney: CostType;
    }
    vendor: string;
    variant: {
        image: {
            url: string;
        }
        price: string;
        title: string;
        selectedOptions: SelectedProductOptionType[];
    }
    title: string;
    variantTitle: string;
}

export type OrderType = {
    billingAddress: AddressType | null;
    billingAddressMatchesShippingAddress: boolean;
    confirmationNumber: string;
    createdAt: string;
    currencyCode: string;
    currentSubtotalLineItemsQuantity: number;
    currentSubtotalPriceSet: {
        presentmentMoney: CostType;
        shopMoney: CostType;
    }
    currentShippingPriceSet: {
        presentmentMoney: CostType;
        shopMoney: CostType;
    }
    currentTotalPriceSet: {
        presentmentMoney: CostType;
        shopMoney: CostType;
    }
    displayFulfillmentStatus: FulfillmentStatusType;
    displayAddress: AddressType;
    email: string;
    id: string;
    lineItems: OrderLineItemType[];
}