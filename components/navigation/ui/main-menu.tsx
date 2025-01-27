import {NavigationMenu, NavigationMenuList} from "@/components/ui/navigation-menu";
import MenuItem from "@/components/navigation/ui/menu-item";
import {PATHS} from "@/lib/constants/paths";

const navigationItems = {
    shop: {
        title: "Shop",
        href: PATHS.SHOP,
    },
    collections: {
        title: 'Collections',
        href: PATHS.COLLECTIONS,
    },
    about: {
        title: 'About',
        href: PATHS.ABOUT,
    },
    journal: {
        title: 'Journal',
        href: PATHS.JOURNALS,
    }
}

export default function MainMenu() {
    return (
        <NavigationMenu className="">
            <NavigationMenuList className="gap-4">
                <MenuItem settings={navigationItems.shop}/>
                <MenuItem settings={navigationItems.collections}/>
                <MenuItem settings={navigationItems.about}/>
                <MenuItem settings={navigationItems.journal}/>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
