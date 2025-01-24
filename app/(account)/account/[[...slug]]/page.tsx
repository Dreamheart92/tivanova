import {getSession} from "@/lib/session";
import {notFound} from "next/navigation";
import Orders from "@/app/(account)/account/[[...slug]]/components/orders/orders";
import Settings from "@/app/(account)/account/[[...slug]]/components/settings/settings";
import {fetchCustomerOrders} from "@/lib/api/order.api";

// TODO: Handle auth guard

type AccountProps = {
    params: Promise<{ slug: string }>;
}

export default async function Account({params}: AccountProps) {
    const session = await getSession();
    const slug = (await params)?.slug?.[0] || '';

    if (!session) {
        notFound();
    }

    switch (slug) {
        case 'settings' : {
            return <Settings customer={session}/>
        }
        default: {
            const orders = await fetchCustomerOrders(session.token);
            return (
                <Orders orders={orders}/>
            )
        }
    }
}