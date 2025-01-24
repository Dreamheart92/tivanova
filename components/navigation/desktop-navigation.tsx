'use client';

import {useCallback, useEffect, useState} from "react";
import ContentContainer from "@/components/ui/content-container";
import MainMenu from "@/components/navigation/ui/main-menu";
import Logo from "@/components/navigation/ui/logo";
import AccountMenu from "@/components/navigation/ui/account-menu";
import {cva} from "class-variance-authority";
import {usePathname} from "next/navigation";

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
    'w-full py-4 z-50',
    {
        variants: {
            variant: {
                homePage: 'fixed top-0 bg-transparent text-white transition-colors duration-300 ease-in',
                homePageScrolling: 'bg-white text-black fixed transition-colors duration-300 ease-in',
                default: 'sticky top-0 bg-white text-black',
            }
        }
    }
)

export default function DesktopNavigation({isAuth}: { isAuth: boolean }) {
    const [scrolling, setScrolling] = useState(false);
    const [hovered, setHovered] = useState(false);

    const path = usePathname();

    const isHomePage = path === '/';

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

    // const headerStyle = headerStyles({
    //     variant: isHomePage && (scrolling || hovered) ? 'homePageScrolling' : isHomePage ? 'homePage' : 'default',
    // })

    return (
        <div className={`${headerStyles({
            variant: 'default',
        })} hidden lg:flex`}
             style={{
                 // boxShadow: scrolling || !isHomePage ? 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' : '',
                 boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
             }}
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
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
                        <AccountMenu isAuth={isAuth}/>
                    </Wrapper>
                </div>
            </ContentContainer>
        </div>
    )
}