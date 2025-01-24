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
            <ShoppingBag width={iconWidth} onClick={openCart} cursor='pointer'/>
        </NavigationMenuItem>
    )
}