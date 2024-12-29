'use client';

import Logo from "@/components/navigation/ui/logo";
import MainMenu from "@/components/navigation/ui/main-menu";
import AccountMenu from "@/components/navigation/ui/account-menu";
import ContentContainer from "@/components/ui/content-container";
import {useCallback, useEffect, useState} from "react";

type WrapperProps = {
    basis: string;
    justify?: 'start' | 'center' | 'end';
    children: React.ReactNode;
}

const Wrapper = ({basis, justify, children}: WrapperProps) => {
    return (
        <div
            className='flex'
            style={{
                flexBasis: `${basis}%`,
                justifyContent: justify ? justify : '',
            }}
        >
            {children}
        </div>
    )
}

export default function Navigation() {
    const [scrolling, setScrolling] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollPosition = window.scrollY;
        scrollPosition >= 10 ? setScrolling(true) : setScrolling(false);
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div
            className="absolute w-full top-0 z-20 text-white p-4">
            <ContentContainer>
                <div className="flex items-center">
                    <Wrapper basis='25'>
                        <MainMenu/>
                    </Wrapper>

                    <Wrapper basis='50' justify='center'>
                        <Logo/>
                    </Wrapper>

                    <Wrapper basis='25' justify='end'>
                        <AccountMenu/>
                    </Wrapper>
                </div>
            </ContentContainer>
        </div>
    )
}