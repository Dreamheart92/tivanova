import {OrderSummaryType} from "@/lib/definitions/order.definitions";
import Image from "next/image";
import moment from "moment/moment";
import {Button} from "@/components/ui/button";
import {PATHS} from "@/lib/constants/paths";
import Link from "next/link";

import {extractShopifyIdFromGID} from "@/lib/utils/shopify.utils";

export default function OrderCard({order}: { order: OrderSummaryType }) {
    const orderQuantity = order.lineItems.reduce((accumulator, line) => accumulator + line.quantity, 0);
    const orderId = extractShopifyIdFromGID(order.id).split('?')[0];

    return (
        <div className='p-4 rounded-sm my-4 flex justify-between bg-white w-full'>
            <Link className='w-full' href={`${PATHS.ORDER}/${orderId}`}>
                <div className='flex justify-between w-full'>
                    <div className='flex flex-col'>
                        <h2 className='text-[1.1em] pb-4'>Order: #{order.orderNumber}</h2>

                        <div className='flex'>
                            {order.lineItems.map((line) => (
                                <div key={line.variant.id}>
                                    <Image
                                        src={line.variant.image.url}
                                        alt={line.title}
                                        width={80}
                                        height={80}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col text-right'>
                        <div className='basis-4/5'>
                            <p>{moment(order.processedAt).format('DDD MMMM Y')}</p>
                            <p>{order.totalPrice.currencyCode} {Number(order.totalPrice.amount).toFixed(2)}</p>
                        </div>

                        <div className=''>
                            <p className='pb-1'>Total items: {orderQuantity}</p>
                            <Button className='w-fit h-fit'>View order</Button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
