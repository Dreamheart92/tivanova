'use client';

import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {SearchIcon} from "lucide-react";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Input} from "@/components/ui/input";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {FeaturedProductType} from "@/lib/definitions/product.definitions";
import {search as searchRequest} from "@/lib/api/product.api";
import ProductCard, {ProductCardDetails, ProductCardImage} from "@/components/product-card";
import {Button} from "@/components/ui/button";
import ProductDetails from "@/app/(product)/product/[productId]/components/product-details";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import {extractShopifyIdFromGID} from "@/lib/utils/shopify.utils";
import {useRouter} from "next/navigation";

type SearchResultsType = {
    result: FeaturedProductType[];
    count: number;
}

export default function Search() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResultsType | null>(null);

    const timeout = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const clearSearch = (state: boolean) => {
        if (!state) setSearch('');
        setOpen(state);
    }

    const closeSearch = () => {
        setSearch('');
        setOpen(false);
    };

    useEffect(() => {
        if (timeout.current) clearTimeout(timeout.current);

        if (search.length > 1) {
            timeout.current = setTimeout(() => {
                (async function () {
                    const results = await searchRequest(search, 4);
                    setSearchResults(results);
                })()
            }, 200)
        } else {
            setSearchResults(null);
        }
    }, [search]);

    return (
        <Sheet open={open} onOpenChange={clearSearch}>
            <SheetTrigger>
                <SearchIcon className='w-5 h-5 lg:w-4 lg:h-4'/>
            </SheetTrigger>
            <SheetContent
                side='top'
                className='lg:px-16 max-h-full overflow-y-auto'>
                <SheetHeader className=''>
                    <VisuallyHidden>
                        <SheetTitle/>
                    </VisuallyHidden>
                </SheetHeader>


                <div className='flex items-center'>
                    <SearchIcon className='w-4 h-4 text-stone-700'/>
                    <Input
                        name='search'
                        placeholder='Search'
                        className='shadow-none border-0 outline-none focus:outline-none focus-visible:ring-0 focus-visible:outline-none uppercase'
                        value={search}
                        onChange={handleSearch}
                        autoFocus
                        autoComplete='off'
                    />
                </div>


                {searchResults && (
                    <SearchResult searchResults={searchResults} closeSearch={closeSearch} search={search}/>
                )}
            </SheetContent>
        </Sheet>
    )
}

const SearchProductCard = ({product, closeSearch}: { product: FeaturedProductType, closeSearch: () => void }) => {
    const href = `${PATHS.PRODUCT_DETAILS(extractShopifyIdFromGID(product.id))}`;

    return (
        <div onClick={closeSearch}>
            <Link href={href}>
                <div className='text-sm lg:text-base flex lg:flex-col items-center lg:items-start gap-2 cursor-pointer'>
                    <ProductCardImage
                        images={product.images.slice(0, 2)}
                        alt={product.title}
                        size={{
                            width: 500,
                            height: 500,
                            maxHeight: 600,
                        }}
                        searchProduct
                    />
                    <ProductCardDetails details={{
                        vendor: product.vendor,
                        title: product.title,
                        cost: product.priceRange.minVariantPrice,
                    }}/>
                </div>
            </Link>
        </div>
    )
}

const ProductsList = ({searchResults, closeSearch}: { searchResults: SearchResultsType, closeSearch: () => void }) => {
    return (
        searchResults.result.map((product) => (
            <SearchProductCard key={product.id} product={product} closeSearch={closeSearch}/>
        ))
    )
}

const SearchResult = ({searchResults, search, closeSearch}: {
    searchResults: SearchResultsType,
    search: string,
    closeSearch: () => void
}) => {
    const router = useRouter();

    const emptyResults = searchResults.result.length <= 0;
    const caption = !emptyResults ? `${searchResults.count} Results` : 'Products';
    const content = !emptyResults ? <ProductsList searchResults={searchResults} closeSearch={closeSearch}/> : (
        <p>No results could be found</p>);

    const handleViewAll = () => {
        closeSearch();
        router.push(`${PATHS.SEARCH}?query=${encodeURIComponent(search)}`);
    }


    return (
        <div className='pt-4'>
            <div className='flex justify-between items-center text-sm lg:text-base'>
                <p>{caption}</p>

                {!emptyResults && (
                    <Button
                        variant='link'
                        onClick={handleViewAll}
                    >
                        View all
                    </Button>
                )}

            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-t pt-4 mt-2'>
                {content}
            </div>
        </div>
    )
}