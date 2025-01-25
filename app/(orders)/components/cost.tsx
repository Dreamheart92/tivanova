import {clsx} from "clsx";
import {CostType} from "@/lib/definitions/cart.definitions";
import Wrapper from "@/app/(orders)/components/wrapper";

const OrderCostField = ({label, value, bold = false}: { label: string, value: string | number, bold?: boolean }) => {
    return (
        <div className={clsx('flex w-full justify-between items-center', {
            'font-bold': bold,
        })}>
            <p>{label}</p>
            <p>{value}</p>
        </div>
    )
}

type OrderCostProps = {
    cost: {
        deliveryCost: CostType;
        subtotal: CostType;
        total: CostType;
    }
}

export default function Cost({cost}: OrderCostProps) {
    return (
        <Wrapper>
            <div>
                <OrderCostField
                    label='Subtotal:'
                    value={`${cost.subtotal.currencyCode} ${Number(cost.subtotal.amount).toFixed(2)}`}
                />
                <OrderCostField
                    label='Delivery:'
                    value={`${cost.deliveryCost.currencyCode} ${Number(cost.deliveryCost.amount).toFixed(2)}`}
                />
                <OrderCostField
                    label='Total:'
                    value={`${cost.total.currencyCode} ${Number(cost.total.amount).toFixed(2)}`}
                    bold
                />
            </div>
        </Wrapper>
    )
}