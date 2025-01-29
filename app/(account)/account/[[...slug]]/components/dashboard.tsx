import {OrderSummaryType} from "@/lib/definitions/order.definitions";
import OrderCard from "@/app/(account)/account/[[...slug]]/components/orders/order-card";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import {Button} from "@/components/ui/button";
import Navigation from "@/app/(account)/account/[[...slug]]/components/navigation";

export default function Dashboard({lastOrder}: { lastOrder: OrderSummaryType | null }) {
    return (
        <div>
            <Navigation mobile/>
            <div className='w-full hidden lg:flex flex-col gap-4'>
                <h2>My Account</h2>
                <Separator/>
                <p>Here you can effortlessly view your orders and update your account details.</p>
                <LastOrder order={lastOrder}/>
            </div>
        </div>
    )
}

const LastOrder = ({order}: { order: OrderSummaryType | null }) => {
    const Content = !order ? (
            <div className='bg-white mt-2 p-4 rounded-md'>
                <p className=''>You haven&apos;t place any orders yet.</p>
                <div className='w-full mt-2'>
                    <Link href={PATHS.SHOP}>
                        <Button>
                            Explore shop
                        </Button>
                    </Link>
                </div>
            </div>
        ) :
        <OrderCard order={order}/>;

    return (
        <div className='w-full'>
            <h2>Last Order</h2>
            {Content}
        </div>
    )
}