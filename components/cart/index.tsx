'use client';

import {useCart} from "@/lib/store/cart";
import Box from "@/components/box";
import {CartProduct} from "@/lib/store/cart/types";
import Image from "next/image";
import Button from "@/components/button";
import {useEffect, useRef} from "react";
import {CloseOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

import styles from './index.module.css';
import {ProductAttribute} from "@/lib/definitions";

const Product = ({product}: {
    product: CartProduct,
}) => {
    const cart = useCart();

    const attributes = product.attributes.reduce((a, b) => Object.assign(a, {[b.key]: b.value}), {}) as ProductAttribute;

    return (
        <Box
            gap='2em'
            align='center'
            style={{
                width: '100%',
            }}
        >
            <Box>
                <Image
                    src={product.merchandise.product.images.nodes[0].url}
                    alt='Product image'
                    width={180}
                    height={100}
                />
            </Box>

            <Box
                style={{
                    width: '100%',
                    gap: '0.25em'
                }}
                column>
                <p>{product.merchandise.product.title}</p>
                <p>Size {attributes.size}</p>
                <p>EUR {product.cost.totalAmount.amount}</p>
                <p>Qty: {product.quantity}</p>

                <Box style={{
                    alignSelf: 'flex-end',
                    marginRight: '3em'
                }}>
                    <Button
                        variant='underline'
                        onClick={() => cart.removeItemFromCart(product)}
                    >
                        Remove
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default function Cart() {
    const cart = useCart();
    const cartRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (cart.isCartOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = '';
        }

        return () => {
            document.body.style.overflowY = '';
        }
    }, [cart.isCartOpen]);

    useEffect(() => {

    }, [cart.cart.products]);

    const handleCloseCart = (event: React.MouseEvent) => {
        if (cartRef.current && event.target instanceof HTMLElement)
            if (event.target.contains(cartRef.current)) {
                cart.closeCart()
            }
    }

    const handleRedirect = (path: string) => {
        cart.closeCart();
        router.push(path);
    }

    if (cart.isCartOpen) {
        return (
            <div
                onClick={handleCloseCart}
                className={styles['cart-wrapper']}>
                <div
                    ref={cartRef}
                    className={styles.cart}
                >
                    <Box
                        column
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        <header className={styles.header}>
                            <p>Cart</p>
                            <CloseOutlined onClick={() => cart.closeCart()}/>
                        </header>

                        {cart.cart.products.length > 0
                            && (
                                <>
                                    <main className={`${styles.content} no-scrollbar`}>
                                        {cart.cart.products.map((product: CartProduct) => (
                                            <Product
                                                key={product.merchandise.id}
                                                product={product}
                                            />
                                        ))}
                                    </main>
                                    <footer className={styles.footer}>
                                        <Box
                                            justify='space-between'
                                            style={{
                                                width: '100%',
                                                backgroundColor: '#EEE',
                                                padding: '1em',
                                            }}>
                                            <p>Subtotal:</p>
                                            <p>EUR {cart.cart.totalPrice}</p>
                                        </Box>

                                        <Box style={{width: '100%'}}>
                                            <Button onClick={() => handleRedirect('/checkout')}
                                                    style={{height: '2.8em',}}>
                                                CHECKOUT
                                            </Button>
                                        </Box>
                                    </footer>
                                </>
                            )}

                        {cart.cart.products.length <= 0
                            && (
                                <Box
                                    column
                                    justify='center'
                                    align='center'
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                    }}
                                >
                                    <h3>Your cart is empty.</h3>
                                    <h4>Not sure where to start?</h4>

                                    <Box style={{
                                        paddingTop: '1em',
                                        maxWidth: '10em',
                                        width: '100%',
                                    }}>
                                        <Button
                                            onClick={() => handleRedirect('/c')}
                                        >
                                            Shop all
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                    </Box>
                </div>
            </div>
        )
    }
}