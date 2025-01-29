import {
    NavigationMenu,
    NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import {Heart, Search, UserRound} from "lucide-react";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import AuthMenu from "@/components/navigation/ui/auth-menu";
import CartButton from "@/components/navigation/ui/cart-button";

const ICON_WIDTH = 16;

type IconWrapperProps = {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    href: string;
}

const IconWrapper = ({Icon, href}: IconWrapperProps) => {
    return (
        <NavigationMenuItem>
            <Link href={href}>
                <Icon className='w-5 h-5 lg:w-4 lg:h-4' cursor='pointer'/>
            </Link>
        </NavigationMenuItem>
    )
}

export default function AccountMenu({isAuth}: { isAuth: boolean }) {
    const accountMenu = isAuth ? <AuthMenu iconWidth={ICON_WIDTH}/> :
        <IconWrapper Icon={UserRound} href={PATHS.LOGIN}/>;

    return (
        <NavigationMenu className="gap-3">
            <IconWrapper Icon={Heart} href={PATHS.WISHLIST}/>
            {accountMenu}
            <IconWrapper Icon={Search} href={PATHS.LOGIN}/>
            <CartButton iconWidth={ICON_WIDTH}/>
        </NavigationMenu>
    )
}