import {useCheckout} from "@/lib/context/checkout";
import {Button} from "@/components/ui/button";

type CheckoutStepNavigationProps = {
    loading?: boolean;
    formAction?: (formData: FormData) => void;
    onClick?: () => void;
    actionLabel: string;
}

export default function CheckoutStepNavigation(
    {
        actionLabel,
        formAction,
        onClick,
        loading
    }: CheckoutStepNavigationProps) {
    const {currentView, decrementViewIndex} = useCheckout();

    return (
        <div className='flex justify-between mt-4 w-full'>
            {currentView > 0 && (
                <div>
                    <Button variant='outline' onClick={decrementViewIndex}>Return</Button>
                </div>
            )}

            <div className='flex justify-end w-full'>
                <Button
                    formAction={formAction}
                    onClick={onClick}
                    loading={loading}
                    disabled={loading}
                >
                    {actionLabel}
                </Button>
            </div>
        </div>
    )
}