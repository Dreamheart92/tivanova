import DesktopNavigation from "@/components/navigation/desktop-navigation";
import MobileNavigation from "@/components/navigation/mobile-navigation";
import {getSession} from "@/lib/session";
import NavigationWrapper from "@/components/navigation/navigation-wrapper";

export default async function Navigation() {
    const customerSession = await getSession();

    return (
        <NavigationWrapper isAuth={!!customerSession}/>
    )
}