import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useCheckout} from "@/lib/context/checkout";
import {useActionState, useEffect} from "react";
import DeliveryInfoCard from "@/app/(orders)/checkout/components/delivery-info-card";
import CheckoutStepNavigation from "@/app/(orders)/checkout/components/checkout-step-navigation";
import {useCart} from "@/lib/context/cart";
import {ShippingMethodSchemaType} from "@/lib/validations/checkoutSchema";
import {ExtendedShippingMethodSchemaErrorType, selectDeliveryOption} from "@/lib/actions/cart.actions";
import ErrorMessage from "@/app/(auth)/components/error-message";


export default function DeliveryMethod() {
    const {cart} = useCart();
    const {shippingMethod, incrementViewIndex} = useCheckout();

    const formAction = selectDeliveryOption.bind(null, {
        deliveryGroupId: cart?.deliveryGroups?.id,
        currentDeliveryOptionHandle: cart?.deliveryGroups.selectedDeliveryOption.handle,
    });

    const [state, selectDeliveryOptionAction, isPending] = useActionState(formAction, {
        data: {
            shippingMethod: shippingMethod?.handle,
        } as ShippingMethodSchemaType,
        errors: {} as ExtendedShippingMethodSchemaErrorType,
        success: false,
    });

    useEffect(() => {
        if (state.success) {
            incrementViewIndex();
        }
    }, [state.success, incrementViewIndex]);

    return (
        <form>
            <DeliveryInfoCard/>
            <div>
                <h2 className='py-4'>Shipping method</h2>

                {state?.errors?.internalError && (
                    <div className='pb-4'>
                        <ErrorMessage error={state.errors.internalError[0]} align={'left'}/>
                    </div>
                )}

                <Select defaultValue={shippingMethod?.handle as string} name='shippingMethod'>
                    <SelectTrigger>
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {cart?.deliveryGroups.deliveryOptions?.map((option) => (
                                <SelectItem
                                    key={option.code}
                                    value={option.handle}
                                >
                                    <p>{option.title} - {option.estimatedCost.amount === '0' ? 'FREE' : option.estimatedCost.amount + ` ${option.estimatedCost.currencyCode}`}</p>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <CheckoutStepNavigation
                actionLabel='Continue to payment'
                formAction={selectDeliveryOptionAction}
                loading={isPending}
            />
        </form>
    )
}