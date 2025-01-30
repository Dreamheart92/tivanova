'use client';

import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {AlignJustify} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import MainMenu from "@/components/navigation/components/main-menu";
import {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function MobileMenu() {
    const [open, setOpen] = useState(false);

    const handleCloseMenu = () => setOpen(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <AlignJustify/>
            </SheetTrigger>
            <SheetContent
                side='left'
                className='p-4 w-full'>
                <SheetHeader className=''>
                    <SheetTitle className='text-left'>
                        <Link href='/'>
                            <Button
                                variant='link'
                                className='text-xl lg:text-base p-0 m-0 hover:no-underline lg:hover:underline font-bold'
                                onClick={handleCloseMenu}
                            >
                                TIVANOVA
                            </Button>
                        </Link>
                    </SheetTitle>
                </SheetHeader>
                <Separator className='my-2'/>

                <MainMenu closeMenu={handleCloseMenu}/>
            </SheetContent>
        </Sheet>
    )
}