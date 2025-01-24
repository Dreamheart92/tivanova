'use client';

import {createContext, use, useContext, useMemo, useOptimistic, useState} from "react";
import {AddressType, CustomerType} from "@/lib/definitions/customer";
import {useCart} from "@/lib/context/cart";
import {CartDeliveryOptionType} from "@/lib/definitions/cart";
import {generateAddressData} from "@/lib/utils/utils";
import {OrderType} from "@/lib/definitions/order";

type CheckoutContextStateType = {
    currentView: number;
    shippingAddress: AddressType;
    shippingMethod: CartDeliveryOptionType | undefined;
    session: CustomerType | null;
    orderConfirmation: OrderType | null;
    updateOrderConfirmation: (order: OrderType) => void;
    setCurrentViewIndex: (index: number) => void;
    incrementViewIndex: () => void;
    decrementViewIndex: () => void;
}

const MAX_VIEWS_INDEX = 3;

const CheckoutContext = createContext<CheckoutContextStateType | null>(null);

type CheckoutProviderProps = {
    sessionPromise: Promise<CustomerType | null>;
    children: React.ReactNode;
}

export default function CheckoutProvider(
    {
        sessionPromise,
        children,
    }: CheckoutProviderProps) {
    const {cart} = useCart();
    const session = use(sessionPromise);
    const [currentView, setCurrentView] = useState(0);
    const [shippingMethod, setShippingMethod] = useOptimistic<CartDeliveryOptionType | undefined>(cart?.deliveryGroups?.selectedDeliveryOption);
    const [shippingAddress, setShippingAddress] = useOptimistic(generateAddressData(cart));
    const [orderConfirmation, setOrderConfirmation] = useState<OrderType | null>(null);

    const handleSetCurrentViewIndex = (index: number) => {
        if (index > MAX_VIEWS_INDEX) {
            return;
        }

        setCurrentView(index);
    }

    const handleIncrementViewIndex = () => {
        setCurrentView((currentView) => {
            if (currentView + 1 > MAX_VIEWS_INDEX) {
                return currentView;
            }

            return currentView + 1;
        });
    }

    const handleDecrementViewIndex = () => {
        setCurrentView((currentView) => {
            if (currentView - 1 < 0) {
                return currentView;
            }

            return currentView - 1;
        })
    }

    const handleUpdateOrderConfirmation = (order: OrderType) => setOrderConfirmation(order);

    const checkoutContextValue = useMemo(() => ({
        currentView,
        shippingAddress,
        shippingMethod,
        session,
        orderConfirmation,
        updateOrderConfirmation: handleUpdateOrderConfirmation,
        setCurrentViewIndex: handleSetCurrentViewIndex,
        incrementViewIndex: handleIncrementViewIndex,
        decrementViewIndex: handleDecrementViewIndex,
    }), [currentView, shippingAddress, shippingMethod]);

    return (
        <CheckoutContext.Provider value={checkoutContextValue}>
            {children}
        </CheckoutContext.Provider>
    )
}

export function useCheckout() {
    const context = useContext(CheckoutContext);

    if (!context) {
        throw new Error('useCheckout must be used inside a CheckoutProvider');
    }

    return context;
}