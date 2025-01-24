import {NavigationMenu, NavigationMenuItem, NavigationMenuLink} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function Logo() {
    return (
        <NavigationMenu>
            <NavigationMenuItem>
                <Link href='/' legacyBehavior passHref>
                    <NavigationMenuLink>
                        <h1 className="text-[1.5em] text-inherit">TIVANOVA</h1>
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenu>
    );
}
