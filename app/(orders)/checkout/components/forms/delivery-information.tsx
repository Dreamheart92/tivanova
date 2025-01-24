'use client';

import {useActionState, useEffect} from "react";
import {useCheckout} from "@/lib/context/checkout";
import CheckoutStepNavigation from "@/app/(orders)/checkout/components/checkout-step-navigation";
import {useShop} from "@/lib/context/shop";
import {useCart} from "@/lib/context/cart";
import {createShippingAddress, ExtendedShippingAddressSchemaErrorType} from "@/lib/actions/cart.actions";
import DeliveryInformationForm from "@/components/forms/delivery-information-form";
import {ShippingAddressSchemaType} from "@/lib/validations/checkoutSchema";

export default function CheckoutDeliveryInformationFormWrapper() {
    const {cart} = useCart();
    const {availableShippingCountries} = useShop();
    const {shippingAddress, incrementViewIndex, session} = useCheckout();

    const addShippingAddressAction = createShippingAddress.bind(null, cart, !!session);

    const stateDate = session ? shippingAddress : {
        ...shippingAddress,
        email: cart?.buyerIdentity.email,
    } as ShippingAddressSchemaType

    const [state, formAction, isPending] = useActionState(addShippingAddressAction, {
        data: stateDate,
        errors: {} as ExtendedShippingAddressSchemaErrorType,
        success: false,
    });

    useEffect(() => {
        if (state.success) {
            incrementViewIndex();
        }
    }, [state.success]);

    return (
        <DeliveryInformationForm
            availableShippingCountries={availableShippingCountries}
            submitButton={
                <CheckoutStepNavigation
                    formAction={formAction}
                    actionLabel='Continue to shipping'
                    loading={isPending}
                />
            }
            state={state}
            isLoggedIn={!!session}
        />
    )
}
