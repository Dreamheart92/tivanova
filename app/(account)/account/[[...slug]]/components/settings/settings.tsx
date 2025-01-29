import {CustomerType} from "@/lib/definitions/customer.definitions";
import ChangePassword from "@/app/(account)/account/[[...slug]]/components/settings/change-password";
import DeliveryAddress from "@/app/(account)/account/[[...slug]]/components/settings/delivery-address";
import MyDetails from "@/app/(account)/account/[[...slug]]/components/settings/my-details";
import {Separator} from "@/components/ui/separator";

export default async function Settings({customer}: { customer: CustomerType }) {

    return (
        <div className='w-full p-6 lg:p-0 text-[2em] lg:text-base'>
            <h2>My Settings</h2>
            <Separator className='my-4'/>
            <div className='flex flex-col gap-4 w-full'>
                <MyDetails customer={customer}/>
                <DeliveryAddress/>
                <ChangePassword/>
            </div>
        </div>
    )
}
