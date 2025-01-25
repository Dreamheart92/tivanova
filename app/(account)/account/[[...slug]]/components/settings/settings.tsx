import {CustomerType} from "@/lib/definitions/customer.definitions";
import ChangePassword from "@/app/(account)/account/[[...slug]]/components/settings/change-password";
import DeliveryAddress from "@/app/(account)/account/[[...slug]]/components/settings/delivery-address";
import MyDetails from "@/app/(account)/account/[[...slug]]/components/settings/my-details";

export default async function Settings({customer}: { customer: CustomerType }) {

    return (
        <div className='flex flex-col gap-4 w-full'>
            <MyDetails customer={customer}/>
            <DeliveryAddress/>
            <ChangePassword/>
        </div>
    )
}
