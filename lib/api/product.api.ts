'use server';

import {
    CollectionDetailsType,
    CollectionType,
    FeaturedProductType,
    ProductType
} from "@/lib/definitions/product.definitions";
import {
    catalogueProductsQuery, fetchCollectionQuery,
    fetchFeaturedProductsQuery,
    fetchLatestCollectionsQuery,
    fetchLatestProductsQuery,
    fetchProductByIdQuery,
    filtersQuery, searchQuery
} from "@/lib/api/queries/product";
import {FilterType} from "@/lib/definitions/definitions";
import {client, clientFetcher} from "@/lib/api/shopify";

import {applyCountryIsoToQuery} from "@/lib/utils/server/shopify.server-utils";
import {
    removeEdgesAndNodes,
    reshapeCollection,
    reshapeFeaturedProducts,
    reshapeProduct, reshapeSearchResults
} from "@/lib/utils/shopify.utils";
import {QUERY} from "@/lib/constants/query";

export const fetchLatestProducts = async (): Promise<FeaturedProductType[]> => {
    const query = await applyCountryIsoToQuery(fetchLatestProductsQuery);
    const data = await clientFetcher(query);

    return reshapeFeaturedProducts(data.products);
}

export const fetchCollections = async ({first = '250'}: { first?: string } = {}): Promise<CollectionDetailsType[]> => {
    const query = fetchLatestCollectionsQuery.replace(QUERY.FIRST_LIMIT_KEY, first);
    const data = await clientFetcher(query);

    return data.collections.nodes.map((collection: any) => ({
        ...collection,
        backdropImage: collection.metafield.reference,
    }));
}

export const fetchProductById = async (productId: string): Promise<ProductType> => {
    const query = await applyCountryIsoToQuery(fetchProductByIdQuery);
    const data = await clientFetcher(query, {
        productId: `gid://shopify/Product/${productId}`
    })
    return reshapeProduct(data.product);
}

export const fetchFeaturedProducts = async (): Promise<FeaturedProductType[]> => {
    const query = await applyCountryIsoToQuery(fetchFeaturedProductsQuery);
    const data = await clientFetcher(query);

    return reshapeFeaturedProducts(data.products);
}

export const fetchCatalogueProducts = async (search: string[]): Promise<{
    products: FeaturedProductType[],
    filters: FilterType[]
}> => {
    const productsQuery = await applyCountryIsoToQuery(catalogueProductsQuery);

    const [productsData, filtersData] = await Promise.all([
        clientFetcher(productsQuery, {
            productFilters: search,
        }),
        clientFetcher(filtersQuery, {
            productFilters: search,
        })
    ])

    return {
        products: reshapeFeaturedProducts(productsData.search),
        filters: filtersData.search.productFilters,
    }
}

export const fetchCollection = async (collectionId: string): Promise<CollectionType> => {
    const query = await applyCountryIsoToQuery(fetchCollectionQuery);

    const data = await clientFetcher(query, {
        collectionId: `gid://shopify/Collection/${collectionId}`,
    })

    return reshapeCollection(data.collection);
}

export const search = async (search: string, limit = 250): Promise<{
    result: FeaturedProductType[],
    count: number
}> => {
    const query = searchQuery.replace(QUERY.FIRST_LIMIT_KEY, String(limit));
    const data = await clientFetcher(query, {
        query: search,
    });

    return reshapeSearchResults(data);
}