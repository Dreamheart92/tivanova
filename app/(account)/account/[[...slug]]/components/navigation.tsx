'use client';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import {ChevronRight} from "lucide-react";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";
import {logout} from "@/lib/actions/auth.actions";

type MenuItemProps = {
    label: string;
    href: string;
}

const MenuItem = ({label, href}: MenuItemProps) => {
    const pathname = usePathname();
    const selected = href === pathname;

    return (
        <NavigationMenuItem className={clsx('!m-0', {
            // '!bg-stone-900': selected,
            // 'hover:bg-stone-200': !selected
        })}>
            <Link href={href} passHref legacyBehavior>
                <NavigationMenuLink>
                    <div
                        className={clsx('flex justify-between text-stone-500 items-center w-72 p-3 hover:text-stone-900', {
                            '!text-stone-900 font-bold': selected,
                        })}>
                        <p>{label}</p>
                        <ChevronRight width={15} height={15}/>
                    </div>
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    )
}

export default function Navigation() {
    return (
        <NavigationMenu>
            <NavigationMenuList className='flex-col bg-white rounded-sm'>
                <MenuItem label='Orders' href={PATHS.ACCOUNT}/>
                {/*<Separator/>*/}
                <MenuItem label='Wishlist' href={PATHS.WISHLIST}/>
                {/*<Separator/>*/}
                <MenuItem label='Settings' href={PATHS.ACCOUNT_NAVIGATION.SETTINGS}/>
                {/*<Separator/>*/}
                <NavigationMenuItem className='w-full justify-start !m-0'>
                    <form>
                        <Button
                            variant='link'
                            className='w-full justify-start pl-3 my-1 text-[1em] font-normal !no-underline text-stone-500 hover:text-stone-900 transition-none'
                            formAction={logout}
                        >
                            Logout
                        </Button>
                    </form>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}