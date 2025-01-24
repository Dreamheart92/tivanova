import DetailCard from "@/app/(orders)/checkout/components/detail-card";
import {Separator} from "@/components/ui/separator";
import {useCheckout} from "@/lib/context/checkout";

export default function DeliveryInfoCard() {
    const {shippingAddress, currentView, shippingMethod} = useCheckout();

    const shipTo = `${shippingAddress.address1}, ${shippingAddress.zip} ${shippingAddress.city}, ${shippingAddress.countryCode}`;

    return (
        <div className='border p-4 rounded-md'>
            <DetailCard
                title='Contact'
                value={shippingAddress.phone}
                viewIndex={0}
            />
            <Separator className='my-4'/>
            <DetailCard
                title='Ship to'
                value={shipTo}
                viewIndex={0}
            />

            {currentView === 2 && shippingMethod && (
                <>
                    <Separator className='my-4'/>
                    <DetailCard
                        title='Shipping method'
                        value={shippingMethod.title}
                        viewIndex={1}
                    />
                </>
            )}
        </div>
    )
}