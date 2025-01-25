'use client';

import DeliveryMethod from "@/app/(orders)/checkout/components/forms/delivery-method";
import CheckoutDeliveryInformationFormWrapper from "@/app/(orders)/checkout/components/forms/delivery-information";
import PaymentMethod from "@/app/(orders)/checkout/components/forms/payment-method";
import {useCheckout} from "@/lib/context/checkout";

const checkoutViews = [
    <CheckoutDeliveryInformationFormWrapper key='delivery-information'/>,
    <DeliveryMethod key='delivery-method'/>,
    <PaymentMethod key='payment-method'/>,
]

export default function CheckoutWrapper() {
    const {currentView} = useCheckout();

    return (
        <div className='pt-6'>
            {checkoutViews[currentView]}
        </div>
    )
}