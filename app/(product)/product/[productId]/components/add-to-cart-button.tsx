'use client';

import {Button} from "@/components/ui/button";
import {useProduct} from "@/lib/context/product";
import {useCart} from "@/lib/context/cart";
import {addItem} from "@/lib/actions/cart.actions";
import {createCartLine} from "@/lib/utils/cart.utils";
import {ProductType} from "@/lib/definitions/product";
import {useActionState} from "react";
import ErrorMessage from "@/app/(auth)/components/error-message";

export default function AddToCartButton({product}: { product: ProductType }) {
    const {selectedOption} = useProduct();
    const {addItemToCart} = useCart();
    const [errorMessage, formAction] = useActionState(addItem, null);
    const actionWithVariant = formAction.bind(null, createCartLine(selectedOption?.id));

    if (!selectedOption) {
        return (
            <div className='basis-4/5'>
                <Button
                    variant='default'
                    disabled
                    className='uppercase w-full'
                >
                    Add to cart
                </Button>
            </div>
        )
    }

    return (
        <div className='basis-4/5'>
            <form>
                <Button
                    variant='default'
                    className='uppercase w-full'
                    formAction={async () => {
                        addItemToCart({
                            product,
                            variant: selectedOption,
                        })
                        await actionWithVariant();
                    }}
                >
                    Add to cart
                </Button>

                {errorMessage && (
                    <ErrorMessage error={errorMessage} align={"left"}/>
                )}
            </form>
        </div>
    )
}