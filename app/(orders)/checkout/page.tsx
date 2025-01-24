'use client';

import CheckoutWrapper from "@/app/(orders)/checkout/components/checkout-wrapper";
import CheckoutHeader from "@/app/(orders)/checkout/components/checkout-header";
import OrderSummary from "@/app/(orders)/checkout/components/order-summary";
import {useCheckout} from "@/lib/context/checkout";
import OrderConfirmation from "@/app/(orders)/checkout/components/order-confirmation";
import Logo from "@/components/navigation/ui/logo";

export default function Checkout() {
    const {orderConfirmation} = useCheckout();

    if (orderConfirmation) {
        return (
            <div className='max-w-xl mx-auto pt-12'>
                <div className='pb-6'>
                    <Logo/>
                </div>
                <OrderConfirmation/>
            </div>
        )
    }

    return (
        <div className='mx-auto flex'>
            <div className='basis-1/2 p-24'>
                <CheckoutHeader/>
                <CheckoutWrapper/>
            </div>

            <div className='bg-stone-200 min-h-screen flex-1 p-24'>
                <OrderSummary/>
            </div>
        </div>
    )
}