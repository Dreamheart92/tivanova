'use client';

import EditDeliveryAddress from "@/app/(account)/account/[[...slug]]/components/settings/edit-delivery-address";
import DetailsField from "@/app/(account)/account/[[...slug]]/components/settings/details-field";
import {useCart} from "@/lib/context/cart";

export default function DeliveryAddress() {
    const {cart} = useCart();

    const deliveryAddress = cart?.delivery?.selectedDeliveryAddress?.address;

    if (!deliveryAddress) {
        return (
            <div className='bg-white p-4 rounded-sm'>
                <div className='flex justify-between pb-2'>
                    <h4>Delivery address</h4>
                    <EditDeliveryAddress label='Add delivery address'/>
                </div>

                <p>You don&apos;t have a delivery address set.</p>
            </div>
        )
    }

    return (
        <div className='bg-white p-4 rounded-sm'>
            <div className='flex justify-between pb-2'>
                <h4>Delivery address</h4>
                <EditDeliveryAddress label='Edit delivery address'/>
            </div>

            <div>
                <DetailsField label='First name'>
                    {deliveryAddress.firstName}
                </DetailsField>

                <DetailsField label='Last name'>
                    {deliveryAddress.lastName}
                </DetailsField>

                <DetailsField label='Phone'>
                    {deliveryAddress.phone}
                </DetailsField>

                <DetailsField label='Address'>
                    {deliveryAddress.address1}
                </DetailsField>

                {deliveryAddress.address2 && (
                    <DetailsField label='Apartment'>
                        {deliveryAddress.address2}
                    </DetailsField>
                )}

                <DetailsField label='Country'>
                    {deliveryAddress.countryCode}
                </DetailsField>

                <DetailsField label='City'>
                    {deliveryAddress.city}
                </DetailsField>

                <DetailsField label='Postal code'>
                    {deliveryAddress.zip}
                </DetailsField>
            </div>
        </div>
    )
}