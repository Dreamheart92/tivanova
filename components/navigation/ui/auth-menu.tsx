'use client'

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {UserRound} from "lucide-react";
import Link from "next/link";
import {useState} from "react";
import {NavigationMenuItem} from "@/components/ui/navigation-menu";
import {PATHS} from "@/lib/constants/paths";
import {Button} from "@/components/ui/button";
import {logout} from "@/lib/actions/auth.actions";

const menuSettings = {
    myAccount: {
        href: PATHS.ACCOUNT,
        label: 'My Account'
    },
    myPurchases: {
        href: PATHS.LOGIN,
        label: 'My Purchases'
    },
    help: {
        href: PATHS.LOGIN,
        label: 'Help'
    },
    logout: {
        href: PATHS.LOGIN,
        label: 'Logout'
    }
}

export default function AuthMenu({iconWidth}: { iconWidth: number }) {
    const [open, setOpen] = useState(false);

    return (
        <NavigationMenuItem className='' onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <DropdownMenu open={open} modal={false}>
                <DropdownMenuTrigger className='flex items-center border-none outline-none'>
                    <UserRound width={iconWidth} cursor='pointer'/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56 mt-3'>
                    <DropdownMenuLabel>Welcome, Toni!</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <MenuLinkItem item={menuSettings.myAccount} separator/>
                        <MenuLinkItem item={menuSettings.myPurchases} separator/>
                        <MenuLinkItem item={menuSettings.help} separator/>
                        <DropdownMenuItem>
                            <form>
                                <Button size='sm' formAction={logout}>
                                    Logout
                                </Button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </NavigationMenuItem>
    )
}

type MenuLinkItemProps = {
    item: {
        href: string;
        label: string;
    }
    separator?: boolean;
}

const MenuLinkItem = ({item, separator = false}: MenuLinkItemProps) => {
    return (
        <>
            <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href={item.href}>
                    {item.label}
                </Link>
            </DropdownMenuItem>
            {separator && <DropdownMenuSeparator/>}
        </>
    )
}