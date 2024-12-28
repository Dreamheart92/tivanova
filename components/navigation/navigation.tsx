import Logo from "@/components/navigation/ui/logo";
import MainMenu from "@/components/navigation/ui/main-menu";

export default function Navigation() {
    return (
        <div className="flex">
            <MainMenu/>
            <Logo/>
        </div>
    )
}