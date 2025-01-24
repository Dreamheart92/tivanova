import {NavigationMenuItem, NavigationMenuLink} from "@/components/ui/navigation-menu";
import Link from "next/link";

type MenuItemProps = {
    settings: {
        title: string;
        href: string;
    }
}

export default function MenuItem({settings}: MenuItemProps) {
    return (
        <NavigationMenuItem>
            <Link href={settings.href} legacyBehavior passHref>
                <NavigationMenuLink className="uppercase font-semibold">
                    {settings.title}
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    )
}