'use client';

import {useCallback, useEffect, useState} from "react";
import ContentContainer from "@/components/ui/content-container";
import MainMenu from "@/components/navigation/ui/main-menu";
import Logo from "@/components/navigation/ui/logo";
import AccountMenu from "@/components/navigation/ui/account-menu";
import {cva} from "class-variance-authority";

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

const headerStyles = cva(
    'z-20 w-full top-0 fixed transition-colors duration-300 ease-in py-4',
    {
        variants: {
            variant: {
                static: 'text-white',
                scrolling: 'text-black bg-white',
            }
        }
    }
)

export default function DesktopNavigation() {
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
            className={`${headerStyles({
                variant: scrolling ? 'scrolling' : 'static',
            })} desktop-navigation`}
            style={{
                boxShadow: scrolling ? 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' : '',
            }}
        >
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