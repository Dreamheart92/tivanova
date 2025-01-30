import {NavigationMenu, NavigationMenuList} from "@/components/ui/navigation-menu";
import MenuItem from "@/components/navigation/components/menu-item";
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

export default function MainMenu({closeMenu}: { closeMenu?: () => void }) {
    return (
        <NavigationMenu className="">
            <NavigationMenuList className="gap-4 flex-col lg:flex-row text-sm items-start lg:text-base">
                <MenuItem
                    settings={navigationItems.shop}
                    closeMenu={closeMenu}
                />
                <MenuItem
                    settings={navigationItems.collections}
                    closeMenu={closeMenu}
                />
                <MenuItem
                    settings={navigationItems.about}
                    closeMenu={closeMenu}
                />
                <MenuItem
                    settings={navigationItems.journal}
                    closeMenu={closeMenu}
                />
            </NavigationMenuList>
        </NavigationMenu>
    );
}
