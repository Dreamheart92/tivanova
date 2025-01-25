import ContentContainer from "@/components/ui/content-container";
import MainMenu from "@/components/navigation/ui/main-menu";
import Logo from "@/components/navigation/ui/logo";
import AccountMenu from "@/components/navigation/ui/account-menu";

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


export default function DesktopNavigation({isAuth}: { isAuth: boolean }) {

    return (
        <div
            className='w-full py-4 z-50 sticky top-0 bg-white text-black hidden lg:flex'
            style={{
                // boxShadow: scrolling || !isHomePage ? 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' : '',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
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
                        <AccountMenu isAuth={isAuth}/>
                    </Wrapper>
                </div>
            </ContentContainer>
        </div>
    )
}