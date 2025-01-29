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
            <div className='max-w-xl mx-auto bg-white p-4 md:pt-12 text-sm md:text-base'>
                <div className='pb-6'>
                    <Logo/>
                </div>
                <OrderConfirmation/>
            </div>
        )
    }

    return (
        <div className='mx-auto gap-4 md:gap-0 flex flex-wrap p-4 md:p-0 md:flex-nowrap text-sm md:text-base'>
            <div className='basis-full md:basis-1/2 md:p-24 order-2 md:order-1'>
                <CheckoutHeader/>
                <CheckoutWrapper/>
            </div>

            <div className='border md:border-none md:bg-stone-200 md:min-h-screen flex-1 p-4 rounded-md md:p-24 order-1 md:order-2'>
                <OrderSummary/>
            </div>
        </div>
    )
}