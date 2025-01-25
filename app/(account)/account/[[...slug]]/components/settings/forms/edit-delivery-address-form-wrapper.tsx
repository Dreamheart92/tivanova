import DeliveryInformationForm from "@/components/forms/delivery-information-form";
import {Button} from "@/components/ui/button";
import {useShop} from "@/lib/context/shop";
import {useCart} from "@/lib/context/cart";
import {createShippingAddress, ExtendedShippingAddressSchemaErrorType} from "@/lib/actions/cart.actions";
import {useActionState, useEffect} from "react";
import {generateAddressData} from "@/lib/utils/utils";
import {ShippingAddressSchemaType} from "@/lib/validations/checkoutSchema";

export default function EditDeliveryAddressFormWrapper({onCloseDialog}: { onCloseDialog: () => void }) {
    const {cart} = useCart();
    const {availableShippingCountries} = useShop();

    const addShippingAddress = createShippingAddress.bind(null, cart, true);

    const [state, formAction, isPending] = useActionState(addShippingAddress, {
        data: generateAddressData(cart) as ShippingAddressSchemaType,
        errors: {} as ExtendedShippingAddressSchemaErrorType,
        success: false,
    });

    useEffect(() => {
        if (state.success) {
            onCloseDialog();
        }
    }, [state.success, onCloseDialog]);

    return (
        <DeliveryInformationForm
            availableShippingCountries={availableShippingCountries}
            submitButton={
                <Button
                    className='mt-2'
                    formAction={formAction}
                    loading={isPending}
                    disabled={isPending}
                >
                    Save
                </Button>
            }
            state={state}
        />
    )
}