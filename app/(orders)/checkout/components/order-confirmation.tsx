'use client';

import {useCheckout} from "@/lib/context/checkout";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import ItemCard from "@/app/(orders)/components/item-card";
import Cost from "@/app/(orders)/components/cost";
import {notFound} from "next/navigation";
import DeliveryAddress from "@/app/(orders)/components/delivery-address";
import CustomerDetails from "@/app/(orders)/components/customer-details";

export default function OrderConfirmation() {
    const {orderConfirmation} = useCheckout();

    if (!orderConfirmation) {
        notFound();
    }

    return (
        <div>
            <h3>Thank you for your order!</h3>
            <p>We&apos;re excited to prepare your items and get them to you. A confirmation
                email with all the details has been sent your way. Feel free to reach out if you have any questions
                about your order!</p>

            <div className='mt-2 bg-white flex w-full justify-between'>
                <div>
                    <CustomerDetails customer={{
                        firstName: orderConfirmation.displayAddress.firstName,
                        lastName: orderConfirmation.displayAddress.lastName,
                        email: orderConfirmation.email,
                    }}/>

                    <DeliveryAddress deliveryAddress={orderConfirmation.displayAddress}/>
                </div>
            </div>

            <div className='bg-white p-2 my-4'>
                {orderConfirmation?.lineItems.map((item) => (
                    <ItemCard key={item.id} item={item}/>
                ))}
            </div>

            <div>
                <Cost cost={{
                    deliveryCost: orderConfirmation.currentShippingPriceSet.presentmentMoney,
                    subtotal: orderConfirmation.currentSubtotalPriceSet.presentmentMoney,
                    total: orderConfirmation.currentTotalPriceSet.presentmentMoney
                }}/>
            </div>

            <div className='py-4 w-full flex justify-end'>
                <Link href={PATHS.SHOP}>
                    <Button>Continue shopping</Button>
                </Link>
            </div>
        </div>
    )
}