import Logo from "@/components/navigation/ui/logo";
import {AlignJustify} from "lucide-react";
import AccountMenu from "@/components/navigation/ui/account-menu";

export default function MobileNavigation({isAuth}: { isAuth: boolean }) {
    return (
        <div className='flex lg:hidden justify-between items-center py-4 px-2 lg:py-2 lg:px-1 text-sm lg:text-base'>
            <div className='flex gap-2 items-center'>
                <AlignJustify/>
                <Logo/>
            </div>

            <AccountMenu isAuth={isAuth}/>
        </div>
    )
}