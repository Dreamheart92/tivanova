import Logo from "@/components/navigation/ui/logo";
import {AlignJustify} from "lucide-react";
import AccountMenu from "@/components/navigation/ui/account-menu";

export default function MobileNavigation({isAuth}: { isAuth: boolean }) {
    return (
        <div className='flex lg:hidden justify-between items-center py-2 px-1'>
            <div className='flex gap-2 items-center'>
                <AlignJustify/>
                <Logo/>
            </div>

            <AccountMenu isAuth={isAuth}/>
        </div>
    )
}