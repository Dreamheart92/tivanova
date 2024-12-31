import {Product, Variant} from "@/lib/definitions";
import {findVariantByColor} from "@/lib/product.utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Heart} from "lucide-react";
import {Separator} from "@/components/ui/separator";

type ProductDetailsProps = {
    product: Product;
    variants: Variant[];
}

export default function ProductDetails({product, variants}: ProductDetailsProps) {
    const productSizeOptions = findVariantByColor(variants, variants[0].color);

    return (
        <div className='pt-[5em] basis-[30%] flex flex-col gap-4'>
            <div className=''>
                <div className='flex justify-between items-center'>
                    <h3>{product.title}</h3>
                    <p>{Number(product.priceRange.minVariantPrice.amount).toFixed(2)} EURO</p>
                </div>
                <p className='text-[#919191]'>{product.vendor}</p>
            </div>

            <div>
                <h4>Color</h4>

                <div className='gap-2 flex'>
                    {variants.map((variant) => (
                        <Button variant='outline' key={variant.id}>{variant.color}</Button>
                    ))}
                </div>
            </div>

            <div>
                <h4>Size</h4>

                <div>
                    <Select>
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

            <div className='flex gap-2'>
                <Button variant='default' className='uppercase basis-4/5'>Add to cart</Button>
                <Button variant='default' className='flex-1'><Heart/></Button>
            </div>

            <div>
                <h5 className='font-bold pb-2'>Description</h5>

                <div dangerouslySetInnerHTML={{__html: product.descriptionHtml}}/>
            </div>

            <Separator/>

            <div>
                <h5 className='font-bold pb-2'>Shipping & returns</h5>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
        </div>
    )
}