import {NavigationMenu, NavigationMenuItem} from "@/components/ui/navigation-menu";
import {Heart, Search, ShoppingBag, UserRound} from "lucide-react";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";

const ICON_WIDTH = 16;

type IconWrapperProps = {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    href: string;
}

const IconWrapper = ({Icon, href}: IconWrapperProps) => {
    return (
        <NavigationMenuItem>
            <Link href={href}>
                <Icon width={ICON_WIDTH} cursor='pointer'/>
            </Link>
        </NavigationMenuItem>
    )
}

export default function AccountMenu() {
    return (
        <NavigationMenu className="gap-3">
            <IconWrapper Icon={Heart} href={PATHS.LOGIN}/>
            <IconWrapper Icon={UserRound} href={PATHS.LOGIN}/>
            <IconWrapper Icon={Search} href={PATHS.LOGIN}/>
            <IconWrapper Icon={ShoppingBag} href={PATHS.LOGIN}/>
        </NavigationMenu>
    )
}