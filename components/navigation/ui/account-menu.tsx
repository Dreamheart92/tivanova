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

