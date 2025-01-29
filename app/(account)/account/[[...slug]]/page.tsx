import {getSession} from "@/lib/utils/server/session.utils";
import {notFound} from "next/navigation";
import Orders from "@/app/(account)/account/[[...slug]]/components/orders/orders";
import Settings from "@/app/(account)/account/[[...slug]]/components/settings/settings";
import {fetchCustomerOrders} from "@/lib/api/order.api";
import {headers} from "next/headers";
import {userAgent} from "next/server";
import Dashboard from "@/app/(account)/account/[[...slug]]/components/dashboard";

type AccountProps = {
    params: Promise<{ slug: string }>;
}

export default async function Account({params}: AccountProps) {
    const session = await getSession();
    const slug = (await params)?.slug?.[0] || '';

    if (!session) {
        notFound();
    }

    const orders = await fetchCustomerOrders(session.token);

    switch (slug) {
        case 'settings' : {
            return <Settings customer={session}/>
        }
        case 'orders' : {
            return (
                <Orders orders={orders}/>
            )
        }
        default: {
            return <Dashboard lastOrder={orders[0]}/>
        }
    }
}