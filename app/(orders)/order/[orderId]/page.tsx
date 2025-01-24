import {fetchOrderById} from "@/lib/api/order.api";
import Items from "@/app/(orders)/order/[orderId]/components/items";
import DeliveryAddress from "@/app/(orders)/components/delivery-address";
import Cost from "@/app/(orders)/components/cost";
import CustomerDetails from "@/app/(orders)/components/customer-details";

export default async function Order({params}: { params: Promise<{ orderId: string }> }) {
    const {orderId} = await params;
    const order = await fetchOrderById(orderId);

    return (
        <div className=''>
            <div className='max-w-screen-sm mx-auto pt-8'>
                <h2 className='pb-8 text-center'>Order summary</h2>
                <div className='w-full flex flex-col gap-4'>
                    <Items items={order.lineItems}/>
                    <DeliveryAddress deliveryAddress={order.displayAddress}/>
                    <Cost
                        cost={{
                            subtotal: order.currentSubtotalPriceSet.presentmentMoney,
                            deliveryCost: order.currentShippingPriceSet.presentmentMoney,
                            total: order.currentTotalPriceSet.presentmentMoney,
                        }}
                    />
                    <CustomerDetails customer={{
                        firstName: order.displayAddress.firstName,
                        lastName: order.displayAddress.lastName,
                        email: order.email,
                    }}/>
                </div>
            </div>
        </div>
    )
}
