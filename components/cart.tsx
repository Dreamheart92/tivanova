'use client';

import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {useCart} from "@/lib/context/cart";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {PATHS} from "@/lib/constants/paths";
import {useRouter} from "next/navigation";
import {useActionState, useEffect} from "react";
import {createCartAndStoreCookie} from "@/lib/utils/cart.utils";
import {fetchCustomerCartIdAndStoreIt, removeFromCart} from "@/lib/actions/cart.actions";
import Link from "next/link";
import {useShop} from "@/lib/context/shop";
import {CartProductType} from "@/lib/definitions/cart";
import ErrorMessage from "@/app/(auth)/components/error-message";
import {CustomerType} from "@/lib/definitions/customer";

export default function Cart({session}: { session: CustomerType | null }) {
    const {cart, open, closeCart} = useCart();

    useEffect(() => {
        if (!cart) {
            if (session) {
                fetchCustomerCartIdAndStoreIt(session.token);
            } else {
                createCartAndStoreCookie();
            }
        }
    }, [cart]);

    const emptyCart = cart && cart.lines.length <= 0;

    return (
        <Sheet open={open} onOpenChange={closeCart}>
            <SheetContent className='overflow-y-scroll flex flex-col p-0 gap-0 sm:max-w-[470px]'>
                <SheetHeader className='p-4'>
                    <SheetTitle>Cart</SheetTitle>
                </SheetHeader>
                <Separator/>

                {emptyCart && (
                    <EmptyCart/>
                )}

                {!emptyCart && cart && (
                    <CartProducts products={cart?.lines}/>
                )}
            </SheetContent>
        </Sheet>
    )
}

const CartProducts = ({products}: { products: CartProductType[] }) => {
    return (
        <>
            <div className='basis-10/12 max-h-[800px] overflow-y-auto no-scrollbar'>
                {products.map((product, index) => (
                    <CartProductCard key={product.merchandise.id} product={product} index={index}/>
                ))}
            </div>
            <CartFooter/>
        </>
    )
}

const CartFooter = () => {
    const {cart} = useCart();
    const {shopSettings} = useShop();

    return (
        <div>
            <div className='flex bg-stone-200 p-4 justify-between flex-col gap-2'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{shopSettings.currency.isoCode} {Number(cart?.cost?.subtotalAmount?.amount).toFixed(2)}</p>
                </div>
            </div>

            <div>
                <Link href={PATHS.CHECKOUT}>
                    <Button className='uppercase w-full rounded-none h-12'>Checkout</Button>
                </Link>
            </div>
        </div>
    )
}

const CartProductCard = ({product, index}: { product: CartProductType, index: number }) => {
    return (
        <div className={`flex gap-2 w-full ${index % 2 !== 0 ? 'bg-stone-100' : 'bg-transparent'}`}>
            <div>
                <Image
                    src={product.merchandise.product.images[0].url}
                    alt='Product image'
                    width={180}
                    height={100}
                />
            </div>

            <div className='flex flex-col gap-1 p-4 w-full'>
                <p>{product.merchandise.product.title}</p>
                <p>{product.merchandise.selectedOptions.map((option) => option.value).join(', ')}</p>
                <p>{product.cost.totalAmount.currencyCode} {Number(product.cost.totalAmount.amount).toFixed(2)}</p>
                <p>Qty {product.quantity}</p>

                <RemoveItemButton variantId={product.id}/>
            </div>
        </div>
    )
}

const RemoveItemButton = ({variantId}: { variantId: string }) => {
    const {removeItemFromCart} = useCart();

    const [errorMessage, formAction] = useActionState(removeFromCart, null);
    const removeVariantFromCart = formAction.bind(null, variantId);

    return (
        <div>
            <div className='flex justify-end'>
                <form>
                    <Button
                        variant='link'
                        className='w-fit p-0 m-0 h-fit'
                        formAction={async () => {
                            removeItemFromCart({variantId});
                            await removeVariantFromCart();
                        }}
                    >
                        Remove
                    </Button>
                </form>
            </div>

            {errorMessage && (
                <ErrorMessage error={errorMessage} align={'right'}/>
            )}
        </div>
    )
}

const EmptyCart = () => {
    const {closeCart} = useCart();
    const router = useRouter();

    const handleRedirectToShop = () => {
        closeCart();
        router.push(PATHS.SHOP);
    }

    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <h3>Your cart is empty</h3>
            <h4>Not sure where to start?</h4>

            <div className='pt-2'>
                <Button
                    className='w-36'
                    onClick={handleRedirectToShop}
                >
                    Shop all
                </Button>
            </div>
        </div>
    )
}