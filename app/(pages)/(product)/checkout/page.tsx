import Box from "@/components/box";
import CheckoutForm from "@/app/(pages)/(product)/forms/checkout-form";
import OrderDetails from "@/app/(pages)/(product)/checkout/components/OrderDetails";

const OrderAddress = () => {
    return (
        <Box column gap='1em' style={{width: '100%'}}>
            <h3>Shipping</h3>
            <CheckoutForm/>
        </Box>
    )
}

export default function Checkout() {
    return (
        <Box justify='center' gap='5em' style={{maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '2em'}}>
            <Box flex='0 1 50%'>
                <OrderAddress/>
            </Box>

            <Box flexGrow='1'>
                <OrderDetails/>
            </Box>
        </Box>
    )
}