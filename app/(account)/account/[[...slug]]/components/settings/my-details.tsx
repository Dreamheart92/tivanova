import {CustomerType} from "@/lib/definitions/customer.definitions";
import EditProfile from "@/app/(account)/account/[[...slug]]/components/settings/edit-profile";
import DetailsField from "@/app/(account)/account/[[...slug]]/components/settings/details-field";

export default function MyDetails({customer}: { customer: CustomerType }) {
    return (
        <div className='bg-white p-4 rounded-sm'>
            <div className='flex justify-between pb-2'>
                <h4>My details</h4>
                <EditProfile customer={customer}/>
            </div>

            <div>
                <DetailsField label='Email'>
                    {customer.email}
                </DetailsField>

                <DetailsField label='First name'>
                    {customer.firstName}
                </DetailsField>

                <DetailsField label='Last name'>
                    {customer.lastName}
                </DetailsField>

                <DetailsField label='Phone'>
                    {customer.phone}
                </DetailsField>
            </div>
        </div>
    )
}