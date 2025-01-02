import {Product, Variant} from "@/lib/definitions";
import {findVariantByColor} from "@/lib/product.utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Heart} from "lucide-react";
import {Separator} from "@/components/ui/separator";

type ProductDetailsProps = {
    settings: {
        currency: string;
        colorPicker: {
            label: string;
        }
        sizePicker: {
            label: string;
            placeholder: string;
        },
        addToCartButton: string;
        description: string;
        shipping: {
            label: string;
            content: string;
        }
    }
    product: Product;
    variants: Variant[];
}

export default function ProductDetails({product, variants, settings}: ProductDetailsProps) {
    const productSizeOptions = findVariantByColor(variants, variants[0].color);

    return (
        <div className='pt-[5em] basis-[30%] flex flex-col gap-4'>
            <div>
                <div className='flex justify-between items-center'>
                    <h3>{product.title}</h3>
                    <p>{Number(product.priceRange.minVariantPrice.amount).toFixed(2)} {settings.currency}</p>
                </div>
                <p className='text-[#919191]'>{product.vendor}</p>
            </div>

            <div>
                <h4>{settings.colorPicker.label}</h4>

                <div className='gap-2 flex'>
                    {variants.map((variant) => (
                        <Button variant='outline' key={variant.id}>{variant.color}</Button>
                    ))}
                </div>
            </div>

            <div>
                <h4>{settings.sizePicker.label}</h4>

                <div>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder={settings.sizePicker.placeholder}/>
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

            <div className='flex gap-2'>
                <Button variant='default' className='uppercase basis-4/5'>{settings.addToCartButton}</Button>
                <Button variant='default' className='flex-1'><Heart/></Button>
            </div>

            <div>
                <h5 className='font-bold pb-2'>{settings.description}</h5>

                <div dangerouslySetInnerHTML={{__html: product.descriptionHtml}}/>
            </div>

            <Separator/>

            <div>
                <h5 className='font-bold pb-2'>{settings.shipping.label}</h5>

                <p>{settings.shipping.content}</p>
            </div>
        </div>
    )
}