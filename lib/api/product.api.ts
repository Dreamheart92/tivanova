import {CollectionDetailsType, CollectionType, FeaturedProductType, ProductType} from "@/lib/definitions/product";
import {reshapeCollection, reshapeFeatureProduct, reshapeProduct} from "@/lib/utils/product.utils";
import {
    catalogueProductsQuery, fetchCollectionQuery,
    fetchFeaturedProductsQuery,
    fetchLatestCollectionsQuery,
    fetchLatestProductsQuery,
    fetchProductByIdQuery,
    filtersQuery
} from "@/lib/api/queries/product";
import {getCountryIso} from "@/lib/utils/customer.utils";
import {QUERY} from "@/lib/constants/query";
import {FilterType} from "@/lib/definitions/definitions";
import {clientFetcher} from "@/lib/api/shopify";

export const fetchLatestProducts = async (): Promise<FeaturedProductType[]> => {
    const countryISO = await getCountryIso();
    const query = fetchLatestProductsQuery.replace(QUERY.COUNTRY_ISO_REPLACEMENT_KEY, countryISO);

    const data = await clientFetcher(query);

    return data.products.nodes.map((product: any) => reshapeFeatureProduct(product));
}

export const fetchLatestCollections = async (): Promise<CollectionDetailsType[]> => {
    const data = await clientFetcher(fetchLatestCollectionsQuery);

    return data.collections.nodes;
}

export const fetchProductById = async (productId: string): Promise<ProductType> => {
    const countryISO = await getCountryIso();
    const query = fetchProductByIdQuery.replace(QUERY.COUNTRY_ISO_REPLACEMENT_KEY, countryISO);

    const data = await clientFetcher(query, {
        productId: `gid://shopify/Product/${productId}`
    })

    return reshapeProduct(data.product);
}

export const fetchFeaturedProducts = async (): Promise<FeaturedProductType[]> => {
    const countryISO = await getCountryIso();
    const query = fetchFeaturedProductsQuery.replace(QUERY.COUNTRY_ISO_REPLACEMENT_KEY, countryISO);

    const data = await clientFetcher(query);

    return data.products.nodes.map((product: any) => reshapeFeatureProduct(product));
}

export const fetchCatalogueProducts = async (search: {
    brand?: string,
    color?: string,
    size?: string,
    category?: string
}): Promise<{
    products: FeaturedProductType[],
    filters: FilterType[]
}> => {
    const countryISO = await getCountryIso();

    //TODO: Move this outside the request
    const searchQuery = Object.values((search)).reduce((a: string[], b: string) => {
        b.split('|').forEach((query: string) => {
            a.push(JSON.parse(query));
        })

        return a;
    }, [])

    const [productsData, filtersData] = await Promise.all([
        clientFetcher(catalogueProductsQuery.replace(QUERY.COUNTRY_ISO_REPLACEMENT_KEY, countryISO), {
            productFilters: searchQuery,
        }),
        clientFetcher(filtersQuery, {
            productFilters: searchQuery,
        })
    ])

    return {
        products: productsData.search.nodes.map((product: any) => reshapeFeatureProduct(product)),
        filters: filtersData.search.productFilters,
    }
}

export const fetchCollection = async (collectionId: string): Promise<CollectionType> => {
    const countryISO = await getCountryIso();
    const query = fetchCollectionQuery.replace(QUERY.COUNTRY_ISO_REPLACEMENT_KEY, countryISO);

    const data = await clientFetcher(query, {
        collectionId: `gid://shopify/Collection/${collectionId}`,
    })

    return reshapeCollection(data.collection);
}
