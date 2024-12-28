import {NavigationMenu, NavigationMenuItem, NavigationMenuLink} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function Logo() {
    return (
        <NavigationMenu>
            <NavigationMenuItem>
                <Link href='/public' legacyBehavior passHref>
                    <NavigationMenuLink>
                        <h1>TIVANOVA</h1>
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenu>
    );
}
