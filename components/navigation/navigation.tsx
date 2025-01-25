import {getSession} from "@/lib/utils/server/session.utils";
import NavigationWrapper from "@/components/navigation/navigation-wrapper";

export default async function Navigation() {
    const customerSession = await getSession();

    return (
        <NavigationWrapper isAuth={!!customerSession}/>
    )
}