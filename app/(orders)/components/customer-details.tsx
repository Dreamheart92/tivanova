import Wrapper from "@/app/(orders)/components/wrapper";

type CustomerDetailsProps = {
    customer: {
        firstName: string;
        lastName: string;
        email: string;
    }
}

export default function CustomerDetails({customer}: CustomerDetailsProps) {
    return (
        <Wrapper>
            <div>
                <div>
                    <h5 className='font-bold'>My details</h5>
                    <p>{customer.firstName} {customer.lastName}</p>
                    <p>{customer.email}</p>
                </div>
            </div>
        </Wrapper>
    )
}
