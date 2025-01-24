import {Button} from "@/components/ui/button";
import {useCheckout} from "@/lib/context/checkout";

type DetailCardProps = {
    title: string;
    value: string;
    viewIndex: number;
}

export default function DetailCard({title, value, viewIndex}: DetailCardProps) {
    const {setCurrentViewIndex} = useCheckout();

    return (
        <div className='flex items-center justify-between'>
            <div className='flex gap-4 items-center'>
                <p>{title}</p>
                <p>{value}</p>
            </div>
            <Button onClick={() => setCurrentViewIndex(viewIndex)} variant='outline'>Change</Button>
        </div>
    )
}