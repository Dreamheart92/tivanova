'use client';

import {useCart} from "@/lib/context/cart";
import Image from "next/image";

import {CartProductType} from "@/lib/definitions/cart.definitions";

const CheckoutProductCard = ({product}: { product: CartProductType }) => {
    return (
        <div className='flex items-center gap-2 p-4 border border-stone-300 rounded-md my-2'>
            <div>
                <Image
                    src={product.merchandise.product.images[0].url}
                    alt={product.merchandise.product.title}
                    width={50}
                    height={50}
                    className='rounded-sm'
                />
            </div>

            <div className='w-full'>
                <div className='flex justify-between w-full'>
                    <p>{product.merchandise.product.title}</p>
                    <p>{product.cost.totalAmount.currencyCode} {Number(product.cost.totalAmount.amount).toFixed(2)}</p>
                </div>
                <div>
                    <p className='text-sm text-stone-500'>{product.merchandise.selectedOptions.map((option) => option.value).join(' / ')}</p>
                </div>
            </div>
        </div>
    )
}

const CheckoutProducts = ({products}: { products: CartProductType[] }) => {
    return (
        <div>
            {products.map((product) => (
                <CheckoutProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}

export default function OrderSummary() {
    const {cart} = useCart();

    return (
        <div>
            {cart?.lines && (
                <CheckoutProducts products={cart.lines}/>
            )}

            <div className='pt-4 pr-4 flex flex-col gap-2'>
                <span className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{cart?.cost.subtotalAmount.currencyCode} {Number(cart?.cost.subtotalAmount.amount).toFixed(2)}</p>
                </span>

                {cart?.deliveryGroups?.selectedDeliveryOption && (
                    <span className='flex justify-between'>
                      <p>Shipping</p>
                      <p>{cart.deliveryGroups.selectedDeliveryOption.estimatedCost.currencyCode} {Number(cart.deliveryGroups.selectedDeliveryOption.estimatedCost.amount).toFixed(2)}</p>
                    </span>
                )}

                <span className='flex justify-between'>
                    <p>Total</p>
                    <p>{cart?.cost.totalAmount.currencyCode} {Number(cart?.cost.totalAmount.amount).toFixed(2)}</p>
                </span>
            </div>
        </div>
    )
}