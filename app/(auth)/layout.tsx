'use client';

import Box from "@/components/box";
import Image from 'next/image';
import {usePathname} from "next/navigation";

const pageSettings = {
    '/signup': {
        title: 'Sign up',
        caption: 'Join us today and unlock exclusive deals, personalized recommendations, and a seamless shopping experience. Sign up now and be part of something exciting!'
    },
    '/login': {
        title: 'Login',
        caption: 'Welcome back! Log in for exclusive offers and a personalized shopping experience.'
    }
}

export default function Layout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <Box style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <Box
                column
                flex='1 1 50%'
                style={{
                    padding: '0 5em',
                    width: '100%',
                }}
            >
                <Box
                    column
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        paddingBottom: '2em',
                    }}>
                    <h2>{pageSettings[pathname as keyof typeof pageSettings]?.title}</h2>
                    <p>{pageSettings[pathname as keyof typeof pageSettings]?.caption}</p>
                </Box>

                {children}
            </Box>

            <Box
                flex='1 1 50%'
                style={{
                    position: 'relative',
                }}
            >
                <Image
                    src='/signup.webp'
                    alt='Sign up'
                    width={1000}
                    height={500}
                    style={{
                        width: '100%',
                        height: '100vh',
                        objectFit: 'cover',
                    }}
                />
            </Box>
        </Box>
    )
}