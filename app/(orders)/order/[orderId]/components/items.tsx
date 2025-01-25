import {OrderLineItemType} from "@/lib/definitions/order.definitions";
import ItemCard from "@/app/(orders)/components/item-card";
import Wrapper from "@/app/(orders)/components/wrapper";

export default function Items({items}: { items: OrderLineItemType[] }) {
    return (
        <Wrapper>
            <div>
                {items.map((item) => (
                    <ItemCard key={item.id} item={item}/>
                ))}
            </div>
        </Wrapper>
    )
}