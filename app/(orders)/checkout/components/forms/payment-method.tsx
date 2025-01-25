'use client';

import DeliveryInfoCard from "@/app/(orders)/checkout/components/delivery-info-card";
import CheckoutStepNavigation from "@/app/(orders)/checkout/components/checkout-step-navigation";
import {createOrder} from "@/lib/actions/order.actions";
import {useCart} from "@/lib/context/cart";
import {useActionState, useEffect} from "react";
import ErrorMessage from "@/app/(auth)/components/error-message";
import {useCheckout} from "@/lib/context/checkout";

export default function PaymentMethod() {
    const {cart} = useCart();
    const {incrementViewIndex, updateOrderConfirmation} = useCheckout();
    const [state, formAction, isPending] = useActionState(createOrder, null);
    const createOrderAction = formAction.bind(null, cart);

    useEffect(() => {
        if (state?.success && state.order) {
            updateOrderConfirmation(state.order);
            incrementViewIndex();
        }
    }, [state?.success, incrementViewIndex, state?.order, updateOrderConfirmation]);

    return (
        <form>
            <DeliveryInfoCard/>
            <h2 className='py-4'>Payment Method</h2>
            <CheckoutStepNavigation
                actionLabel='Pay now'
                formAction={createOrderAction}
                loading={isPending}
            />

            {state?.message && (
                <div>
                    <ErrorMessage error={state.message}/>
                </div>
            )}
        </form>
    )
}