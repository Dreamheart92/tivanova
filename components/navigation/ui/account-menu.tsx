import {NavigationMenu, NavigationMenuItem} from "@/components/ui/navigation-menu";
import {Heart, Search, ShoppingBag, UserRound} from "lucide-react";

const ICON_WIDTH = 16;

type IconWrapperProps = {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const IconWrapper = ({Icon}: IconWrapperProps) => {
    return (
        <NavigationMenuItem>
            <Icon width={ICON_WIDTH} cursor='pointer'/>
        </NavigationMenuItem>
    )
}

export default function AccountMenu() {
    return (
        <NavigationMenu className="gap-3">
            <IconWrapper Icon={Heart}/>
            <IconWrapper Icon={UserRound}/>
            <IconWrapper Icon={Search}/>
            <IconWrapper Icon={ShoppingBag}/>
        </NavigationMenu>
    )
}