'use client';

import React, {useCallback, useEffect, useMemo, useState} from "react";

import Link from "next/link";
import Box from '@/components/box';

import {HeartOutlined, SearchOutlined, ShoppingOutlined, UserOutlined} from "@ant-design/icons";
import {usePathname, useRouter} from "next/navigation";
import {useCart} from "@/lib/store/cart";
import {logout} from "@/lib/actions";

import styles from './index.module.css';
import {useWishlist} from "@/lib/store/wishlist";

type NavigationLinkProps = {
    to: string,
    children: React.ReactNode;
}

const NavigationLink = ({to, children}: NavigationLinkProps) => {
    return (
        <li style={{
            textTransform: 'uppercase',
        }}>
            <Link href={to}>
                {children}
            </Link>
        </li>
    )
}

const Navigation = () => {
    return (
        <Box flex='0 0 25%'>
            <ul style={{
                display: 'flex',
                gap: '1em',
            }}>
                <NavigationLink to='/c'>
                    shop
                </NavigationLink>

                <NavigationLink to='/collections'>
                    collections
                </NavigationLink>

                <NavigationLink to='/about'>
                    about
                </NavigationLink>

                <NavigationLink to='/journal'>
                    journal
                </NavigationLink>
            </ul>
        </Box>
    )
}

const Logo = () => {
    return (
        <Box flex='0 0 50%' justify='center'>
            <Link href='/'>
                <h2 style={{
                    color: 'inherit',
                }}>TIVANOVA</h2>
            </Link>
        </Box>
    )
}

const AccountMenu = () => {
    const cart = useCart();
    const wishlist = useWishlist();
    const [hover, setHover] = useState(false);

    async function handleLogout() {
        cart.clearCart();
        wishlist.clearWishlist();
        await logout();
    }

    return (
        <Box
            style={{
                position: 'relative',
            }}
            props={{
                onMouseEnter: () => setHover(true),
                onMouseLeave: () => setHover(false),
            }}
        >
            <UserOutlined style={{cursor: 'pointer'}}/>

            {hover && (
                <Box style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-300%',
                    paddingTop: '1.49em',
                    width: '20em',
                }}>
                    <Box style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: '100%',
                        padding: '1em',
                        borderTop: '1px solid #EEE',
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                        borderRadius: '0.25em',
                    }}>
                        <ul className={styles['user-menu']}>
                            <li>
                                <Link href='/account'>
                                    My account
                                </Link>
                            </li>
                            <li>My purchases</li>
                            <li>Help</li>
                            <li>
                                <form style={{
                                    width: '100%',
                                }}
                                      action={handleLogout}>
                                    <button
                                        style={{
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            width: '100%',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                            fontSize: 'inherit',
                                        }}>Logout
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

const UserNavigation = ({isAuth}: { isAuth: boolean }) => {
    const cart = useCart();
    const router = useRouter();

    const handleWishlistNavigation = () => {
        if (isAuth) {
            router.push('/wishlist');
        } else {
            router.push('/login');
        }
    }

    return (
        <Box
            flex='0 0 25%'
            gap='1em'
            align='center'
            justify='center'
        >
            <HeartOutlined onClick={handleWishlistNavigation}/>

            {isAuth && (
                <AccountMenu/>
            )}

            {!isAuth && (
                <Link href='/login'>
                    <UserOutlined/>
                </Link>
            )}
            <SearchOutlined/>
            <ShoppingOutlined onClick={() => cart.openCart()}/>
        </Box>
    )
}

export default function Header({isAuth}: { isAuth: boolean }) {
    const path = usePathname();

    const [scrolling, setScrolling] = useState(false);
    const [hovered, setHovered] = useState(false);

    const scrollHandler = useCallback(() => {
        const scrollPosition = window.scrollY;

        if (scrollPosition >= 10) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        }
    }, []);

    const homePageStyle = useMemo<React.CSSProperties>(() => ({
        position: "fixed",
        top: 0,
        zIndex: 100,
        width: '100vw',
        color: scrolling || hovered ? 'black' : 'white',
        backgroundColor: scrolling || hovered ? 'white' : 'transparent',
        transition: 'background-color 0.3s ease-in, color 0.3s ease-in, box-shadow 0.3s ease-in',
        boxShadow: scrolling ? 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' : 'none',

    }), [scrolling, hovered]);

    const defaultStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        color: 'black',
        backgroundColor: 'white',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    }

    const headerStyle = path === '/' ? homePageStyle : defaultStyle;

    return (
        <header
            style={{
                position: 'relative',
                ...headerStyle,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Box style={{
                width: '100%',
                alignItems: 'center',
                padding: '1em 3em',
            }}>
                <Navigation/>
                <Logo/>
                <UserNavigation isAuth={isAuth}/>
            </Box>
        </header>
    )
}