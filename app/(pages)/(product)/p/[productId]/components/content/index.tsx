import Box from "@/components/box";
import SizeBox from "../size-box";
import Button from "@/components/button";
import {Product as ProductType, Variation} from "@/lib/definitions";
import React, {useState} from "react";
import {useCart} from "@/lib/store/cart";
import {CartProductAttribute} from "@/lib/store/cart/types";
import {createCartProduct} from "@/lib/utils/product-utils";
import ErrorMessage from "@/components/error-message";
import {useWishlist} from "@/lib/store/wishlist";

export default function Content({product, variants}: { product: ProductType, variants: Variation[] }) {
    const cart = useCart();
    const wishlist = useWishlist();

    const [selectedColor, setSelectedColor] = useState(variants[0].color);
    const [selectedVariant, setSelectedVariant] = useState<{
        id: string,
        attributes: CartProductAttribute[]
    } | null>(null);

    const [noVariantSelected, setNoVariantSelected] = useState(false);

    const options = variants.find((variant) => variant.color === selectedColor);

    const handleSelectColor = (color: string) => {
        if (selectedColor !== color) {
            setSelectedColor(color);
            setSelectedVariant(null);
            setNoVariantSelected(false);
        }
    }

    const handleSelectSize = (size: { name: string, id: string }) => {
        setSelectedVariant({
            id: size.id,
            attributes: [
                {
                    key: 'size',
                    value: size.name,
                },
                {
                    key: 'color',
                    value: selectedColor,
                },
            ]
        })

        setNoVariantSelected(false);
    }

    const handleAddItemToCart = async () => {
        if (selectedVariant) {
            const isItemInCart = cart.cart.products.find((cartProduct) => cartProduct.merchandise.id === selectedVariant.id);

            if (isItemInCart) {
                const newQuantity = isItemInCart.quantity + 1;
                cart.updateItemQuantity(isItemInCart.id, newQuantity);
            } else {
                const localProductId = `${new Date().getTime()}__key`
                const newProduct = createCartProduct(selectedVariant, product, localProductId);
                cart.addItemToCart(newProduct, localProductId);
            }
        } else {
            setNoVariantSelected(true);
        }
    }

    return (
        <Box
            column
            style={{
                width: '40%',
                paddingTop: '5em',
                position: 'relative',
            }}
        >
            <Box
                column
                style={{
                    maxWidth: '70%',
                    gap: '1em',
                }}
            >
                <Box style={{
                    width: '100%',
                }} column>
                    <Box style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <h3 style={{maxWidth: '80%'}}>{product.title}</h3>
                        <p>{Number(product.priceRange.minVariantPrice.amount).toFixed(2)} EURO</p>
                    </Box>

                    <p style={{color: '#919191'}}>{product.vendor}</p>
                </Box>

                <Box column>
                    <h4>COLOR</h4>
                    <Box gap='1em'>
                        {variants.map((variant) => (
                            <SizeBox
                                key={variant.id}
                                size={variant.color}
                                onSelect={handleSelectColor}
                                selected={variant.color === selectedColor}
                            />
                        ))}
                    </Box>
                </Box>

                <Box column>
                    <h4>SIZE</h4>
                    <Box
                        style={{
                            gap: '0.25em'
                        }}>
                        {options?.options.map((size) => (
                            <SizeBox
                                key={size.id}
                                size={size.name}
                                onSelect={() => handleSelectSize(size)}
                                selected={!!selectedVariant?.attributes?.find((selectedVariant) => selectedVariant?.value === size.name)}
                            />
                        ))}
                    </Box>
                </Box>

                <Box gap='0.5em' style={{width: '100%'}}>
                    <Box
                        column
                        style={{
                            width: '100%',
                        }}>
                        <form action={handleAddItemToCart}>
                            <Button type='submit'>
                                ADD TO CART
                            </Button>
                        </form>

                        <ErrorMessage>
                            {noVariantSelected && 'Please select a size'}
                        </ErrorMessage>
                    </Box>

                    <Box style={{width: '15%'}}>
                        <Button
                            variant='wishlist'
                            onClick={() => wishlist.addItemToWishlist(product.id)}
                            selected={wishlist.wishlist.includes(product.id)}
                        />
                    </Box>
                </Box>

                <Box
                    column
                    style={{
                        borderBottom: '1px solid #EEE',
                        paddingBottom: '1em',
                    }}
                >
                    <h5>Description</h5>
                    <Box
                        column
                        style={{
                            gap: '0.15em',
                        }}
                    >
                        <div dangerouslySetInnerHTML={{__html: product.descriptionHtml}}/>
                    </Box>
                </Box>

                <Box column>
                    <h5>Shipping & returns</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.</p>
                </Box>
            </Box>
        </Box>
    )
}