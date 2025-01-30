import Logo from "@/components/navigation/components/logo";
import AccountMenu from "@/components/navigation/components/account-menu";
import MobileMenu from "@/components/navigation/components/mobile-menu";

export default function MobileNavigation({isAuth}: { isAuth: boolean }) {
    return (
        <div className='flex lg:hidden justify-between items-center py-4 px-2 lg:py-2 lg:px-1 text-sm lg:text-base'>
            <div className='flex gap-2 items-center'>
                <MobileMenu/>
                <Logo/>
            </div>

            <AccountMenu isAuth={isAuth}/>
        </div>
    )
}

