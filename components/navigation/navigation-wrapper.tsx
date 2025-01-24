'use client';

import DesktopNavigation from "@/components/navigation/desktop-navigation";
import MobileNavigation from "@/components/navigation/mobile-navigation";
import {usePathname} from "next/navigation";

const pathsWithoutNavigation = ['/checkout'];

export default function NavigationWrapper({isAuth}: { isAuth: boolean }) {
    const pathname = usePathname();

    if (!pathsWithoutNavigation.includes(pathname)) {
        return (
            <>
                <DesktopNavigation isAuth={isAuth}/>
                <MobileNavigation isAuth={isAuth}/>
            </>
        )
    }
}