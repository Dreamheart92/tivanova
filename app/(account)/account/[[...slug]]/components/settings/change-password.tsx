'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import ChangePasswordForm from "@/app/(account)/account/[[...slug]]/components/settings/forms/change-password-form";
import {useState} from "react";

export default function ChangePassword() {
    const [open, setOpen] = useState(false);

    const handleCloseDialog = () => {
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='w-fit'>Change password</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change password</DialogTitle>
                    <DialogDescription>
                        Enter your current password and set a new one.
                    </DialogDescription>
                </DialogHeader>

                <Separator/>
                <ChangePasswordForm onCloseDialog={handleCloseDialog}/>
            </DialogContent>
        </Dialog>
    )
}