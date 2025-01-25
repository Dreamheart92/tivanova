import {Separator} from "@/components/ui/separator";
import {OrderSummaryType} from "@/lib/definitions/order.definitions";
import OrderCard from "@/app/(account)/account/[[...slug]]/components/orders/order-card";

type OrdersProps = {
    orders: OrderSummaryType[];
}

export default function Orders({orders}: OrdersProps) {
    return (
        <div className='basis-3/4'>
            <h2>My orders</h2>
            <Separator className='my-2'/>

            {orders.length > 0 ? (
                    orders.map((order) => (
                        <OrderCard key={order.id} order={order}/>
                    ))
                )
                : <p>You still do not have any purchases</p>
            }
        </div>
    )
}
