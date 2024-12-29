import Logo from "@/components/navigation/ui/logo";
import MainMenu from "@/components/navigation/ui/main-menu";
import AccountMenu from "@/components/navigation/ui/account-menu";
import ContentContainer from "@/components/ui/content-container";

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