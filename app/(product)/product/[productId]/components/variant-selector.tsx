'use client';

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {findVariantByColor, organizeProductVariants} from "@/lib/utils/product.utils";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useProduct} from "@/lib/context/product";
import {ProductVariantType} from "@/lib/definitions/product.definitions";

type VariantSelectorProps = {
    variants: ProductVariantType[];
}

export default function VariantSelector({variants}: VariantSelectorProps) {
    const {onSelectOption} = useProduct();

    const productVariants = organizeProductVariants(variants);
    const [selectedColor, setSelectedColor] = useState(productVariants[0].color);
    const productSizeOptions = findVariantByColor(productVariants, selectedColor);

    const handleSelectOption = (variantId: string) => {
        const variant = variants.find((variant) => variant.id === variantId);
        onSelectOption(variant);
    }

    return (
        <>
            <div>
                <h4>Color</h4>

                <div className='gap-2 flex'>
                    {productVariants.map((variant) => (
                        <Button
                            variant={variant.color === selectedColor ? 'default' : 'outline'}
                            key={variant.id}
                            onClick={() => setSelectedColor(variant.color)}
                        >
                            {variant.color}
                        </Button>
                    ))}
                </div>
            </div>
            <div>
                <h4>Size</h4>

                <div>
                    <Select onValueChange={handleSelectOption}>
                        <SelectTrigger>
                            <SelectValue placeholder='Select a size'/>
                        </SelectTrigger>

                        <SelectContent>
                            {productSizeOptions?.options?.map((size) => (
                                <SelectItem
                                    key={size.id}
                                    value={size.id}
                                    className='cursor-pointer'
                                >
                                    {size.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    )
}
