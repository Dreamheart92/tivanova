'use client';

import Logo from "@/components/navigation/ui/logo";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {useCheckout} from "@/lib/context/checkout";
import {Fragment} from "react";
import {clsx} from "clsx";

const breadcrumbLinks = ['Information', 'Shipping', 'Payment'];

export default function CheckoutHeader() {
    const {currentView, setCurrentViewIndex} = useCheckout();

    const isStepAccessible = (index: number) => {
        return index <= currentView;
    }

    return (
        <div>
            <Logo/>

            <Breadcrumb className='pt-2'>
                <BreadcrumbList>
                    {breadcrumbLinks.map((link, index) => {
                        const stepAccessible = isStepAccessible(index);

                        return (
                            <Fragment key={link}>
                                <BreadcrumbItem
                                    className={clsx({
                                        'text-stone-900 font-bold': index === currentView,
                                        'cursor-pointer': stepAccessible,
                                        'cursor-text': !stepAccessible
                                    })}
                                    onClick={() => stepAccessible && setCurrentViewIndex(index)}
                                >
                                    {link}
                                </BreadcrumbItem>

                                {index < breadcrumbLinks.length - 1 && (
                                    <BreadcrumbSeparator/>
                                )}

                            </Fragment>
                        )
                    })}

                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}