import CheckoutProvider from "@/lib/context/checkout";
import {getSession} from "@/lib/utils/server/session.utils";

export default async function Layout({children}: { children: React.ReactNode }) {
    const sessionPromise = getSession();

    return (
        <div>
            <CheckoutProvider sessionPromise={sessionPromise}>
                {children}
            </CheckoutProvider>
        </div>
    )
}