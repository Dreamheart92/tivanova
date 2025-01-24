import {Separator} from "@/components/ui/separator";
import {normalizeName} from "@/lib/utils/utils";
import EditProfile from "@/app/(account)/account/[[...slug]]/components/settings/edit-profile";
import ChangePassword from "@/app/(account)/account/[[...slug]]/components/settings/change-password";
import {CustomerType} from "@/lib/definitions/customer";

type CustomerDetailsProps = {
    customer: CustomerType;
}

export default function CustomerDetails({customer}: CustomerDetailsProps) {
    return (
        <div className='flex-1'>
            <h3>My account</h3>
            <Separator className='my-2'/>
            <div>
                <p>{normalizeName(customer.firstName)} {normalizeName(customer.lastName)}</p>
                <p className='py-1'>{customer.email}</p>
                <p>{customer.phone}</p>
            </div>

            <CustomerControls customer={customer}/>
        </div>
    )
}

const CustomerControls = ({customer}: { customer: CustomerType }) => {
    return (
        <div className='flex flex-col gap-2 pt-2'>
            <EditProfile customer={customer}/>
            <ChangePassword/>
        </div>
    )
}