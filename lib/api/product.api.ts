import {CollectionDetailsType, CollectionType, FeaturedProductType, ProductType} from "@/lib/definitions/product.definitions";
import {
    catalogueProductsQuery, fetchCollectionQuery,
    fetchFeaturedProductsQuery,
    fetchLatestCollectionsQuery,
    fetchLatestProductsQuery,
    fetchProductByIdQuery,
    filtersQuery
} from "@/lib/api/queries/product";
import {FilterType} from "@/lib/definitions/definitions";
import {clientFetcher} from "@/lib/api/shopify";

import {applyCountryIsoToQuery} from "@/lib/utils/server/shopify.server-utils";
import {reshapeCollection, reshapeFeaturedProducts, reshapeProduct} from "@/lib/utils/shopify.utils";

export const fetchLatestProducts = async (): Promise<FeaturedProductType[]> => {
    const query = await applyCountryIsoToQuery(fetchLatestProductsQuery);
    const data = await clientFetcher(query);

    return reshapeFeaturedProducts(data.products);
}

export const fetchLatestCollections = async (): Promise<CollectionDetailsType[]> => {
    const data = await clientFetcher(fetchLatestCollectionsQuery);
    return data.collections.nodes;
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
