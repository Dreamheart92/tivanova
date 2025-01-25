'use client';

import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import EditDeliveryAddressFormWrapper
    from "@/app/(account)/account/[[...slug]]/components/settings/forms/edit-delivery-address-form-wrapper";

export default function EditDeliveryAddress({label}: { label: string }) {
    const [open, setOpen] = useState(false);

    const handleCloseDialog = () => setOpen(false);

    return (
        <Dialog open={open} onOpenChange={(boolean) => setOpen(boolean)}>
            <DialogTrigger asChild>
                <Button className='w-fit'>{label}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                </DialogHeader>
                <Separator/>
                <EditDeliveryAddressFormWrapper onCloseDialog={handleCloseDialog}/>
            </DialogContent>
        </Dialog>
    )
}
