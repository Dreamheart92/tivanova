import {OrderLineItemType} from "@/lib/definitions/order";
import Image from "next/image";

export default function ItemCard({item}: { item: OrderLineItemType }) {
    return (
        <div className='flex gap-4 py-2'>
            <div>
                <Image src={item.image.url} alt={item.name} width={150} height={100}/>
            </div>

            <div className='flex flex-col'>
                <div className='basis-4/5'>
                    <p>{item.title}</p>
                    <p>{item.originalUnitPriceSet.presentmentMoney.currencyCode} {Number(item.originalUnitPriceSet.presentmentMoney.amount)}</p>
                </div>

                <DetailRow label='Quantity' detail={item.currentQuantity}/>
                {item.variant.selectedOptions.map((selectedOption) => (
                    <DetailRow
                        key={selectedOption.name}
                        label={selectedOption.name}
                        detail={selectedOption.value}
                    />
                ))}
                <DetailRow
                    label='Total'
                    detail={`${item.originalTotalSet.presentmentMoney.currencyCode} ${Number(item.originalTotalSet.presentmentMoney.amount).toFixed(2)}`}
                />
            </div>
        </div>
    )
}

function DetailRow({label, detail}: { label: string, detail: string | number }) {
    return (
        <div className='flex gap-1 text-sm items-center'>
            <p className='text-stone-500'>{label}: </p>
            <p>{detail}</p>
        </div>
    )
}