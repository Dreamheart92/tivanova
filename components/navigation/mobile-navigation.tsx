import Logo from "@/components/navigation/ui/logo";
import {AlignJustify} from "lucide-react";
import AccountMenu from "@/components/navigation/ui/account-menu";

export default function MobileNavigation() {
    return (
        <div className='mobile-navigation flex justify-between items-center py-2'>
            <div className='flex gap-2 items-center'>
                <AlignJustify/>
                <Logo/>
            </div>

            <AccountMenu/>
        </div>
    )
}