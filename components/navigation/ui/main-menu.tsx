import {NavigationMenu, NavigationMenuList} from "@/components/ui/navigation-menu";
import MenuItem from "@/components/navigation/ui/menu-item";
import {NAVIGATION} from "@/lib/constants/navigation";

const navigationItems = {
    shop: {
        title: "Shop",
        href: NAVIGATION.SHOP,
    },
    collections: {
        title: 'Collections',
        href: NAVIGATION.COLLECTIONS,
    },
    about: {
        title: 'About',
        href: NAVIGATION.ABOUT,
    },
    journal: {
        title: 'Journal',
        href: NAVIGATION.JOURNAL,
    }
}

export default function MainMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <MenuItem settings={navigationItems.shop}/>
                <MenuItem settings={navigationItems.collections}/>
                <MenuItem settings={navigationItems.about}/>
                <MenuItem settings={navigationItems.journal}/>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
