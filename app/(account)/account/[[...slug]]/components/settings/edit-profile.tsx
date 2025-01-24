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
import EditProfileForm from "@/app/(account)/account/[[...slug]]/components/settings/forms/edit-profile-form";
import {Separator} from "@/components/ui/separator";
import {useState} from "react";
import {CustomerType} from "@/lib/definitions/customer";

export default function EditProfile({customer}: { customer: CustomerType }) {
    const [open, setOpen] = useState(false);

    const handleCloseDialog = () => setOpen(false);

    const customerData = {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
    }

    return (
        <Dialog open={open} onOpenChange={(boolean) => setOpen(boolean)}>
            <DialogTrigger asChild>
                <Button className='w-fit'>Edit profile</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Update your profile to keep your information accurate and up to date.
                    </DialogDescription>
                </DialogHeader>

                <Separator/>

                <EditProfileForm
                    customerData={customerData}
                    onCloseDialog={handleCloseDialog}
                />
            </DialogContent>
        </Dialog>
    )
}