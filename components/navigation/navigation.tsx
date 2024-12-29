import Logo from "@/components/navigation/ui/logo";
import MainMenu from "@/components/navigation/ui/main-menu";
import AccountMenu from "@/components/navigation/ui/account-menu";

type WrapperProps = {
    basis: string;
    justify?: 'start' | 'center' | 'end';
    children: React.ReactNode;
}

const Wrapper = ({basis, justify, children}: WrapperProps) => {
    const wrapperClasses = `flex basis-[${basis}%] ${justify ? `justify-${justify}` : ''}`;

    return (
        <div className={wrapperClasses}>
            {children}
        </div>
    )
}

export default function Navigation() {
    return (
        <div className="flex">
            <MainMenu/>
            <Logo/>
        </div>
    )
}