import {NavigationMenuItem} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {Button} from "@/components/ui/button";

type MenuItemProps = {
    settings: {
        title: string;
        href: string;
    }
    closeMenu?: () => void;
}

export default function MenuItem({settings, closeMenu}: MenuItemProps) {
    return (
        <NavigationMenuItem className='!m-0'>
            <Link href={settings.href} legacyBehavior passHref>
                <Button
                    variant='link'
                    className='text-xl lg:text-base p-0 m-0 hover:no-underline lg:hover:underline uppercase'
                    onClick={closeMenu}
                >
                    {settings.title}
                </Button>
            </Link>
        </NavigationMenuItem>
    )
}