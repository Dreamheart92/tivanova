'use server';

import {adminClient} from "@/lib/shopify";
import {unstable_cache as nextCache} from "next/cache";
import {cache} from "react";
import {TAGS} from "@/lib/constants/tags";
import {reshapeWishlist} from "@/lib/utils/wishlist.utils";
import {createWishlistMutation, updateRemoteWishlistMutation} from "@/lib/api/mutations/wishlist";
import {fetchWishlistQuery} from "@/lib/api/queries/wishlist";
import {adminFetcher} from "@/lib/api/shopify";

export const createWishlist = async (customerId: string = '', lines: string[] = []) => {
    const data = await adminFetcher(createWishlistMutation, {
        metaobject: {
            type: "wishlist",
            fields: [
                {
                    key: "customer_id",
                    value: customerId,
                },
                {
                    key: "lines",
                    value: JSON.stringify(lines),
                },
            ],
            capabilities: {
                publishable: {
                    status: 'ACTIVE',
                }
            }
        },
    })

    const wishlistLines = data.metaobjectCreate.metaobject.fields.find((field: any) => field.key === 'lines').value;

    return {
        id: data.metaobjectCreate.metaobject.id,
        lines: JSON.parse(wishlistLines),
    }
}

export const updateRemoteWishlist = async (wishlistId?: string, lines?: string[]) => {
    //TODO: Remove wishlist and lines checker outside

    if (!wishlistId || !lines) return;

    const data = await adminFetcher(updateRemoteWishlistMutation, {
        id: wishlistId,
        metaobject: {
            fields: [
                {
                    key: 'lines',
                    value: JSON.stringify(lines),
                }
            ]
        }
    })
}

export const fetchWishlist = nextCache(
    cache(async (wishlistId?: string) => {

        //TODO: Add wishlistId checker outside
        if (!wishlistId) return;

        const data = await adminFetcher(fetchWishlistQuery, {
            id: wishlistId,
        })

        return reshapeWishlist(data);
    }),
    [TAGS.WISHLIST],
    {
        tags:
            [TAGS.WISHLIST]
    }
)