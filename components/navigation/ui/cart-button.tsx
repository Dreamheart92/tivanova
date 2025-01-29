'use client';

import {NavigationMenuItem} from "@/components/ui/navigation-menu";
import {ShoppingBag} from "lucide-react";
import {useCart} from "@/lib/context/cart";

type CartButtonProps = {
    iconWidth: number;
}

export default function CartButton({iconWidth}: CartButtonProps) {
    const {openCart} = useCart();

    return (
        <NavigationMenuItem>
            <ShoppingBag className='w-5 h-5 lg:w-4 lg:h-4' onClick={openCart} cursor='pointer'/>
        </NavigationMenuItem>
    )
}