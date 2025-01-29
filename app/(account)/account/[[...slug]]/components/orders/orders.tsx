import {Separator} from "@/components/ui/separator";
import {OrderSummaryType} from "@/lib/definitions/order.definitions";
import OrderCard from "@/app/(account)/account/[[...slug]]/components/orders/order-card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";

type OrdersProps = {
    orders: OrderSummaryType[];
}

export default function Orders({orders}: OrdersProps) {
    return (
        <div className='w-full lg:basis-3/4 p-6 lg:p-0 text-[2em] lg:text-base'>
            <h2>My Orders</h2>
            <Separator className='my-4'/>

            {orders.length > 0 ? (
                    orders.map((order) => (
                        <OrderCard key={order.id} order={order}/>
                    ))
                )
                : (
                    <>
                        <p>You still do not have any purchases</p>
                        <div className='w-full mt-2'>
                            <Link href={PATHS.SHOP}>
                                <Button>
                                    Explore shop
                                </Button>
                            </Link>
                        </div>
                    </>
                )
            }
        </div>
    )
}
