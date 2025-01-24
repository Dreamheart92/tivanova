import {AddressType} from "@/lib/definitions/customer";
import Wrapper from "@/app/(orders)/components/wrapper";

export default function DeliveryAddress({deliveryAddress}: { deliveryAddress: AddressType }) {
    return (
        <Wrapper>
            <div>
                <h5 className='font-bold'>Delivery address</h5>
                <p>{deliveryAddress.address1}</p>
                <p>{deliveryAddress.address2}</p>
                <p>{deliveryAddress.phone}</p>
                <p>{deliveryAddress.zip} {deliveryAddress.city}</p>
                <p>{deliveryAddress.country}</p>
            </div>
        </Wrapper>
    )
}